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

mkdirSync(join(ROOT, "app"), { recursive: true });

writeFileSync(join(ROOT, "app/icon.png"),              renderPng(FAVICON, 32));
writeFileSync(join(ROOT, "app/apple-icon.png"),        renderPng(FAVICON, 180));
writeFileSync(join(ROOT, "app/opengraph-image.png"),   renderPng(OG, 1200));
writeFileSync(join(ROOT, "app/twitter-image.png"),     renderPng(OG, 1200));

copyFileSync(join(ROOT, "assets/vora-favicon.svg"), join(ROOT, "app/icon.svg"));

console.log("Generated app/icon.{svg,png}, app/apple-icon.png, app/opengraph-image.png, app/twitter-image.png");
