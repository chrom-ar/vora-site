import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const problems = [];
const ok = m => console.log("  ok   " + m);
const bad = m => { problems.push(m); console.log("  FAIL " + m); };

const pages = ["index.html", "es/index.html"];
const html = Object.fromEntries(pages.map(p => [p, readFileSync(join(DIST, p), "utf8")]));

// Markup-only view of a page: <style>/<script> bodies can (and do, via the
// inlined stylesheet) contain the exact substrings checks 1, 2 and 7 look
// for — a CSS attribute selector like [data-reveal] or a class rule like
// .mask-word{} embeds that hook's name whether or not the markup still
// carries it. Checks that reason about DOM structure read this instead of
// the raw page; checks 3 and 4 deliberately keep reading the raw page,
// because CSS (@font-face src) and inline script are exactly where a real
// local asset path or external host can legitimately appear.
const stripNonMarkup = s => s
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
const markup = Object.fromEntries(pages.map(p => [p, stripNonMarkup(html[p])]));

// 1. EN/ES body parity — the property that lets copy live in one place
const bodyTags = s => {
  const b = s.slice(s.indexOf("<body"), s.indexOf("</body>"));
  return [...b.matchAll(/<(\/?[a-z0-9]+)/g)].map(m => m[1]);
};
const [a, b] = pages.map(p => bodyTags(markup[p]));
a.length === b.length && a.every((t, i) => t === b[i])
  ? ok(`EN/ES body parity (${a.length} tags)`)
  : bad(`EN/ES body tag sequence differs (${a.length} vs ${b.length})`);

// 1b. EN/ES locale attributes — matching body tag sequences pass even when
// one page is the other's content verbatim (same tags, wrong hrefs), which
// is exactly the bug class caught by hand during this port: a hardcoded
// href="/" on the brand link that sent Spanish visitors to the English
// page. Assert the handful of attributes that must differ per locale
// against explicit expected values, not just against each other, so both
// pages being wrong in the same way still fails.
const LOCALE_EXPECT = {
  "index.html": { htmlLang: "en", brandHref: "/", toggleHref: "/es/", toggleHreflang: "es" },
  "es/index.html": { htmlLang: "es", brandHref: "/es/", toggleHref: "/", toggleHreflang: "en" },
};
for (const p of pages) {
  const expect = LOCALE_EXPECT[p];
  const htmlLang = html[p].match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  const brandHref = markup[p].match(/<a\s+class="brand"\s+href="([^"]+)"/)?.[1];
  const toggleTag = markup[p].match(/<a\b[^>]*\sdata-lang="[^"]*"[^>]*>/)?.[0] ?? "";
  const toggleHref = toggleTag.match(/\shref="([^"]+)"/)?.[1];
  const toggleHreflang = toggleTag.match(/\shreflang="([^"]+)"/)?.[1];
  const actual = { htmlLang, brandHref, toggleHref, toggleHreflang };
  const mismatches = Object.entries(expect).filter(([k, v]) => actual[k] !== v);
  mismatches.length
    ? mismatches.forEach(([k, v]) => bad(`${p}: ${k} expected "${v}", found "${actual[k]}"`))
    : ok(`${p}: locale attributes (html lang, brand href, lang-toggle href/hreflang) correct`);
}

