import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
    },
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      "eol-last": ["error", "always"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
    },
  },
);
