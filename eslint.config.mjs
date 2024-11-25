// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

import tailwind from "eslint-plugin-tailwindcss";

export default withNuxt([
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
