import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, copyFileSync } from "node:fs";
import { join, basename } from "node:path";
import { tmpdir } from "node:os";
import { Resvg } from "@resvg/resvg-js";
import { decompress } from "wawoff2";

const ROOT = new URL("..", import.meta.url).pathname;
const FAVICON = readFileSync(join(ROOT, "assets/vora-favicon.svg"), "utf8");
const OG = readFileSync(join(ROOT, "assets/vora-og.svg"), "utf8");

const WOFF2_FILES = [
  "source-serif-4-400.woff2",
  "source-serif-4-400-italic.woff2",
  "source-serif-4-500.woff2",
  "source-serif-4-500-italic.woff2",
  "source-serif-4-600.woff2",
  "jetbrains-mono-400.woff2",
  "jetbrains-mono-500.woff2",
];

// resvg cannot read woff2 — it silently renders nothing and, with
// loadSystemFonts enabled, substitutes whatever the host machine happens to
// have. That made the output both off-brand and machine-dependent. Decompress
// to TTF first, and keep loadSystemFonts off so a failure is visible instead.
const SFNT_MAGIC = new Set(["00010000", "74727565", "4f54544f"]);

// Sequential, not Promise.all: wawoff2 is WASM-backed with a single shared
// heap and is not reentrant, so concurrent decompress calls corrupt each other.
const toTtf = async dir => {
  const paths = [];
  for (const name of WOFF2_FILES) {
    const ttf = Buffer.from(await decompress(readFileSync(join(ROOT, "public/fonts", name))));
    if (!SFNT_MAGIC.has(ttf.subarray(0, 4).toString("hex"))) {
      throw new Error(`${name} did not decompress to a valid TTF/OTF`);
    }
    const out = join(dir, `${basename(name, ".woff2")}.ttf`);
    writeFileSync(out, ttf);
    paths.push(out);
  }
  return paths;
};

const fontDir = mkdtempSync(join(tmpdir(), "vora-fonts-"));

try {
  const fontFiles = await toTtf(fontDir);

  const renderPng = (svg, width) => new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Source Serif 4" },
  }).render().asPng();

  mkdirSync(join(ROOT, "public"), { recursive: true });

  writeFileSync(join(ROOT, "public/icon.png"),            renderPng(FAVICON, 32));
  writeFileSync(join(ROOT, "public/apple-icon.png"),      renderPng(FAVICON, 180));
  writeFileSync(join(ROOT, "public/opengraph-image.png"), renderPng(OG, 1200));
  writeFileSync(join(ROOT, "public/twitter-image.png"),   renderPng(OG, 1200));

  copyFileSync(join(ROOT, "assets/vora-favicon.svg"), join(ROOT, "public/icon.svg"));
} finally {
  rmSync(fontDir, { recursive: true, force: true });
}

console.log("Generated public/icon.{svg,png}, public/apple-icon.png, public/opengraph-image.png, public/twitter-image.png");
