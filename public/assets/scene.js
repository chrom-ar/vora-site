/* Vora — Flux Vortex scene. Port of "Flux Vortex" (Structure Flow) from the
   ThreeUI Community catalog by Meng To, MIT License. The changes made for
   this site are listed in /LICENSES.md. */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const root = document.documentElement;
const canvas = document.getElementById('scene');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.matchMedia('(max-width: 768px)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function setState(state) {
  root.dataset.scene = state;
  document.dispatchEvent(new CustomEvent('vora:scene', { detail: { state } }));
}

function fail(state, err) {
  root.classList.add('no-webgl');
  setState(state);
  if (err) console.error('[vora scene]', err);
}

function supported() {
  try {
    const probe = document.createElement('canvas');
    const gl = window.WebGL2RenderingContext && probe.getContext('webgl2');
    if (gl) { const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); }
    return Boolean(gl);
  } catch (_) {
    return false;
  }
}

function start() {
  const config = { colors: { bg: 0x050505, primary: 0xdddddd, secondary: 0x555555 } };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.colors.bg);
  scene.fog = new THREE.FogExp2(config.colors.bg, 0.04);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const mainGroup = new THREE.Group();
  mainGroup.position.x = small ? 0 : 1.9; // desktop: the funnel sits right of the hero copy
  scene.add(mainGroup);

  // 1. Vortex particle field
  const vortexCount = small ? 6000 : 9500;
  const vortexPositions = new Float32Array(vortexCount * 3);
  const vortexRadius = new Float32Array(vortexCount);
  const vortexAngle = new Float32Array(vortexCount);
  const vortexHeight = new Float32Array(vortexCount);
  const vortexSpeed = new Float32Array(vortexCount);
  for (let i = 0; i < vortexCount; i++) {
    const i3 = i * 3;
    const y = (Math.random() - 0.5) * 7.5;
    const funnel = 0.4 + Math.abs(y) * 0.2;
    const r = (0.1 + Math.pow(Math.random(), 1.5) * 2.5) * funnel;
    const a = Math.random() * Math.PI * 2;
    vortexHeight[i] = y;
    vortexRadius[i] = r;
    vortexAngle[i] = a;
    vortexSpeed[i] = 0.5 + Math.random() * 0.8;
    vortexPositions[i3] = Math.cos(a) * r;
    vortexPositions[i3 + 1] = y;
    vortexPositions[i3 + 2] = Math.sin(a) * r;
  }
  const vortexGeometry = new THREE.BufferGeometry();
  vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
  const vortexMaterial = new THREE.PointsMaterial({
    size: 0.006, color: config.colors.primary, transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  mainGroup.add(new THREE.Points(vortexGeometry, vortexMaterial));

  // 2. Spiral guides
  function createSpiralLine(turnOffset, color) {
    const points = [];
    const pointCount = 400;
    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      const angle = t * Math.PI * 14 + turnOffset;
      const radius = 0.2 + t * 2.8;
      const y = (0.5 - t) * 6.0;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
    return new THREE.Line(geometry, material);
  }
  const spiralLineA = createSpiralLine(0, config.colors.secondary);
  const spiralLineB = createSpiralLine(Math.PI, config.colors.primary);
  mainGroup.add(spiralLineA);
  mainGroup.add(spiralLineB);

  // 3. Ambient particles
  const particlesCount = small ? 200 : 300;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 12;
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMesh = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
    size: 0.008, color: config.colors.secondary, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending,
  }));
  scene.add(particlesMesh);

  // Post-processing
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.85);
  bloomPass.strength = 0.6;
  bloomPass.radius = 0.3;
  bloomPass.threshold = 0.2;
  composer.addPass(bloomPass);

  // State
  let mouseX = 0, mouseY = 0, tiltX = 0;
  let progress = 0, targetProgress = 0;
  let rafId = 0, running = false, firstFrame = false;
  const clock = new THREE.Clock();

  function readScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetProgress = Math.min(1, Math.max(0, (window.scrollY || 0) / max));
  }

  function frame() {
    const t = clock.getElapsedTime();
    const e = Math.min(1, t / 2);
    mainGroup.scale.setScalar(0.6 + 0.4 * (1 - Math.pow(1 - e, 3)));

    progress += (targetProgress - progress) * 0.06;
    const targetX = mouseX * 0.001;
    const targetY = mouseY * 0.0008;
    mainGroup.rotation.y += 0.002;
    mainGroup.rotation.y += 0.03 * (targetX - mainGroup.rotation.y);
    tiltX += 0.03 * (targetY - tiltX);
    mainGroup.rotation.x = tiltX + progress * 0.35;
    mainGroup.position.y = -progress * 0.8;
    camera.position.z = 7 + progress * 2.5;
    bloomPass.strength = 0.6 - progress * 0.15;

    const positions = vortexGeometry.attributes.position.array;
    for (let i = 0; i < vortexCount; i++) {
      const i3 = i * 3;
      const spin = t * vortexSpeed[i] * 0.5 + vortexHeight[i] * 0.5;
      const angle = vortexAngle[i] + spin;
      const pulse = Math.sin(t * 1.2 + i * 0.01) * 0.05;
      const radius = vortexRadius[i] + pulse;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = vortexHeight[i] + Math.sin(t + i * 0.02) * 0.03;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }
    vortexGeometry.attributes.position.needsUpdate = true;
    spiralLineA.rotation.y = t * 0.15;
    spiralLineB.rotation.y = -t * 0.12;
    particlesMesh.rotation.y = t * 0.03;
    particlesMesh.rotation.x = -mouseY * 0.0001;

    composer.render();
    if (!firstFrame) { firstFrame = true; setState('ready'); }
    if (running) rafId = requestAnimationFrame(frame);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    readScroll();
    if (reduced) composer.render(); // setSize clears the buffer; redraw the still frame
  }
  let resizeTimer = 0;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(onResize, 150); });

  if (reduced) {
    mainGroup.scale.setScalar(1);
    composer.render();
    setState('ready');
    return;
  }

  if (fine) {
    document.addEventListener('pointermove', (event) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
    }, { passive: true });
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  function play() { if (running) return; running = true; rafId = requestAnimationFrame(frame); }
  function pause() { running = false; cancelAnimationFrame(rafId); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else play(); });
  play();
}

if (!canvas || !supported()) {
  fail('unsupported');
} else {
  try { start(); } catch (err) { fail('error', err); }
}
