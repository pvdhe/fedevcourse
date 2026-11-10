import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // dist bevat automatisch gegenereerde buildbestanden, geen broncode om te controleren.
  { ignores: ["dist/**"] },
  // Controleer JavaScript en JSX met de basisregels; browsernamen zoals window zijn toegestaan.
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  // Voeg React-regels toe en houd rekening met de moderne JSX-verwerking.
  pluginReact.configs.flat.recommended, pluginReact.configs.flat["jsx-runtime"],
  // ESLint leest de geïnstalleerde React-versie uit het project.
  { settings: { react: { version: "detect" } } },
  // Voor dit beginnersproject verplichten we geen aparte PropTypes-definities.
  { rules: { "react/prop-types": "off",  } }
]);
