import baseConfig from "@repo/eslint-config";
import reactConfig from "@repo/eslint-config/react";
// @ts-expect-error No types
import pluginTypeScriptPaths from "eslint-plugin-typescript-paths";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "typescript-paths": pluginTypeScriptPaths,
    },
    rules: {
      "typescript-paths/absolute-import": ["error", { enableAlias: false }],
      "typescript-paths/absolute-export": ["error", { enableAlias: false }],
      "typescript-paths/absolute-parent-import": ["error", { preferPathOverBaseUrl: true }],
      "typescript-paths/absolute-parent-export": ["error", { preferPathOverBaseUrl: true }],
    },
  },
];
