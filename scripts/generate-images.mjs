import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = new URL("..", import.meta.url).pathname;
const FAVICON = readFileSync(join(ROOT, "assets/vora-favicon.svg"), "utf8");
const OG = readFileSync(join(ROOT, "assets/vora-og.svg"), "utf8");

const FONT_FILES = [
  join(ROOT, "public/fonts/instrument-serif-italic-latin.woff2"),
  join(ROOT, "public/fonts/instrument-serif-italic-latin-ext.woff2"),
  join(ROOT, "public/fonts/instrument-serif-latin.woff2"),
  join(ROOT, "public/fonts/instrument-serif-latin-ext.woff2"),
  join(ROOT, "public/fonts/jetbrains-mono-latin.woff2"),
  join(ROOT, "public/fonts/jetbrains-mono-latin-ext.woff2"),
];

const renderPng = (svg, width) => new Resvg(svg, {
  fitTo: { mode: "width", value: width },
  font: { fontFiles: FONT_FILES, loadSystemFonts: true, defaultFontFamily: "Instrument Serif" },
}).render().asPng();

mkdirSync(join(ROOT, "public"), { recursive: true });

writeFileSync(join(ROOT, "public/icon.png"),            renderPng(FAVICON, 32));
writeFileSync(join(ROOT, "public/apple-icon.png"),      renderPng(FAVICON, 180));
writeFileSync(join(ROOT, "public/opengraph-image.png"), renderPng(OG, 1200));
writeFileSync(join(ROOT, "public/twitter-image.png"),   renderPng(OG, 1200));

copyFileSync(join(ROOT, "assets/vora-favicon.svg"), join(ROOT, "public/icon.svg"));

console.log("Generated public/icon.{svg,png}, public/apple-icon.png, public/opengraph-image.png, public/twitter-image.png");
