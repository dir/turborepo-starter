import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}"],
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
});
