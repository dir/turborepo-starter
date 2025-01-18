import type { Options } from "tsup";
import { defineConfig } from "tsup";

const config: Options = {
  format: ["esm", "cjs"],
  external: ["react", "react-dom", "next"],
  dts: true,
  splitting: false,
  sourcemap: true,
  bundle: false,
  skipNodeModulesBundle: true,
  treeshake: false,
};

export default defineConfig((options) => [
  {
    ...config,
    minify: !options.watch,
    clean: !options.watch,
    entry: ["tailwind.config.ts", "postcss.config.mjs"],
    outDir: "dist/configs",
  },
  {
    ...config,
    minify: !options.watch,
    clean: !options.watch,
    entry: ["src/components/*.{ts,tsx}"],
  },
  {
    ...config,
    minify: !options.watch,
    clean: !options.watch,
    entry: ["src/**/*.{ts,tsx}", "!src/components/**/*"],
  },
]);
