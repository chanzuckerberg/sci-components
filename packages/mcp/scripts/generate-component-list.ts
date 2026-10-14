import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ComponentList } from "../src/lib/types.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const ignoredComponents = ["Bases", "Deprecated", "styles"];

/**
 * A directory under `src/core` is only a component if it exports one. Some
 * directories exist purely to hold a Storybook docs page — data-viz's
 * `Overview` is the package introduction, not a component — and those have to
 * stay out of the list, since it drives the `list_components` tool as well as
 * the props and docs generators.
 */
function isComponentDirectory(directory: string): boolean {
  return ["index.tsx", "index.ts"].some((entry) =>
    fs.existsSync(path.join(directory, entry))
  );
}

function scanPackage(corePath: string, label: string): string[] {
  if (!fs.existsSync(corePath)) {
    console.error(`${label} package not found at:`, corePath);
    return [];
  }

  return fs
    .readdirSync(corePath)
    .filter((item) => {
      const itemPath = path.join(corePath, item);

      return (
        fs.statSync(itemPath).isDirectory() &&
        !item.startsWith("_") &&
        !ignoredComponents.includes(item) &&
        isComponentDirectory(itemPath)
      );
    })
    .sort();
}

function scanComponentsPackage(): string[] {
  return scanPackage(
    path.join(dirname, "../../components/src/core"),
    "Components"
  );
}

function scanDataVizPackage(): string[] {
  return scanPackage(path.join(dirname, "../../data-viz/src/core"), "Data-viz");
}

function generateComponentList() {
  console.log("Scanning @czi-sds/components package...");
  const coreComponents = scanComponentsPackage();
  console.log(
    `Found ${coreComponents.length} components in @czi-sds/components`
  );

  console.log("\nScanning @czi-sds/data-viz package...");
  const dataVizComponents = scanDataVizPackage();
  console.log(
    `Found ${dataVizComponents.length} components in @czi-sds/data-viz`
  );

  const componentList: ComponentList = {
    components: coreComponents,
    "data-viz": dataVizComponents,
  };

  const outputPath = path.join(dirname, "../data/component-list.json");

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(componentList, null, 2));

  console.log(`\n✅ Component list generated successfully!`);
  console.log(`📂 Output: ${outputPath}`);
  console.log(
    `📊 Total components: ${coreComponents.length + dataVizComponents.length}`
  );

  console.log("\n📦 Package breakdown:");
  console.log(`- @czi-sds/components: ${coreComponents.length} components`);
  console.log(`- @czi-sds/data-viz: ${dataVizComponents.length} components`);

  return componentList;
}

generateComponentList();
