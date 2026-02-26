import js from "@eslint/js";
import globals from "globals";
import p5jsConfig from "@fal-works/eslint-config-p5js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    ...js.configs.recommended,
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...p5jsConfig.globals,
        setup: "readonly",
        draw: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { "varsIgnorePattern": "setup|draw" }],
      "no-undef": "error",
    } 
  },
]);
