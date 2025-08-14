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
  defaultValue?: any;
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
  shouldRemoveUndefinedFromOptional: true,
  shouldExtractValuesFromUnion: true,
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

function extractPropsFromComponent(
  componentPath: string,
  componentName: string
): ComponentProps | null {
  try {
    console.log(`  🔍 Parsing ${componentName}...`);

    // Parse the component file
    const docs = parser.parse(componentPath);

    if (docs.length === 0) {
      console.log(`    ⚠️  No documentation found`);
      return null;
    }

    // Use the first component found (usually the default export)
    const componentDoc = docs[0];
    const props: Record<string, SimplifiedProp> = {};

    // Process each prop
    for (const [propName, propInfo] of Object.entries(componentDoc.props)) {
      // Parse default value
      let defaultValue: any = undefined;
      if (propInfo.defaultValue?.value) {
        const value = propInfo.defaultValue.value;
        // Try to parse as JSON first
        try {
          defaultValue = JSON.parse(value);
        } catch {
          // If not JSON, use as string but clean it up
          defaultValue = value.replace(/['"]/g, "");
          if (defaultValue === "true") defaultValue = true;
          else if (defaultValue === "false") defaultValue = false;
          else if (!isNaN(Number(defaultValue)))
            defaultValue = Number(defaultValue);
        }
      }

      // Extract the actual type values for enums/unions
      let typeValue = propInfo.type.name;

      // If it's a union type, try to get the actual values
      if (propInfo.type.name === "enum" && propInfo.type.value) {
        // The type.value array contains the actual union values
        const values = propInfo.type.value
          .map((v: any) => {
            // Extract the value, handling different structures
            if (typeof v === "object" && v !== null && v.value) {
              // Remove surrounding quotes if they exist
              const val = v.value.toString();
              if (val.startsWith('"') && val.endsWith('"')) {
                return val.slice(1, -1);
              }
              return val;
            }
            return v;
          })
          .filter((v: any) => v !== undefined && v !== "" && v !== "|");

        if (values.length > 0) {
          // Format as TypeScript union type
          typeValue = values.map((v: any) => `"${v}"`).join(" | ");
        }
      } else if (propInfo.type.raw) {
        // Sometimes the raw type string is more accurate
        typeValue = propInfo.type.raw;
      }

      props[propName] = {
        type: simplifyType(typeValue),
        isRequired: propInfo.required,
        description: propInfo.description || undefined,
        defaultValue,
      };
    }

    // Add common SDS prop descriptions if missing
    if (props.sdsStyle && !props.sdsStyle.description) {
      props.sdsStyle.description = "The visual style variant of the component";
    }
    if (props.sdsType && !props.sdsType.description) {
      props.sdsType.description = "The type/variant of the component";
    }
    if (props.sdsSize && !props.sdsSize.description) {
      props.sdsSize.description = "The size of the component";
    }

    console.log(`    ✅ Found ${Object.keys(props).length} props`);

    return { props };
  } catch (error) {
    console.log(
      `    ❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}

function generatePropsWithDocgen() {
  console.log("🚀 Generating component props using react-docgen-typescript\n");

  // Read component list
  const componentListPath = path.join(dirname, "../data/component-list.json");
  if (!fs.existsSync(componentListPath)) {
    console.error(
      "Component list not found. Please run 'yarn generate:components-list' first."
    );
    return;
  }

  const componentList = JSON.parse(fs.readFileSync(componentListPath, "utf-8"));
  const outputDir = path.join(dirname, "../data/component-props");

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;
  const propsCount: Record<string, number> = {};

  // Process components from @czi-sds/components
  console.log("📦 Processing @czi-sds/components...\n");

  for (const componentName of componentList.components) {
    const componentPath = path.join(
      dirname,
      "../../components/src/core",
      componentName,
      "index.tsx"
    );

    if (!fs.existsSync(componentPath)) {
      console.log(`❌ ${componentName} - File not found`);
      failCount++;
      continue;
    }

    const props = extractPropsFromComponent(componentPath, componentName);

    if (props && Object.keys(props.props).length > 0) {
      const outputPath = path.join(outputDir, `${componentName}.json`);
      const output = {
        [componentName]: props,
      };

      fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
      propsCount[componentName] = Object.keys(props.props).length;
      successCount++;
    } else {
      console.log(`⚠️  ${componentName} - No props extracted`);
      failCount++;
    }
  }

  // Process components from @czi-sds/data-viz
  console.log("\n📦 Processing @czi-sds/data-viz...\n");

  for (const componentName of componentList["data-viz"]) {
    const componentPath = path.join(
      dirname,
      "../../data-viz/src/core",
      componentName,
      "index.tsx"
    );

    if (!fs.existsSync(componentPath)) {
      console.log(`❌ ${componentName} - File not found`);
      failCount++;
      continue;
    }

    const props = extractPropsFromComponent(componentPath, componentName);

    if (props && Object.keys(props.props).length > 0) {
      const outputPath = path.join(outputDir, `${componentName}.json`);
      const output = {
        [componentName]: props,
      };

      fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
      propsCount[componentName] = Object.keys(props.props).length;
      successCount++;
    } else {
      console.log(`⚠️  ${componentName} - No props extracted`);
      failCount++;
    }
  }

  // Print summary
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

// Run the script
generatePropsWithDocgen();
