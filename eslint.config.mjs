import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: "babel-eslint",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-undef": "error", // Add this rule to catch undefined variables
    },
  },
  
  pluginJs.configs.recommended,
  reactPlugin.configs.recommended,
];