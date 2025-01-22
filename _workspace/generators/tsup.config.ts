import { defineConfig } from "tsup";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineConfig({
  format: "cjs",
  outDir: "../../.gen",
  entry: {
    "Next.js/turbo/generators/config": "src/nextjs/config.ts",
    "Package/turbo/generators/config": "src/package/config.ts",
  },
  clean: true,
  onSuccess: async () => {
    // Define the package.json content
    const packageJson = JSON.stringify({ type: "commonjs" }, null, 2);

    // Create and write package.json for Next.js
    const nextjsDir = join("../../.gen", "Next.js");
    await writeFile(join(nextjsDir, "package.json"), packageJson);

    // Create and write package.json for Package
    const packageDir = join("../../.gen", "Package");
    await writeFile(join(packageDir, "package.json"), packageJson);
  },
});
