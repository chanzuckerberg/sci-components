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
    // Try multiple paths to support both dev (tsx) and prod (built) environments
    const possiblePaths = [
      path.join(dirname, "../../data/component-list.json"), // From src/lib in dev
      path.join(dirname, "../data/component-list.json"), // From dist in prod
      path.join(process.cwd(), "data/component-list.json"), // From current working directory
    ];

    let dataPath = "";
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        dataPath = p;
        break;
      }
    }

    if (!dataPath) {
      throw new Error(
        "Component list not found in any expected location. Please run 'yarn generate:components-list' first."
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

/**
 * Gets regular component names (from @czi-sds/components package only)
 */
export async function getRegularComponentNames(): Promise<string[]> {
  const componentList = await getAllComponentNames();
  return componentList.components;
}

/**
 * Fetches the properties/props for a specific component
 */
interface ComponentPropsResult {
  [component: string]: {
    message?: string;
    props: Record<string, unknown>;
  };
}

export async function fetchComponentProps(
  component: string
): Promise<ComponentPropsResult> {
  try {
    // Try multiple paths for component props
    const propsPaths = [
      path.join(dirname, `../../data/component-props/${component}.json`), // From src/lib in dev
      path.join(dirname, `../data/component-props/${component}.json`), // From dist in prod
      path.join(process.cwd(), `data/component-props/${component}.json`), // From current working directory
    ];

    let propsPath = "";
    for (const p of propsPaths) {
      if (fs.existsSync(p)) {
        propsPath = p;
        break;
      }
    }

    if (!propsPath) {
      // Return a message if props file doesn't exist
      return {
        [component]: {
          message:
            "Props information not available for this component. Run 'yarn generate:component-props' to generate props data.",
          props: {},
        },
      };
    }

    const fileContent = fs.readFileSync(propsPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(
      `Failed to load props for ${component}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
