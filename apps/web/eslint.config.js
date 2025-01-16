import { config as baseConfig } from "@repo/eslint-config";
import { config as nextJsConfig } from "@repo/eslint-config/nextjs";

/** @type {import('typescript-eslint').Config} */
export default [{ ignores: [".next/**"] }, ...baseConfig, ...nextJsConfig];
