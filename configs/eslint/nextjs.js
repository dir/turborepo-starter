import pluginNext from "@next/eslint-plugin-next";

/**
 * A custom ESLint configuration for Next.js projects.
 *
 * @type {Awaited<import('typescript-eslint').Config>}
 */
const nextJsConfig = [
  {
    ignores: [".next/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-duplicate-head": "off",
    },
  },
];

export default nextJsConfig;
