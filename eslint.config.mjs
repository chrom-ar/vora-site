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
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: ["dist/", ".astro/", ".superpowers/"],
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
    // The two <script is:inline> bootstrap scripts in src/layouts/Base.astro
    // are deliberately terse (minimal inline payload) and use a silent
    // catch-and-ignore pattern for localStorage access. eslint-plugin-astro
    // lints that inline script content as a virtual "*.astro/*.ts" block, so
    // relax these three rules there without touching the frontmatter rules.
    files: ["**/*.astro/*.ts", "*.astro/*.ts"],
    rules: {
      "curly": "off",
      "no-empty": "off",
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
