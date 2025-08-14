import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export interface ComponentList {
  components: string[];
  "data-viz": string[];
}

const ignoredComponents = ["Bases", "styles"];

function scanComponentsPackage(): string[] {
  const components: string[] = [];
  const componentsPath = path.join(dirname, "../../components/src/core");

  if (!fs.existsSync(componentsPath)) {
    console.error("Components package not found at:", componentsPath);
    return components;
  }

  const items = fs.readdirSync(componentsPath);

  for (const item of items) {
    const itemPath = path.join(componentsPath, item);
    const stats = fs.statSync(itemPath);

    if (
      stats.isDirectory() &&
      !item.startsWith("_") &&
      !ignoredComponents.includes(item)
    ) {
      components.push(item);
    }
  }

  return components.sort();
}

function scanDataVizPackage(): string[] {
  const components: string[] = [];
  const dataVizPath = path.join(dirname, "../../data-viz/src/core");

  if (!fs.existsSync(dataVizPath)) {
    console.error("Data-viz package not found at:", dataVizPath);
    return components;
  }

  const items = fs.readdirSync(dataVizPath);

  for (const item of items) {
    const itemPath = path.join(dataVizPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory() && !item.startsWith("_")) {
      components.push(item);
    }
  }

  return components.sort();
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
