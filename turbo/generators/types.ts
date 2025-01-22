export interface PackageJson {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface WorkspacePackages {
  packageManager: string;
  packages: {
    count: number;
    items: Package[];
  };
}

export type Package = {
  name: string;
  path: string;
};
