import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * A custom ESLint configuration for packages that use React.
 *
 * @type {Awaited<import('typescript-eslint').Config>}
 */
const reactConfig = [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: {
      globals: {
        React: "writeable",
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
];

export default reactConfig;
