/* eslint-disable sonarjs/cognitive-complexity */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface ArgType {
  control?: {
    type?: string;
    labels?: Record<string, string>;
  };
  options?: (string | number)[] | string;
  mapping?: Record<string, unknown>;
  if?: Record<string, unknown>;
  action?: string;
  description?: string;
  defaultValue?: unknown;
  type?: {
    name?: string;
    required?: boolean;
  };
}

interface StorybookMeta {
  argTypes?: Record<string, ArgType>;
  args?: Record<string, unknown>;
}

interface SimplifiedProp {
  type: string;
  isRequired: boolean;
  description?: string;
  defaultValue?: unknown;
  options?: (string | number)[];
  control?: string;
}

interface ComponentProps {
  props: Record<string, SimplifiedProp>;
}

function extractConstantsFromFile(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const code = fs.readFileSync(filePath, "utf-8");

    // Extract all export const declarations
    const constPattern = /export\s+const\s+(\w+)\s*=\s*([^;]+);/g;
    const constants: Record<string, unknown> = {};

    let match;
    while ((match = constPattern.exec(code)) !== null) {
      const [, name, value] = match;
      try {
        // Try to parse simple arrays and strings
        if (value.trim().startsWith("[") && value.trim().endsWith("]")) {
          // Extract array values - handle multiline arrays
          const arrayContent = value.trim().slice(1, -1);
          const items = arrayContent.match(/"[^"]+"|'[^']+'|\d+/g) || [];
          constants[name] = items.map((item) =>
            item.replace(/^["']|["']$/g, "")
          );
        } else if (value.startsWith('"') || value.startsWith("'")) {
          constants[name] = value.slice(1, -1);
        } else if (value === "true" || value === "false") {
          constants[name] = value === "true";
        } else if (!isNaN(Number(value))) {
          constants[name] = Number(value);
        }
      } catch (e) {
        // Skip complex values
      }
    }

    return constants;
  } catch (error) {
    console.log(`    ⚠️  Could not extract constants: ${error}`);
    return {};
  }
}

function parseStorybookFile(filePath: string): StorybookMeta | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const code = fs.readFileSync(filePath, "utf-8");

    // Extract the default export
    const defaultExportMatch = code.match(
      /export\s+default\s+({[\s\S]*?}\s+as\s+Meta|{[\s\S]*?})\s*;/
    );

    if (!defaultExportMatch) {
      return null;
    }

    const exportContent = defaultExportMatch[1].replace(/\s+as\s+Meta.*$/, "");

    // Extract argTypes
    const argTypesMatch = exportContent.match(
      /argTypes:\s*{([\s\S]*?)^ {2}},/m
    );
    const argTypes: Record<string, ArgType> = {};

    if (argTypesMatch) {
      const argTypesContent = argTypesMatch[1];

      // Parse each argType - Updated regex to better handle nested objects
      const propPattern = /(\w+):\s*{((?:[^{}]|{[^}]*})*?)},/gs;
      let propMatch;

      while ((propMatch = propPattern.exec(argTypesContent)) !== null) {
        const [, propName, propContent] = propMatch;
        const argType: ArgType = {};

        // Extract control type
        const controlMatch = propContent.match(
          /control:\s*{[^}]*type:\s*["'](\w+)["']/
        );
        if (controlMatch) {
          argType.control = { type: controlMatch[1] };
        }

        // Extract options
        const optionsMatch = propContent.match(
          /options:\s*(\[[^\]]+\]|[\w.()]+)/
        );
        if (optionsMatch) {
          const optionsValue = optionsMatch[1];
          if (optionsValue.startsWith("[")) {
            // Direct array
            try {
              const items =
                optionsValue.slice(1, -1).match(/"[^"]+"|'[^']+'|\w+/g) || [];
              argType.options = items.map((item) => {
                const cleaned = item.replace(/^["']|["']$/g, "");
                return isNaN(Number(cleaned)) ? cleaned : Number(cleaned);
              });
            } catch {
              // Keep as is if parsing fails
            }
          } else if (optionsValue.includes("Object.keys")) {
            // Object.keys(CONSTANT) pattern - mark for later resolution
            const keyMatch = optionsValue.match(/Object\.keys\((\w+)\)/);
            if (keyMatch) {
              argType.options = `Object.keys(${keyMatch[1]})`;
            }
          } else {
            // Reference to constant - we'll resolve this later
            argType.options = optionsValue;
          }
        }

        // Extract action
        const actionMatch = propContent.match(/action:\s*["'](\w+)["']/);
        if (actionMatch) {
          argType.action = actionMatch[1];
        }

        argTypes[propName] = argType;
      }
    }

    // Extract default args
    const argsMatch = exportContent.match(/args:\s*{([^}]*)}/);
    const args: Record<string, unknown> = {};

    if (argsMatch) {
      const argsContent = argsMatch[1];
      const argPattern = /(\w+):\s*([^,\n]+)/g;
      let argMatch;

      while ((argMatch = argPattern.exec(argsContent)) !== null) {
        const [, key, value] = argMatch;
        const cleanValue = value.trim();

        if (cleanValue === "true" || cleanValue === "false") {
          args[key] = cleanValue === "true";
        } else if (cleanValue.startsWith('"') || cleanValue.startsWith("'")) {
          args[key] = cleanValue.slice(1, -1);
        } else if (!isNaN(Number(cleanValue))) {
          args[key] = Number(cleanValue);
        } else {
          args[key] = cleanValue;
        }
      }
    }

    return { argTypes, args };
  } catch (error) {
    console.log(`    ❌ Error parsing storybook file: ${error}`);
    return null;
  }
}

function resolveConstantReferences(
  argTypes: Record<string, ArgType>,
  constants: Record<string, unknown>
): void {
  for (const [, argType] of Object.entries(argTypes)) {
    // Resolve options that are references to constants
    if (typeof argType.options === "string") {
      // Handle Object.keys(CONSTANT) pattern
      if (argType.options.startsWith("Object.keys(")) {
        const constantName = argType.options.match(
          /Object\.keys\((\w+)\)/
        )?.[1];
        if (constantName && constants[constantName]) {
          const constantValue = constants[constantName];
          if (typeof constantValue === "object" && constantValue !== null) {
            argType.options = Object.keys(constantValue);
          }
        }
      } else if (constants[argType.options]) {
        // Direct constant reference
        argType.options = constants[argType.options] as (string | number)[];
      }
    }

    // If options come from Object.keys(mapping), extract the keys
    if (argType.mapping && !argType.options) {
      argType.options = Object.keys(argType.mapping);
    }
  }
}

function inferTypeFromArgType(argType: ArgType): string {
  // Check control type
  if (argType.control?.type) {
    switch (argType.control.type) {
      case "boolean":
        return "boolean";
      case "text":
        return "string";
      case "number":
        return "number";
      case "select":
      case "radio":
        if (
          argType.options &&
          Array.isArray(argType.options) &&
          argType.options.length > 0
        ) {
          return argType.options.map((opt) => `"${opt}"`).join(" | ");
        }
        return "string";
      case "object":
        return "object";
      case "array":
        return "array";
    }
  }

  // Check if it's an action
  if (argType.action) {
    return "function";
  }

  // Check options
  if (
    argType.options &&
    Array.isArray(argType.options) &&
    argType.options.length > 0
  ) {
    const sample = argType.options[0];
    if (typeof sample === "number") {
      return argType.options.join(" | ");
    }
    return argType.options.map((opt) => `"${opt}"`).join(" | ");
  }

  // Default
  return "unknown";
}

function extractPropsFromStorybook(
  componentName: string,
  storybookPath: string,
  constantsPath?: string
): ComponentProps | null {
  console.log(`  🔍 Parsing ${componentName} Storybook...`);

  const meta = parseStorybookFile(storybookPath);
  if (!meta || !meta.argTypes) {
    console.log(`    ⚠️  No argTypes found`);
    return null;
  }

  // Load constants if available
  const constants = constantsPath
    ? extractConstantsFromFile(constantsPath)
    : {};

  // Resolve constant references
  resolveConstantReferences(meta.argTypes, constants);

  const props: Record<string, SimplifiedProp> = {};

  for (const [propName, argType] of Object.entries(meta.argTypes)) {
    const prop: SimplifiedProp = {
      type: inferTypeFromArgType(argType),
      isRequired: argType.type?.required || false,
      description: argType.description,
    };

    // Add default value from args
    if (meta.args && meta.args[propName] !== undefined) {
      prop.defaultValue = meta.args[propName];
    }

    // Add options if available
    if (
      argType.options &&
      Array.isArray(argType.options) &&
      argType.options.length > 0
    ) {
      prop.options = argType.options;

      // Also update the type to be a union of the options
      if (prop.options.length > 0) {
        const sample = prop.options[0];
        if (typeof sample === "number") {
          prop.type = prop.options.join(" | ");
        } else {
          prop.type = prop.options
            .map((opt: string | number) => `"${opt}"`)
            .join(" | ");
        }
      }
    }

    // Add control type
    if (argType.control?.type) {
      prop.control = argType.control.type;
    }

    props[propName] = prop;
  }

  // Add common props that might not be in argTypes but are standard
  const commonProps = ["className", "style", "children", "id"];
  for (const propName of commonProps) {
    if (!props[propName]) {
      props[propName] = {
        type:
          propName === "children"
            ? "ReactNode"
            : propName === "style"
              ? "CSSProperties"
              : "string",
        isRequired: false,
        description: `Standard React ${propName} prop`,
      };
    }
  }

  console.log(`    ✅ Found ${Object.keys(props).length} props`);
  return { props };
}

function processComponent(
  componentName: string,
  storybookDir: string,
  outputDir: string
): { success: boolean; propCount?: number } {
  const storybookPath = path.join(storybookDir, "index.stories.tsx");
  const constantsPath = path.join(storybookDir, "constants.tsx");

  if (!fs.existsSync(storybookPath)) {
    console.log(`❌ ${componentName} - Storybook file not found`);
    return { success: false };
  }

  const props = extractPropsFromStorybook(
    componentName,
    storybookPath,
    constantsPath
  );

  if (props && Object.keys(props.props).length > 0) {
    const outputPath = path.join(outputDir, `${componentName}-storybook.json`);
    const output = { [componentName]: props };
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    return { success: true, propCount: Object.keys(props.props).length };
  }

  console.log(`⚠️  ${componentName} - No props extracted`);
  return { success: false };
}

function processPackageComponents(
  packageName: string,
  components: string[],
  corePath: string,
  outputDir: string
): {
  successCount: number;
  failCount: number;
  propsCount: Record<string, number>;
} {
  console.log(`📦 Processing ${packageName} Storybook files...\n`);

  let successCount = 0;
  let failCount = 0;
  const propsCount: Record<string, number> = {};

  for (const componentName of components) {
    const storybookDir = path.join(
      dirname,
      corePath,
      componentName,
      "__storybook__"
    );
    const result = processComponent(componentName, storybookDir, outputDir);

    if (result.success) {
      successCount++;
      if (result.propCount) {
        propsCount[componentName] = result.propCount;
      }
    } else {
      failCount++;
    }
  }

  return { successCount, failCount, propsCount };
}

function printSummary(
  successCount: number,
  failCount: number,
  propsCount: Record<string, number>,
  outputDir: string
): void {
  console.log("\n" + "=".repeat(50));
  console.log("📊 STORYBOOK PROPS EXTRACTION SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Successfully processed: ${successCount} components`);
  console.log(`⚠️  Failed: ${failCount} components`);
  console.log(`📂 Output directory: ${outputDir}`);

  if (Object.keys(propsCount).length > 0) {
    console.log("\n📈 Top components by prop count:");
    const sorted = Object.entries(propsCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    for (const [name, count] of sorted) {
      console.log(`   ${name}: ${count} props`);
    }
  }
}

function generatePropsFromStorybook() {
  console.log("🚀 Generating component props from Storybook files\n");

  const componentListPath = path.join(dirname, "../data/component-list.json");
  if (!fs.existsSync(componentListPath)) {
    console.error(
      "Component list not found. Please run 'yarn generate:components-list' first."
    );
    return;
  }

  const componentList = JSON.parse(fs.readFileSync(componentListPath, "utf-8"));
  const outputDir = path.join(dirname, "../data/component-props-storybook");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process @czi-sds/components
  const componentsResult = processPackageComponents(
    "@czi-sds/components",
    componentList.components,
    "../../components/src/core",
    outputDir
  );

  // Process @czi-sds/data-viz
  console.log("\n");
  const dataVizResult = processPackageComponents(
    "@czi-sds/data-viz",
    componentList["data-viz"],
    "../../data-viz/src/core",
    outputDir
  );

  // Combine results
  const totalSuccess =
    componentsResult.successCount + dataVizResult.successCount;
  const totalFail = componentsResult.failCount + dataVizResult.failCount;
  const allPropsCount = {
    ...componentsResult.propsCount,
    ...dataVizResult.propsCount,
  };

  printSummary(totalSuccess, totalFail, allPropsCount, outputDir);
}

// Run the script
generatePropsFromStorybook();
