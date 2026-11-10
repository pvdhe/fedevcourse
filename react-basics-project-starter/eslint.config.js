import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // dist bevat automatisch gegenereerde buildbestanden, geen broncode om te controleren.
  { ignores: ["dist/**"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended, pluginReact.configs.flat["jsx-runtime"],
  // ESLint leest de geïnstalleerde React-versie uit het project.
  { settings: { react: { version: "detect" } } },
  { rules: { "react/prop-types": "off",  } }
]);
