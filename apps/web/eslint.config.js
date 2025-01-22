import baseConfig from "@repo/eslint-config";
import nextJsConfig from "@repo/eslint-config/nextjs";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...nextJsConfig];
