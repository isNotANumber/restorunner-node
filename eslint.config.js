import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: ["dist", "./eslint.config.js"] },
  {
    extends: [js.configs.recommended, tseslint.configs.recommended],
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tsparser,
    },
  }
);
