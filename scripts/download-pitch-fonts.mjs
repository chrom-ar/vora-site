import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "..", "public", "fonts");

const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const families = [
  { url: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap", base: "source-serif-4" },
  { url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap", base: "inter" },
  { url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap", base: "jetbrains-mono" },
];

const wanted = new Set([
  "source-serif-4-400-normal", "source-serif-4-500-normal", "source-serif-4-600-normal",
  "source-serif-4-400-italic", "source-serif-4-500-italic",
  "inter-400-normal", "inter-500-normal", "inter-600-normal",
  "jetbrains-mono-400-normal", "jetbrains-mono-500-normal",
]);

const parseLatinBlocks = (css, base) => {
  const blocks = css.split("@font-face").slice(1);
  const found = {};
  for (const b of blocks) {
    if (!b.includes("U+0000-00FF")) {
      continue;
    }
    const weight = (b.match(/font-weight:\s*(\d+)/) || [])[1];
    const style = b.includes("italic") ? "italic" : "normal";
    const url = (b.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
    if (!weight || !url) {
      continue;
    }
    const key = `${base}-${weight}-${style}`;
    if (wanted.has(key)) {
      found[key] = url;
    }
  }
  return found;
};

await mkdir(out, { recursive: true });

for (const { url, base } of families) {
  const css = await fetch(url, { headers: { "User-Agent": ua } }).then(r => r.text());
  const latin = parseLatinBlocks(css, base);
  for (const [key, fontUrl] of Object.entries(latin)) {
    const buf = new Uint8Array(await fetch(fontUrl).then(r => r.arrayBuffer()));
    const file = key.endsWith("-normal") ? key.replace(/-normal$/, "") : key;
    await writeFile(join(out, `${file}.woff2`), buf);
    console.log("wrote", file + ".woff2", buf.length, "bytes");
  }
}
