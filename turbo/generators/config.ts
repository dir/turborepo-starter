import type { PlopTypes } from "@turbo/gen";
import type { PackageJson } from "./types";
import { getWorkspacePackages } from "./utils";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("package", {
    description: "Scaffold a new React or Node.js package in the turborepo.",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "What type of package should be created?",
        choices: [
          { name: "React - for TSX (JSX) components", value: "react" },
          { name: "Node - for vanilla TypeScript", value: "node" },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the package? (you can skip the `@repo/` prefix)",
      },
      {
        type: "input",
        name: "deps",
        message: "Would you like to add any dependencies? (separated by spaces)",
      },
      {
        type: "checkbox",
        name: "packages",
        message: "Add this package as a dependency to:",
        async choices() {
          const workspacePackages = await getWorkspacePackages();
          return workspacePackages.map((pkg) => ({
            name: `${pkg.name} (${pkg.path})`,
            value: pkg.name,
          }));
        },
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@repo/")) {
            answers.name = answers.name.replace("@repo/", "");
          }
        }
        return "Sanitized inputs";
      },
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/packages/{{ kebabCase name }}",
        base: "templates/packages/{{ type }}",
        templateFiles: "templates/packages/{{ type }}/**/*",
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/packages/{{ kebabCase name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              const version = await fetch(
                `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
              )
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) pkg.dependencies = {};
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      async (answers) => {
        if (!("name" in answers && typeof answers.name === "string")) {
          return "Package not scaffolded, missing name";
        }

        const { execa } = await import("execa");

        await execa("pnpm", ["run", "ws:lint", "--fix", "--no-install"], {
          stdio: "inherit",
        });

        await execa("pnpm", ["install", "--ignore-scripts"], { stdio: "inherit" });

        return "Dependencies installed";
      },
      async (answers) => {
        if (!("name" in answers && typeof answers.name === "string")) {
          return "Package not scaffolded, missing name";
        }

        const { execa } = await import("execa");
        const prettierPath = plop.renderString("packages/{{ kebabCase name }}/**", answers);
        await execa("pnpm", ["prettier", "--write", prettierPath, "--list-different"], {
          stdio: "inherit",
        });

        return "Code formatted with prettier";
      },
      async (answers) => {
        if (!("name" in answers && typeof answers.name === "string")) {
          return "Package not scaffolded, missing name";
        }

        const { execa } = await import("execa");
        const packageName = plop.renderString("@repo/{{ kebabCase name }}", answers);
        await execa("pnpm", ["turbo", `${packageName}#build`, "--ui=stream", "--only"], {
          stdio: "inherit",
        });

        return "Package built with tsup";
      },
      async (answers) => {
        if (!("name" in answers && typeof answers.name === "string")) {
          return "Package not scaffolded, missing name";
        }

        let addedTo = 0;

        if (
          "packages" in answers &&
          Array.isArray(answers.packages) &&
          answers.packages.length > 0
        ) {
          const { execa } = await import("execa");
          const packageName = plop.renderString("@repo/{{ kebabCase name }}", answers);

          const filterFlags = answers.packages.map((pkg) => `--filter=${pkg}`);

          await execa("pnpm", ["add", packageName, ...filterFlags, "--workspace"], {
            stdio: "inherit",
          });

          addedTo = answers.packages.length;
        }

        return `Package added as dependency to ${addedTo} packages in workspace`;
      },
    ],
  });
}
