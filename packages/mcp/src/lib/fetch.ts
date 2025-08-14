import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface ComponentList {
  components: string[];
  "data-viz": string[];
}

/**
 * Gets all component names from both packages
 */
export async function getAllComponentNames(): Promise<ComponentList> {
  try {
    const dataPath = path.join(dirname, "../data/component-list.json");

    if (!fs.existsSync(dataPath)) {
      throw new Error(
        "Component list not found. Please run 'yarn generate:components-list' first."
      );
    }

    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const componentList: ComponentList = JSON.parse(fileContent);

    return componentList;
  } catch (error) {
    throw new Error(
      `Failed to load component list: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
