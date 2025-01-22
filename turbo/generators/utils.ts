import type { Package, WorkspacePackages } from "./types";

export const getWorkspacePackages = async (): Promise<Package[]> => {
  const { execa } = await import("execa");

  const { stdout } = await execa("pnpm", ["turbo", "ls", "--output=json"], {
    stdio: "pipe",
  });

  try {
    const result = JSON.parse(stdout) as WorkspacePackages;
    const packages = result.packages.items;

    // Sort packages into three groups and sort by name within each group
    const appsPackages = packages
      .filter((pkg) => pkg.path.startsWith("apps/"))
      .sort((a, b) => a.name.localeCompare(b.name));

    const configsPackages = packages
      .filter((pkg) => pkg.path.startsWith("configs/"))
      .sort((a, b) => a.name.localeCompare(b.name));

    const otherPackages = packages
      .filter((pkg) => !pkg.path.startsWith("apps/") && !pkg.path.startsWith("configs/"))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Combine the arrays in the desired order
    return [...appsPackages, ...otherPackages, ...configsPackages];
  } catch (error) {
    console.error("Failed to parse turbo ls output:", error);
    throw error;
  }
};
