import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // De productiebuild bevat gegenereerde code en hoeft niet door ESLint gecontroleerd te worden.
  { ignores: ["dist/**"] },
  // Controleer JavaScript en JSX met de aanbevolen JavaScript-regels.
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  // Browsernamen zoals window en document mogen in deze bestanden worden gebruikt.
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  // Voeg de React-regels toe en houd rekening met de moderne JSX-verwerking.
  pluginReact.configs.flat.recommended, pluginReact.configs.flat["jsx-runtime"],
  // Lees de geïnstalleerde React-versie automatisch uit het project.
  { settings: { react: { version: "detect" } } },
  // Deze starter verplicht geen afzonderlijke PropTypes-definities voor componentprops.
  { rules: { "react/prop-types": "off",  } }
]);
