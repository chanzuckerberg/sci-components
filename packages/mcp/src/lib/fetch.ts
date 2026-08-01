import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ComponentDocsIndex, ComponentList, TailwindTokens } from "./types.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Locates a file under `data/`. The server runs both from source via tsx and
 * from the bundle in `dist/`, which sit at different depths, and may also be
 * started from the package root.
 */
function resolveDataPath(relativePath: string): string | null {
  const candidates = [
    path.join(dirname, "../../data", relativePath), // From src/lib in dev
    path.join(dirname, "../data", relativePath), // From dist in prod
    path.join(process.cwd(), "data", relativePath), // From current working directory
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function readDataFile(relativePath: string, missingHint: string): string {
  const dataPath = resolveDataPath(relativePath);

  if (!dataPath) {
    throw new Error(
      `${relativePath} not found in any expected location. ${missingHint}`
    );
  }

  return fs.readFileSync(dataPath, "utf-8");
}

/**
 * Gets all component names from both packages
 */
export async function getAllComponentNames(): Promise<ComponentList> {
  try {
    return JSON.parse(
      readDataFile(
        "component-list.json",
        "Please run 'yarn generate:components-list' first."
      )
    );
  } catch (error) {
    throw new Error(
      `Failed to load component list: ${
        error instanceof Error ? error.message : `Unknown error ${error}`
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
    const propsPath = resolveDataPath(`component-props/${component}.json`);

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

    return JSON.parse(fs.readFileSync(propsPath, "utf-8"));
  } catch (error) {
    throw new Error(
      `Failed to load props for ${component}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Gets the index of components that have generated documentation
 */
export async function getComponentDocsIndex(): Promise<ComponentDocsIndex> {
  try {
    return JSON.parse(
      readDataFile(
        "component-docs/index.json",
        "Please run 'yarn generate:component-docs' first."
      )
    );
  } catch (error) {
    throw new Error(
      `Failed to load component docs index: ${
        error instanceof Error ? error.message : `Unknown error ${error}`
      }`
    );
  }
}

/**
 * Fetches the generated documentation markdown for a specific component
 */
export async function fetchComponentDocs(file: string): Promise<string> {
  try {
    return readDataFile(
      `component-docs/${file}`,
      "Please run 'yarn generate:component-docs' first."
    );
  } catch (error) {
    throw new Error(
      `Failed to load documentation from ${file}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Gets all component names from both packages
 */
export async function fetchTailwindTokens(): Promise<TailwindTokens> {
  try {
    return JSON.parse(
      readDataFile(
        "tailwind.json",
        "Please run 'yarn generate:tailwind-tokens' first."
      )
    );
  } catch (error) {
    throw new Error(
      `Failed to load tailwind tokens: ${
        error instanceof Error ? error.message : `Unknown error ${error}`
      }`
    );
  }
}
