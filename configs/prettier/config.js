import { fileURLToPath, URL } from "node:url";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 *
 * @type {import('prettier').Options}
 */
const overridableDefaults = {
  endOfLine: "lf",
  tabWidth: 2,
  printWidth: 94,
  useTabs: false,
};

/** @type { PrettierConfig | TailwindConfig } */
const config = {
  ...overridableDefaults,
  singleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: fileURLToPath(
    new URL("../../packages/ui/tailwind.config.ts", import.meta.url),
  ),
  tailwindFunctions: ["cn", "cva"],
};

export default config;
