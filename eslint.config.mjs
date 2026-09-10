import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";

const eslintConfig = [
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    files: ["**/*.ts", "**/*.astro"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // TypeScript handles this natively, no-undef causes false positives
      "no-undef": "off",
      "@typescript-eslint/naming-convention": ["error", {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      }],
    },
  },
  {
    files: ["scripts/**/*.mjs", "tools/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Vendored third-party code (three.js itself) must never be linted or
    // reformatted — it isn't ours to restyle, and it has to stay
    // byte-identical to upstream. public/assets/scene.js is NOT vendored
    // third-party code — it's the design source's own scene module, ported
    // the same way src/scripts/site.ts is — so it is deliberately left out
    // of this list and linted via its own override below.
    ignores: ["dist/", ".astro/", ".superpowers/", "public/vendor/"],
  },
  {
    rules: {
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "always-multiline"],
      "curly": "error",
      "eqeqeq": "error",
      "func-style": ["error", "expression"],
      "indent": ["error", 2],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-tabs": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "quotes": ["error", "double"],
      "semi": "error",
    },
  },
  {
    // The four <script is:inline> bootstrap scripts in src/layouts/Base.astro
    // are deliberately terse (minimal inline payload) and use a silent
    // catch-and-ignore pattern for localStorage access. eslint-plugin-astro
    // lints that inline script content as a virtual "*.astro/*.ts" block, so
    // relax these rules there without touching the frontmatter rules. `semi`
    // is included because the verbatim WebGL-probe script omits semicolons
    // ASI would otherwise insert.
    files: ["**/*.astro/*.ts", "*.astro/*.ts"],
    rules: {
      "curly": "off",
      "no-empty": "off",
      "no-unused-vars": "off",
      "semi": "off",
    },
  },
  {
    // src/scripts/site.ts is a verbatim port of the design source's
    // assets/site.js, kept diffable against upstream so future upstream
    // changes can be applied directly. Reformatting it would destroy that
    // and risk a behavioural change for zero benefit, so relax only the
    // stylistic rules it trips; correctness rules stay in force.
    files: ["src/scripts/site.ts"],
    rules: {
      "quotes": "off",
      "curly": "off",
      "func-style": "off",
      "no-unused-vars": "off",
    },
  },
  {
    // public/assets/scene.js is a verbatim port of the design source's
    // assets/scene.js, kept diffable against upstream (and byte-identical,
    // per the attribution requirement in LICENSES.md). It runs as a browser
    // <script type="module">, not through Node, so it needs browser globals
    // rather than a blanket no-undef waiver. Only the stylistic rules it
    // trips are relaxed; correctness rules stay in force, so a real bug
    // (e.g. an actual undefined reference) still surfaces.
    files: ["public/assets/scene.js"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "quotes": "off",
      "curly": "off",
      "func-style": "off",
      "no-unused-vars": "off",
      "arrow-parens": "off",
    },
  },
  {
    // tools/shoot.mjs is a verbatim copy of the design source's own
    // screenshot driver (task-10-brief.md Step 1), kept diffable against
    // upstream rather than reformatted to this repo's house style. Same
    // rationale and same rule set as the site.ts/scene.js overrides above.
    files: ["tools/shoot.mjs"],
    rules: {
      "quotes": "off",
      "curly": "off",
      "func-style": "off",
      "no-unused-vars": "off",
      "arrow-parens": "off",
    },
  },
];

export default eslintConfig;
