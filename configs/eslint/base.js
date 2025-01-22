/// <reference types="./types.d.ts" />
import js from "@eslint/js";
import ts from "typescript-eslint";
import configPrettier from "eslint-config-prettier";
import pluginN from "eslint-plugin-n";
import pluginTurbo from "eslint-plugin-turbo";
import pluginImportX from "eslint-plugin-import-x";
import { includeIgnoreFile } from "@eslint/compat";
import { join } from "node:path";

/**
 * Gets a path to a file relative to the current directory
 * @param {string} path
 * @returns {string}
 */
const getNormalizedProjectPath = (path) => join(import.meta.dirname, "../../", path);

const baseConfig = ts.config(
  includeIgnoreFile(getNormalizedProjectPath(".gitignore")),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: {
      turbo: pluginTurbo,
      "import-x": pluginImportX,
      n: pluginN,
    },
    settings: {
      ...pluginImportX.configs.typescript.settings,
      "import-x/resolver": {
        typescript: {
          project: [
            `${getNormalizedProjectPath("apps")}/*/tsconfig.json`,
            `${getNormalizedProjectPath("configs")}/*/tsconfig.json`,
            `${getNormalizedProjectPath("packages")}/*/tsconfig.json`,
            `${getNormalizedProjectPath("repo")}/*/tsconfig.json`,
          ],
        },
        node: true,
      },
    },
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...ts.configs.recommendedTypeChecked,
      ...ts.configs.stylisticTypeChecked,
    ],
    rules: {
      ...pluginImportX.configs.typescript.rules,
      ...pluginTurbo.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "n/prefer-node-protocol": "error",
      "n/no-deprecated-api": "error",
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
  configPrettier,
);

export default baseConfig;
