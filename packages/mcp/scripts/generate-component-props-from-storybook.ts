/* eslint-disable sonarjs/cognitive-complexity */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface ArgType {
  control?: {
    type?: string;
  };
  options?: (string | number)[] | string;
  mapping?: Record<string, unknown>;
  action?: string;
  description?: string;
  required?: boolean;
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
        const trimmedValue = value.trim();
        if (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) {
          // Extract array values
          const arrayContent = trimmedValue.slice(1, -1);
          const items = arrayContent.match(/"[^"]+"|'[^']+'|\d+/g) || [];
          constants[name] = items.map((item) =>
            item.replace(/^["']|["']$/g, "")
          );
        } else if (
          trimmedValue.startsWith('"') ||
          trimmedValue.startsWith("'")
        ) {
          constants[name] = trimmedValue.slice(1, -1);
        } else if (trimmedValue === "true" || trimmedValue === "false") {
          constants[name] = trimmedValue === "true";
        } else if (!isNaN(Number(trimmedValue))) {
          constants[name] = Number(trimmedValue);
        }
      } catch {
        // Skip complex values
      }
    }

    return constants;
  } catch (error) {
    console.log(`    ⚠️  Could not extract constants: ${error}`);
    return {};
  }
}

function extractOptions(
  propContent: string
): string | (string | number)[] | undefined {
  const optionsMatch = propContent.match(/options:\s*(\[[^\]]+\]|[\w.()]+)/);
  if (!optionsMatch) {
    return undefined;
  }

  const optionsValue = optionsMatch[1];
  if (optionsValue.startsWith("[")) {
    // Direct array
    try {
      const items =
        optionsValue.slice(1, -1).match(/"[^"]+"|'[^']+'|\w+/g) || [];
      return items.map((item) => {
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
      return `Object.keys(${keyMatch[1]})`;
    }
  } else {
    // Reference to constant - we'll resolve this later
    return optionsValue;
  }
  return undefined;
}

function parseArgType(propContent: string): ArgType {
  const argType: ArgType = {};

  // Extract control type
  const controlMatch = propContent.match(
    /control:\s*{[^}]*type:\s*["'](\w+)["']/
  );
  if (controlMatch) {
    argType.control = { type: controlMatch[1] };
  }

  // Extract required
  const requiredMatch = propContent.match(/required:\s*(true|false)/);
  if (requiredMatch) {
    argType.required = requiredMatch[1] === "true";
  }

  // Extract options
  const options = extractOptions(propContent);
  if (options !== undefined) {
    argType.options = options;
  }

  // Extract action
  const actionMatch = propContent.match(/action:\s*(\w+\.\w+|\w+)/);
  if (actionMatch) {
    argType.action = actionMatch[1];
  }

  // Extract description
  const descMatch = propContent.match(/description:\s*["']([^"']+)["']/);
  if (descMatch) {
    argType.description = descMatch[1];
  }

  return argType;
}

function parseArgTypes(argTypesContent: string): Record<string, ArgType> {
  const argTypes: Record<string, ArgType> = {};

  // Parse each argType - handle nested objects
  const propPattern = /(\w+):\s*{((?:[^{}]|{[^}]*})*?)},/gs;
  let propMatch;

  while ((propMatch = propPattern.exec(argTypesContent)) !== null) {
    const [, propName, propContent] = propMatch;
    argTypes[propName] = parseArgType(propContent);
  }

  return argTypes;
}

function parseArgs(argsContent: string): Record<string, unknown> {
  const args: Record<string, unknown> = {};
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

  return args;
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

    const argTypes = argTypesMatch ? parseArgTypes(argTypesMatch[1]) : {};

    // Extract default args
    const argsMatch = exportContent.match(/args:\s*{([^}]*)}/);
    const args = argsMatch ? parseArgs(argsMatch[1]) : {};

    return { argTypes, args };
  } catch (error) {
    console.log(`    ❌ Error parsing storybook file: ${error}`);
    return null;
  }
}

function resolveOptions(
  options: string | (string | number)[],
  constants: Record<string, unknown>
): (string | number)[] | string {
  if (typeof options !== "string") {
    return options;
  }

  // Handle Object.keys(CONSTANT) pattern
  if (options.startsWith("Object.keys(")) {
    const constantName = options.match(/Object\.keys\((\w+)\)/)?.[1];
    if (constantName && constants[constantName]) {
      const constantValue = constants[constantName];
      if (typeof constantValue === "object" && constantValue !== null) {
        return Object.keys(constantValue);
      }
    }
  } else if (constants[options]) {
    // Direct constant reference
    return constants[options] as (string | number)[];
  }

  return options;
}

function resolveConstantReferences(
  argTypes: Record<string, ArgType>,
  constants: Record<string, unknown>
): void {
  for (const argType of Object.values(argTypes)) {
    // Resolve options that are references to constants
    if (argType.options) {
      const resolved = resolveOptions(argType.options, constants);
      if (resolved !== argType.options) {
        argType.options = resolved;
      }
    }

    // If options come from Object.keys(mapping), extract the keys
    if (argType.mapping && !argType.options) {
      argType.options = Object.keys(argType.mapping);
    }
  }
}

function getTypeFromControl(
  controlType: string,
  options?: (string | number)[]
): string {
  switch (controlType) {
    case "boolean":
      return "boolean";
    case "text":
      return "string";
    case "number":
      return "number";
    case "select":
    case "radio":
      if (options && Array.isArray(options) && options.length > 0) {
        return options.map((opt) => `"${opt}"`).join(" | ");
      }
      return "string";
    case "object":
      return "object";
    case "array":
      return "array";
    default:
      return "unknown";
  }
}

function inferTypeFromArgType(argType: ArgType): string {
  // Check control type
  if (argType.control?.type) {
    return getTypeFromControl(
      argType.control.type,
      argType.options as (string | number)[]
    );
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

function createProp(argType: ArgType, defaultValue?: unknown): SimplifiedProp {
  const prop: SimplifiedProp = {
    type: inferTypeFromArgType(argType),
    isRequired: argType.required || false,
    description: argType.description,
  };

  // Add default value from args
  if (defaultValue !== undefined) {
    prop.defaultValue = defaultValue;
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

  return prop;
}

function addCommonProps(props: Record<string, SimplifiedProp>): void {
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
    props[propName] = createProp(argType, meta.args?.[propName]);
  }

  // Add common props that might not be in argTypes but are standard
  addCommonProps(props);

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
