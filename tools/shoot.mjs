#!/usr/bin/env node
// Drives headless Chromium over the DevTools protocol (no dependencies; Node 22+ for the global WebSocket).
// Loads a URL, waits, records console messages / exceptions / network errors, and saves a screenshot.
//
// Usage: node tools/shoot.mjs <url> <out.png> [options]
//   --width N --height N   viewport, default 1440×900        --mobile          mobile metrics + touch
//   --wait MS              settle time after navigate (4000)  --scroll SEL      scrollIntoView(SEL) then --settle MS (2200)
//   --full                 full-page capture with every [data-reveal]/[data-enter] forced visible
//   --reduced-motion       emulate prefers-reduced-motion      --no-js           disable script execution
//   --no-webgl             launch with --disable-3d-apis       --dump-dom FILE   write document.documentElement.outerHTML
//   --focus SEL            press Tab, then focus() the element so :focus-visible applies; wait 300 ms
//   --timeout MS           watchdog (90000)
// Writes <out minus .png>.console.txt next to the screenshot: one "level: message" per line, empty when clean.
// Env: CHROME=/path/to/binary, CHROME_GL_FLAGS="--use-angle=swiftshader --enable-unsafe-swiftshader"
// Exit codes: 0 success, 1 failure (Chromium is always killed and the temp profile removed), 2 usage.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const url = args[0];
const out = args[1];
if (!url || !out) { console.error('usage: node tools/shoot.mjs <url> <out.png> [options]'); process.exit(2); }
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 && i + 1 < args.length ? args[i + 1] : d; };
const has = (n) => args.includes(n);
const width = Number(opt('--width', 1440));
const height = Number(opt('--height', 900));
const wait = Number(opt('--wait', 4000));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const candidates = [
  process.env.CHROME,
  join(homedir(), 'Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) { console.error('no Chromium binary found; set CHROME=/path/to/binary'); process.exit(2); }

const profile = mkdtempSync(join(tmpdir(), 'vora-cdp-'));
const glFlags = (process.env.CHROME_GL_FLAGS || '--use-angle=swiftshader --enable-unsafe-swiftshader').split(' ').filter(Boolean);
const chromeArgs = ['--headless=new', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', ...glFlags,
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, `--window-size=${width},${height}`];
if (has('--no-webgl')) chromeArgs.push('--disable-3d-apis');
chromeArgs.push('about:blank');

const proc = spawn(chrome, chromeArgs, { stdio: ['ignore', 'ignore', 'pipe'] });
let ws = null;
let cleaned = false;
function cleanup() {
  if (cleaned) return;
  cleaned = true;
  try { if (ws) ws.close(); } catch (_) { /* ignore */ }
  try { proc.kill('SIGKILL'); } catch (_) { /* ignore */ }
  try { rmSync(profile, { recursive: true, force: true }); } catch (_) { /* ignore */ }
}
function die(message) { console.error('shoot.mjs: ' + message); cleanup(); process.exit(1); }
process.on('unhandledRejection', (e) => die((e && e.message) || String(e)));
process.on('uncaughtException', (e) => die((e && e.message) || String(e)));
process.on('SIGINT', () => die('interrupted'));
process.on('SIGTERM', () => die('terminated'));
const watchdog = setTimeout(() => die('timed out'), Number(opt('--timeout', 90000)));

async function main() {
  let stderr = '';
  const wsBrowser = await new Promise((resolve, reject) => {
    proc.stderr.on('data', (d) => {
      stderr += d;
      const m = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (m) resolve(m[1]);
    });
    proc.on('exit', (code) => reject(new Error(`Chromium exited (${code}) before DevTools was ready\n${stderr}`)));
  });

  const port = new URL(wsBrowser).port;
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('no page target exposed by Chromium');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = () => reject(new Error('DevTools WebSocket failed to open')); });

  let nextId = 0;
  const pending = new Map();
  const logLines = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
    if (msg.id) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      if (!p) return;
      if (msg.error) p.reject(new Error(`${msg.error.message} (${p.method})`)); else p.resolve(msg.result || {});
      return;
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      logLines.push(`${msg.params.type}: ${msg.params.args.map((a) => (a.value !== undefined ? String(a.value) : a.description || a.type)).join(' ')}`);
    } else if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      logLines.push(`exception: ${d.text} ${(d.exception && d.exception.description) || ''}`.trim());
    } else if (msg.method === 'Log.entryAdded') {
      const e = msg.params.entry;
      logLines.push(`${e.level} (${e.source}): ${e.text} ${e.url || ''}`.trim());
    }
  };
  ws.onclose = () => { for (const p of pending.values()) p.reject(new Error(`DevTools connection closed (${p.method})`)); pending.clear(); };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId; pending.set(id, { resolve, reject, method });
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: has('--mobile') });
  if (has('--mobile')) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  if (has('--reduced-motion')) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  if (has('--no-js')) await send('Emulation.setScriptExecutionDisabled', { value: true });
  await send('Page.navigate', { url });
  await sleep(wait);

  const scroll = opt('--scroll', '');
  if (scroll) {
    await send('Runtime.evaluate', {
      expression: `(function(){var el=document.querySelector(${JSON.stringify(scroll)});if(el)el.scrollIntoView({block:'start',behavior:'instant'});return !!el})()`,
      returnByValue: true,
    });
    await sleep(Number(opt('--settle', 2200)));
  }
  const focusSel = opt('--focus', '');
  if (focusSel) {
    /* A real Tab press first: Chromium only matches :focus-visible on links after keyboard input. */
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Runtime.evaluate', {
      expression: `(function(){var el=document.querySelector(${JSON.stringify(focusSel)});if(el)el.focus();return !!el})()`,
      returnByValue: true,
    });
    await sleep(300);
  }
  if (has('--full')) {
    await send('Runtime.evaluate', { expression: "document.querySelectorAll('[data-reveal],[data-enter]').forEach(function(e){e.classList.add('is-in');e.classList.add('is-open')});" });
    await sleep(1600);
  }
  const dump = opt('--dump-dom', '');
  if (dump) {
    const r = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true });
    writeFileSync(dump, r.result.value);
  }
  let shot;
  if (has('--full')) {
    const m = await send('Page.getLayoutMetrics');
    const h = Math.ceil(m.cssContentSize.height);
    shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: h, scale: 1 } });
  } else {
    shot = await send('Page.captureScreenshot', { format: 'png' });
  }
  writeFileSync(out, Buffer.from(shot.data, 'base64'));
  writeFileSync(out.replace(/\.png$/, '') + '.console.txt', logLines.join('\n') + (logLines.length ? '\n' : ''));
  console.log(JSON.stringify({ out, width, height, full: has('--full'), consoleLines: logLines.length }));
}

try {
  await main();
} catch (e) {
  console.error('shoot.mjs: ' + ((e && e.message) || String(e)));
  process.exitCode = 1;
} finally {
  clearTimeout(watchdog);
  cleanup();
}