// 2. Anchors resolve within the same page
for (const p of pages) {
  const ids = new Set([...markup[p].matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  const hrefs = [...markup[p].matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  const missing = hrefs.filter(h => !ids.has(h));
  missing.length ? bad(`${p}: dangling anchors ${missing.join(", ")}`) : ok(`${p}: ${hrefs.length} anchors resolve`);
}

// 3. Local asset URLs exist
const css = existsSync(join(DIST, "_astro"))
  ? readdirSync(join(DIST, "_astro")).filter(f => f.endsWith(".css"))
  : [];
const sources = [...pages.map(p => html[p]), ...css.map(f => readFileSync(join(DIST, "_astro", f), "utf8"))];
const urls = new Set(sources.flatMap(s => [...s.matchAll(/["'(](\/(?:assets|vendor|fonts)\/[^"')]+)/g)].map(m => m[1])));
const gone = [...urls].filter(u => !existsSync(join(DIST, u)));
gone.length ? bad(`missing local assets: ${gone.join(", ")}`) : ok(`${urls.size} local asset URLs resolve`);

// 3b. Every vendored file exists individually. The importmap only ever
// names the directory prefix ("three/addons/": "/vendor/three/addons/"),
// and scene.js imports the add-ons by bare specifier resolved through it —
// so check 3 above only ever sees that one prefix string, and
// existsSync() on a directory returns true even after every file inside it
// is deleted. List every file the scene actually needs, explicitly.
// NOTE: update this list if scene.js's imports change.
const VENDORED_FILES = [
  "vendor/three/three.module.min.js",
  "vendor/three/addons/postprocessing/EffectComposer.js",
  "vendor/three/addons/postprocessing/MaskPass.js",
  "vendor/three/addons/postprocessing/Pass.js",
  "vendor/three/addons/postprocessing/RenderPass.js",
  "vendor/three/addons/postprocessing/ShaderPass.js",
  "vendor/three/addons/postprocessing/UnrealBloomPass.js",
  "vendor/three/addons/shaders/CopyShader.js",
  "vendor/three/addons/shaders/LuminosityHighPassShader.js",
  "assets/scene.js",
];
const missingVendored = VENDORED_FILES.filter(f => !existsSync(join(DIST, f)));
missingVendored.length
  ? bad(`missing vendored/scene files: ${missingVendored.join(", ")}`)
  : ok(`all ${VENDORED_FILES.length} vendored/scene files present`);

// 3c. Every bundled <script src> resolves in dist. This is the site.js
// bundle produced by Astro (the no-js→js swap depends on it, and losing it
// silently leaves every data-reveal element at opacity:0) — it lives under
// /_astro/, a path check 3 never looks at because that check's URL
// alternation is (assets|vendor|fonts) only.
for (const p of pages) {
  const srcs = [...html[p].matchAll(/<script\b[^>]*\ssrc="(\/[^"]+)"/g)].map(m => m[1]);
  const missingSrcs = srcs.filter(s => !existsSync(join(DIST, s)));
  missingSrcs.length
    ? bad(`${p}: missing script bundles ${missingSrcs.join(", ")}`)
    : ok(`${p}: ${srcs.length} <script src> bundles resolve`);
}

// 4. No unexpected external hosts
const ALLOWED = new Set(["chrom.ar", "vora.chrom.ar"]);
const hosts = new Set(pages.flatMap(p => [...html[p].matchAll(/https?:\/\/([a-z0-9.-]+)/g)].map(m => m[1])));
const extra = [...hosts].filter(h => !ALLOWED.has(h));
extra.length ? bad(`unexpected external hosts: ${extra.join(", ")}`) : ok(`external hosts limited to ${[...hosts].join(", ")}`);

// 4b. mailto: targets — the sole conversion path on this page, and
// invisible to the https?:// check above. Every CTA must reach the same
// address.
const mailtos = new Set(pages.flatMap(p => [...html[p].matchAll(/mailto:([^"'?\s]+)/g)].map(m => m[1])));
const badMailtos = [...mailtos].filter(m => m !== "contact@chrom.ar");
mailtos.size && !badMailtos.length
  ? ok(`mailto: targets all resolve to contact@chrom.ar (${mailtos.size} address${mailtos.size === 1 ? "" : "es"})`)
  : bad(`unexpected mailto: targets: ${badMailtos.length ? badMailtos.join(", ") : "none found"}`);

// 5. Byte budgets (spec 4.5). Both a ceiling and a floor are deliberate on
// every entry: a ceiling alone catches bloat but passes harder the more you
// delete, so a truncated or emptied file — the realistic failure mode for a
// missing chunk of vendored code or copy — sails through. Bounds are set
// around each artifact's real current size with headroom for normal growth
// on either side.
const size = p => statSync(join(DIST, p)).size;
const dirSize = d => readdirSync(join(DIST, d), { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory() ? dirSize(join(d, e.name)) : size(join(d, e.name))), 0);
const budget = (name, actual, min, max) =>
  actual >= min && actual <= max
    ? ok(`${name} ${actual} in [${min}, ${max}]`)
    : bad(`${name} ${actual} not in [${min}, ${max}]`);
budget("three.module.min.js", size("vendor/three/three.module.min.js"), 600000, 720000);
budget("add-ons", dirSize("vendor/three/addons"), 20000, 40000);
budget("fonts", dirSize("fonts"), 90000, 120000);
budget("scene.js", size("assets/scene.js"), 6000, 24000);
for (const p of pages) {
  budget(p, size(p), 25000, 45000);
}
// 5b. CSS — the single authored stylesheet, checked at its source size
// rather than the inlined/minified copy in dist/: minification would
// otherwise make this budget track the minifier's whims instead of what
// gets written. Bound: < 30 KB (spec), current ~26.2 KB.
budget("styles/globals.css", statSync("src/styles/globals.css").size, 20000, 30000);
// 5c. site.js + scene.js combined — the one file budget above covers
// scene.js alone; this is the pair the spec actually budgets. site.js is
// the sole non-vendor file Astro emits under _astro/ for these pages.
const astroJs = readdirSync(join(DIST, "_astro")).filter(f => f.endsWith(".js"));
const siteJsSize = astroJs.reduce((n, f) => n + size(join("_astro", f)), 0);
budget("site.js + scene.js", siteJsSize + size("assets/scene.js"), 8000, 24000);

// 6. Attribution must ship
existsSync(join(DIST, "LICENSES.md")) ? ok("LICENSES.md deployed") : bad("LICENSES.md missing from dist");

// 7. The DOM contract site.js depends on — exact occurrence counts, not
// just presence. Presence-anywhere cannot see partial loss: one component
// silently dropping a hook while its siblings keep theirs would still read
// "present" on the page, and that partial loss is the realistic failure for
// this port (one component's reveal breaking is far likelier than every
// provider losing it at once). Counting closes that gap.
//
// Expected counts below were measured in the stripped markup of both this
// port's built pages and both design-source pages (`site_example` at HEAD
// 8f14cc4) — every count matches on both locales, which is itself evidence
// that one component tree renders both. `site_example` is a sibling
// repository, not part of this one, and may move or disappear, so its
// numbers are hardcoded here rather than read from it at run time: a
// checker that silently degrades when its reference vanishes is worse than
// one with explicit constants. Changing this port's markup on purpose means
// updating this table on purpose too — an unintended change to a hook's
// count should fail.
const HOOK_COUNTS = {
  "id=\"scene\"": 1,
  "id=\"loader\"": 1,
  "id=\"coords\"": 1,
  "class=\"top\"": 1,
  "hero-foot": 1,
  "hf-inner": 1,
  "mask-word": 12,
  "data-reveal": 26,
  "data-enter": 2,
  "data-decode": 3,
  "data-glitch": 4,
  "data-lang": 1,
};
const countOf = (s, needle) => s.split(needle).length - 1;
for (const p of pages) {
  const mismatches = Object.entries(HOOK_COUNTS)
    .map(([hook, expected]) => [hook, expected, countOf(markup[p], hook)])
    .filter(([, expected, found]) => expected !== found);
  mismatches.length
    ? mismatches.forEach(([hook, expected, found]) => bad(`${p}: ${hook}: expected ${expected}, found ${found}`))
    : ok(`${p}: all ${Object.keys(HOOK_COUNTS).length} DOM hooks match expected counts`);
}

console.log(problems.length ? `\n${problems.length} problem(s)` : "\nall checks passed");
process.exit(problems.length ? 1 : 0);
