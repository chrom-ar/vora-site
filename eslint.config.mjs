import nextConfig from "eslint-config-next";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const eslintConfig = [
  js.configs.recommended,
  ...nextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
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
    rules: {
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "always-multiline"],
      "curly": "error",
      "eqeqeq": "error",
      "func-style": ["error", "expression"],
      "indent": ["error", 2, {
        "ignoredNodes": ["JSXElement *"],
      }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-tabs": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "quotes": ["error", "double"],
      "semi": "error",
    },
  },
];

export default eslintConfig;
