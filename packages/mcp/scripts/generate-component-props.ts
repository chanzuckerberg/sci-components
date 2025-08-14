import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  withDefaultConfig,
  ParserOptions,
  PropItem,
} from "react-docgen-typescript";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface SimplifiedProp {
  defaultValue?: string | number | boolean | null;
  type: string;
  isRequired: boolean;
  description?: string;
}

interface ComponentProps {
  props: Record<string, SimplifiedProp>;
}

// Configure the parser with options optimized for SDS components
const parserOptions: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  // Filter out HTML props and internal React props
  propFilter: (prop: PropItem) => {
    // Skip HTML attributes unless they're explicitly defined
    if (prop.parent?.fileName.includes("node_modules/@types/react")) {
      // Keep only essential React props
      return [
        "children",
        "className",
        "style",
        "onClick",
        "onChange",
        "disabled",
        "id",
        "name",
        "value",
      ].includes(prop.name);
    }

    // Skip internal props
    if (
      prop.name.startsWith("$$") ||
      prop.name === "key" ||
      prop.name === "ref"
    ) {
      return false;
    }

    // Keep all SDS props
    if (prop.name.startsWith("sds")) {
      return true;
    }

    // Keep props defined in the component file
    if (prop.parent?.fileName.includes("/src/core/")) {
      return true;
    }

    // Keep commonly used props
    const commonProps = [
      "children",
      "className",
      "style",
      "onClick",
      "onChange",
      "onClose",
      "disabled",
      "id",
      "name",
      "value",
      "placeholder",
      "label",
      "icon",
      "title",
      "href",
      "target",
      "isAllCaps",
      "isRounded",
      "open",
      "variant",
      "color",
      "size",
      "fullWidth",
      "loading",
    ];

    return commonProps.includes(prop.name);
  },
  componentNameResolver: (exp, source) => {
    // Try to get the component name from the file path
    const match = source.fileName.match(/\/([^/]+)\/index\.tsx$/);
    if (match) {
      return match[1];
    }
    return exp.getName() === "default"
      ? path.basename(path.dirname(source.fileName))
      : exp.getName();
  },
};

// Use the default parser which reads tsconfig.json automatically
const parser = withDefaultConfig(parserOptions);

function simplifyType(type: string): string {
  // Clean up the type string
  type = type.replace(/\s+/g, " ").trim();

  // Simplify common React types
  if (type.includes("ReactNode") || type.includes("React.ReactNode")) {
    return "ReactNode";
  }
  if (type.includes("ReactElement") || type.includes("React.ReactElement")) {
    return "ReactElement";
  }
  if (type.includes("MouseEvent") || type.includes("React.MouseEvent")) {
    return "function";
  }
  if (type.includes("ChangeEvent") || type.includes("React.ChangeEvent")) {
    return "function";
  }

  // Extract union types
  const unionMatch = type.match(/"([^"]+)"/g);
  if (unionMatch && unionMatch.length > 1 && unionMatch.length < 10) {
    return unionMatch.join(" | ");
  }

  // Simplify complex generic types
  if (type.includes("<") && type.length > 100) {
    const baseType = type.substring(0, type.indexOf("<"));
    return baseType || "complex";
  }

  // Truncate very long types
  if (type.length > 150) {
    return "complex";
  }

  return type;
}

function parseDefaultValue(value: string): string | number | boolean | null {
  // Try to parse as JSON first
  try {
    return JSON.parse(value);
  } catch {
    // If not JSON, use as string but clean it up
    const cleanValue = value.replace(/['"]/g, "");
    if (cleanValue === "true") return true;
    if (cleanValue === "false") return false;
    if (!isNaN(Number(cleanValue))) return Number(cleanValue);
    return cleanValue;
  }
}

function extractEnumValues(typeValue: PropItem["type"]): string {
  if (typeValue.name !== "enum" || !typeValue.value) {
    return typeValue.raw || typeValue.name;
  }

  const values = typeValue.value
    .map((v: { value?: unknown } | string | number) => {
      if (typeof v === "object" && v !== null && v.value) {
        const val = String(v.value);
        if (val.startsWith('"') && val.endsWith('"')) {
          return val.slice(1, -1);
        }
        return val;
      }
      return v;
    })
    .filter(
      (v: unknown): v is string | number =>
        v !== undefined && v !== "" && v !== "|"
    );

  if (values.length > 0) {
    return values.map((v: string | number) => `"${v}"`).join(" | ");
  }

  return typeValue.raw || typeValue.name;
}

function addSDSPropDescriptions(props: Record<string, SimplifiedProp>): void {
  if (props.sdsStyle && !props.sdsStyle.description) {
    props.sdsStyle.description = "The visual style variant of the component";
  }
  if (props.sdsType && !props.sdsType.description) {
    props.sdsType.description = "The type/variant of the component";
  }
  if (props.sdsSize && !props.sdsSize.description) {
    props.sdsSize.description = "The size of the component";
  }
}

function extractPropsFromComponent(
  componentPath: string,
  componentName: string
): ComponentProps | null {
  try {
    console.log(`  🔍 Parsing ${componentName}...`);

    const docs = parser.parse(componentPath);
    if (docs.length === 0) {
      console.log(`    ⚠️  No documentation found`);
      return null;
    }

    const componentDoc = docs[0];
    const props: Record<string, SimplifiedProp> = {};

    for (const [propName, propInfo] of Object.entries(componentDoc.props)) {
      const defaultValue = propInfo.defaultValue?.value
        ? parseDefaultValue(propInfo.defaultValue.value)
        : undefined;

      const typeValue = extractEnumValues(propInfo.type);

      props[propName] = {
        type: simplifyType(typeValue),
        isRequired: propInfo.required,
        description: propInfo.description || undefined,
        defaultValue,
      };
    }

    addSDSPropDescriptions(props);
    console.log(`    ✅ Found ${Object.keys(props).length} props`);

    return { props };
  } catch (error) {
    console.log(
      `    ❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}

interface ProcessResult {
  successCount: number;
  failCount: number;
  propsCount: Record<string, number>;
}

function processComponent(
  componentName: string,
  componentPath: string,
  outputDir: string
): { success: boolean; propCount?: number } {
  if (!fs.existsSync(componentPath)) {
    console.log(`❌ ${componentName} - File not found`);
    return { success: false };
  }

  const props = extractPropsFromComponent(componentPath, componentName);

  if (props && Object.keys(props.props).length > 0) {
    const outputPath = path.join(outputDir, `${componentName}.json`);
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
): ProcessResult {
  console.log(`📦 Processing ${packageName}...\n`);

  let successCount = 0;
  let failCount = 0;
  const propsCount: Record<string, number> = {};

  for (const componentName of components) {
    const componentPath = path.join(
      dirname,
      corePath,
      componentName,
      "index.tsx"
    );
    const result = processComponent(componentName, componentPath, outputDir);

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
  console.log("📊 SUMMARY");
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

function generatePropsWithDocgen() {
  console.log("🚀 Generating component props using react-docgen-typescript\n");

  const componentListPath = path.join(dirname, "../data/component-list.json");
  if (!fs.existsSync(componentListPath)) {
    console.error(
      "Component list not found. Please run 'yarn generate:components-list' first."
    );
    return;
  }

  const componentList = JSON.parse(fs.readFileSync(componentListPath, "utf-8"));
  const outputDir = path.join(dirname, "../data/component-props");

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
generatePropsWithDocgen();
