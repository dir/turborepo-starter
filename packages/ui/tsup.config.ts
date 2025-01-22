import type { Options } from "tsup";
import { defineConfig } from "tsup";

const config: Options = {
  format: ["esm", "cjs"],
  external: ["react", "react-dom", "next"],
  dts: true,
  splitting: true,
  sourcemap: true,
  bundle: false,
  clean: true,
  skipNodeModulesBundle: true,
  treeshake: false,
  tsconfig: "tsconfig.json",
};

export default defineConfig((_options) => [
  {
    ...config,
    entry: ["tailwind.config.ts", "postcss.config.mjs"],
    outDir: "dist/configs",
  },
  {
    ...config,
    entry: ["src/components/*.{ts,tsx}"],
  },
  {
    ...config,
    entry: ["src/**/*.{ts,tsx}", "!src/components/**/*"],
  },
]);
