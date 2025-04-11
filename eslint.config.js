import eslintPluginAstro from "eslint-plugin-astro";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // Ignore Astro-generated files
  {
    ignores: [".astro/**/*"],
  },
  // TypeScript configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  // JavaScript configuration
  {
    files: ["**/*.js"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  // Astro configuration
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
  // Prettier configuration (should be last to override other configs)
  prettierConfig,
];
