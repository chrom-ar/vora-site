import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
}, ...compat.extends("next/core-web-vitals"), {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    "@typescript-eslint": typescriptEslint,
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2022,
    sourceType: "module",
  },

  rules: {
    "@typescript-eslint/naming-convention": ["error", {
      selector: "import",
      format: ["camelCase", "PascalCase"],
    }],

    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "curly": "error",
    "eqeqeq": "error",
    "func-style": ["error", "expression"],
    "indent": ["error", 2, {
      "ignoredNodes": ["JSXElement *"]
    }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-tabs": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "quotes": ["error", "double"],
    "semi": "error",
  },
}];

export default eslintConfig;
