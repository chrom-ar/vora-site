import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const problems = [];
const ok = m => console.log("  ok   " + m);
const bad = m => { problems.push(m); console.log("  FAIL " + m); };

// The landing pair, which every check below was originally written for, and
// the legal documents, which share the shell but none of the scene chrome.
const pages = ["index.html", "es/index.html"];
const DOC_PAIRS = [
  { en: "privacy/index.html", es: "es/privacy/index.html", canonical: "/privacy/", alt: "/es/privacy/" },
  { en: "terms/index.html", es: "es/terms/index.html", canonical: "/terms/", alt: "/es/terms/" },
];
const docPages = DOC_PAIRS.flatMap(d => [d.en, d.es]);
const allPages = [...pages, ...docPages];

// A route that stops being emitted at all is now a realistic failure (eight
// pages, four of them one-line files), and readFileSync would report it as a
// bare ENOENT stack rather than as a failed check.
const absent = allPages.filter(p => !existsSync(join(DIST, p)));
if (absent.length) {
  absent.forEach(p => bad(`page not built: ${p}`));
  console.log(`\n${problems.length} problem(s)`);
  process.exit(1);
}
const html = Object.fromEntries(allPages.map(p => [p, readFileSync(join(DIST, p), "utf8")]));

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
const markup = Object.fromEntries(allPages.map(p => [p, stripNonMarkup(html[p])]));

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
for (const p of allPages) {
  const ids = new Set([...markup[p].matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  const hrefs = [...markup[p].matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  const missing = hrefs.filter(h => !ids.has(h));
  missing.length ? bad(`${p}: dangling anchors ${missing.join(", ")}`) : ok(`${p}: ${hrefs.length} anchors resolve`);
}

// 3. Local asset URLs exist
const css = existsSync(join(DIST, "_astro"))
  ? readdirSync(join(DIST, "_astro")).filter(f => f.endsWith(".css"))
  : [];
const sources = [...allPages.map(p => html[p]), ...css.map(f => readFileSync(join(DIST, "_astro", f), "utf8"))];
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
for (const p of allPages) {
  const srcs = [...html[p].matchAll(/<script\b[^>]*\ssrc="(\/[^"]+)"/g)].map(m => m[1]);
  const missingSrcs = srcs.filter(s => !existsSync(join(DIST, s)));
  missingSrcs.length
    ? bad(`${p}: missing script bundles ${missingSrcs.join(", ")}`)
    : ok(`${p}: ${srcs.length} <script src> bundles resolve`);
}

// 4. No unexpected external hosts
const ALLOWED = new Set(["chrom.ar", "vora.chrom.ar"]);
const hosts = new Set(allPages.flatMap(p => [...html[p].matchAll(/https?:\/\/([a-z0-9.-]+)/g)].map(m => m[1])));
const extra = [...hosts].filter(h => !ALLOWED.has(h));
extra.length ? bad(`unexpected external hosts: ${extra.join(", ")}`) : ok(`external hosts limited to ${[...hosts].join(", ")}`);

// 4b. mailto: targets — the sole conversion path on this page, and
// invisible to the https?:// check above. Every CTA must reach the same
// address.
const mailtos = new Set(allPages.flatMap(p => [...html[p].matchAll(/mailto:([^"'?\s]+)/g)].map(m => m[1])));
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
// The legal pages carry the same inlined stylesheet as the landing pair but a
// fraction of its markup. The floor is the point of this one: these are the
// pages a Teams tenant admin and Microsoft's store review both read, and a
// renderer that silently emitted an empty <main> would pass every other check
// here. It is set above what such a page would weigh — the minified stylesheet
// alone is ~23.5 KB and the shell about 2.5 KB more — but below the real pages,
// whose prose adds 7.7 KB (terms) to 9.2 KB (privacy) on top.
for (const p of docPages) {
  budget(p, size(p), 29500, 48000);
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

// 8. The legal documents. They exist because a Microsoft Teams manifest points
// at /privacy and /terms and a tenant admin opens them from the install
// dialog, so "renders at all, in both locales, saying the right thing about
// the right URL" is a deployment requirement, not a nicety.
const SITE = "https://vora.chrom.ar";
const linkHref = (s, rel) => s.match(new RegExp(`<link rel="${rel}"[^>]*\\shref="([^"]+)"`))?.[1];
const hreflangHref = (s, code) =>
  s.match(new RegExp(`<link rel="alternate" hreflang="${code}"[^>]*\\shref="([^"]+)"`))?.[1];

for (const d of DOC_PAIRS) {
  // 8a. Same structure in both locales, same property the landing pair has.
  const [ta, tb] = [bodyTags(markup[d.en]), bodyTags(markup[d.es])];
  ta.length === tb.length && ta.every((t, i) => t === tb[i])
    ? ok(`${d.canonical} EN/ES body parity (${ta.length} tags)`)
    : bad(`${d.canonical} EN/ES body tag sequence differs (${ta.length} vs ${tb.length})`);

  // 8b. Canonical and hreflang per document. The four page files are
  // near-identical one-liners that differ only in which doc and which pair of
  // URLs they name, which makes a copy-paste between them the likeliest edit
  // and an undetectable one: /terms/ advertising /privacy/ as its canonical
  // de-indexes the terms page and tells Microsoft's crawler the wrong thing,
  // with every other check on this page still green.
  const expect = {
    [d.en]: { canonical: SITE + d.canonical, htmlLang: "en", brandHref: "/", toggleHref: d.alt, toggleHreflang: "es" },
    [d.es]: { canonical: SITE + d.alt, htmlLang: "es", brandHref: "/es/", toggleHref: d.canonical, toggleHreflang: "en" },
  };
  for (const page of [d.en, d.es]) {
    const toggleTag = markup[page].match(/<a\b[^>]*\sdata-lang="[^"]*"[^>]*>/)?.[0] ?? "";
    const actual = {
      canonical: linkHref(html[page], "canonical"),
      htmlLang: html[page].match(/<html[^>]*\slang="([^"]+)"/)?.[1],
      brandHref: markup[page].match(/<a\s+class="brand"\s+href="([^"]+)"/)?.[1],
      toggleHref: toggleTag.match(/\shref="([^"]+)"/)?.[1],
      toggleHreflang: toggleTag.match(/\shreflang="([^"]+)"/)?.[1],
    };
    const wrong = Object.entries(expect[page]).filter(([k, v]) => actual[k] !== v);
    // Both locales of a document must advertise the same alternate pair, and
    // it must be that document's pair.
    if (hreflangHref(html[page], "en") !== SITE + d.canonical) {wrong.push(["hreflang=en", SITE + d.canonical]);}
    if (hreflangHref(html[page], "es") !== SITE + d.alt) {wrong.push(["hreflang=es", SITE + d.alt]);}
    if (hreflangHref(html[page], "x-default") !== SITE + d.canonical) {wrong.push(["hreflang=x-default", SITE + d.canonical]);}
    wrong.length
      ? wrong.forEach(([k, v]) => bad(`${page}: ${k} expected "${v}", found "${actual[k] ?? hreflangHref(html[page], k.split("=")[1])}"`))
      : ok(`${page}: canonical, hreflang pair and locale attributes correct`);
  }
}

// 8c. No scene chrome on a legal page, and the text is not gated behind JS.
// Both are deliberate and both fail silently if undone. Shipping the importmap
// and the WebGL probe here would build a 9,500-particle vortex behind a page of
// prose for no reason; losing data-scene="off" leaves site.ts waiting 2.5s for
// the first frame of a scene that will never load, and the header — which
// carries [data-enter], so CSS starts it at opacity:0 — stays invisible until
// that timeout fires. Putting [data-reveal] on the prose would hide the whole
// document whenever site.js fails to load, on the two pages that most need to
// render without it.
for (const p of docPages) {
  const faults = [];
  if (!/<html[^>]*\sdata-scene="off"/.test(html[p])) {faults.push("data-scene=\"off\" missing from <html>");}
  for (const forbidden of ["importmap", "/assets/scene.js", "id=\"scene\"", "id=\"loader\""]) {
    if (html[p].includes(forbidden)) {faults.push(`scene chrome present: ${forbidden}`);}
  }
  // The <main> bounds are asserted before they are used, not assumed. Slicing
  // between two indexOf() calls that both return -1 yields "", and a search
  // for a reveal attribute inside "" passes — so a page that stopped emitting
  // <main> altogether would have satisfied the check below by having no
  // document at all, which is the one outcome it exists to catch.
  const mainStart = markup[p].indexOf("<main");
  const mainEnd = markup[p].indexOf("</main>");
  if (mainStart < 0 || mainEnd <= mainStart) {
    faults.push("no <main>…</main> to check");
  } else {
    const mainOnly = markup[p].slice(mainStart, mainEnd);
    for (const gate of ["data-reveal", "data-enter"]) {
      if (mainOnly.includes(gate)) {faults.push(`document text gated behind [${gate}]`);}
    }
  }
  faults.length
    ? faults.forEach(f => bad(`${p}: ${f}`))
    : ok(`${p}: no scene chrome, text not gated behind JavaScript`);
}

// 9. sitemap.xml against what was actually built. There is no sitemap
// integration — the file is hand-maintained in public/ — so adding a route and
// forgetting the sitemap is a one-line omission with no symptom, and deleting
// one leaves a <loc> pointing at a 404 that only a crawler ever reports. Both
// directions are checked.
const walkHtml = (d = "") => readdirSync(join(DIST, d), { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walkHtml(join(d, e.name)) : e.name.endsWith(".html") ? [join(d, e.name)] : []);
const indexable = walkHtml().filter(f => !f.includes("404"));
const builtUrls = new Set(indexable.map(f => SITE + "/" + f.replace(/index\.html$/, "")));
const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
const unlisted = [...builtUrls].filter(u => !locs.has(u));
const stale = [...locs].filter(u => !builtUrls.has(u));
unlisted.length || stale.length
  ? [...unlisted.map(u => `built but missing from sitemap.xml: ${u}`),
    ...stale.map(u => `in sitemap.xml but not built: ${u}`)].forEach(bad)
  : ok(`sitemap.xml lists exactly the ${locs.size} indexable pages`);

// 9b. The hand-maintained files that describe this site must name this site.
// `chrom.ar` is Chroma Labs and is a legitimate link target from the pages
// themselves (check 4 allows it), but a bare-domain URL in sitemap.xml,
// robots.txt or llms.txt points a crawler or a model at another company's
// homepage. This is the mistake that already shipped once, in astro.config's
// `site`.
for (const f of ["sitemap.xml", "robots.txt", "llms.txt"]) {
  // xmlns values are schema identifiers, not links to anything; they are URIs
  // by specification and are not the site's own origin.
  const text = readFileSync(join(DIST, f), "utf8").replace(/\sxmlns(:[a-z]+)?="[^"]*"/g, "");
  const wrong = [...new Set([...text.matchAll(/https?:\/\/[a-z0-9.-]+/g)]
    .map(m => m[0]).filter(u => u !== SITE))];
  wrong.length
    ? bad(`${f}: non-canonical origin(s) ${wrong.join(", ")} — must be ${SITE}`)
    : ok(`${f}: every absolute URL uses ${SITE}`);
}

console.log(problems.length ? `\n${problems.length} problem(s)` : "\nall checks passed");
process.exit(problems.length ? 1 : 0);
