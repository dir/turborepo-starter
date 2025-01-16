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
  printWidth: 90,
  useTabs: false,
};

/** @type {import('prettier').Options} */
export default {
  ...overridableDefaults,
  singleQuote: false,
};
