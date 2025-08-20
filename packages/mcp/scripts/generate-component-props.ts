/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  withDefaultConfig,
  ParserOptions,
  PropItem,
} from "react-docgen-typescript";
import * as ts from "typescript";

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

interface MultiComponentProps {
  [componentName: string]: ComponentProps;
}

// Configure the parser to extract ALL props without filtering
const parserOptions: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  // Don't filter any props - we'll filter later based on argTypes
  propFilter: () => true,
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

/**
 * Extract exported subcomponents from a component file
 */
function extractExportedSubcomponents(componentPath: string): string[] {
  try {
    const fileContent = fs.readFileSync(componentPath, "utf-8");
    const sourceFile = ts.createSourceFile(
      componentPath,
      fileContent,
      ts.ScriptTarget.Latest,
      true
    );

    const exportedComponents: string[] = [];

    const visit = (node: ts.Node) => {
      // Look for export { ComponentA, ComponentB } statements
      if (
        ts.isExportDeclaration(node) &&
        node.exportClause &&
        ts.isNamedExports(node.exportClause)
      ) {
        node.exportClause.elements.forEach((element) => {
          if (ts.isExportSpecifier(element) && ts.isIdentifier(element.name)) {
            exportedComponents.push(element.name.text);
          }
        });
      }
    };

    ts.forEachChild(sourceFile, visit);
    return exportedComponents;
  } catch (error) {
    console.log(
      `    ⚠️  Could not extract subcomponents: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return [];
  }
}

/**
 * Extract argTypes from a Storybook file
 * Returns the list of prop names defined in argTypes
 */
function extractArgTypesFromStorybook(storybookPath: string): string[] | null {
  try {
    if (!fs.existsSync(storybookPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(storybookPath, "utf-8");

    // Use TypeScript compiler to parse the file
    const sourceFile = ts.createSourceFile(
      storybookPath,
      fileContent,
      ts.ScriptTarget.Latest,
      true
    );

    const argTypeProps: string[] = [];

    // Function to traverse the AST
    const visit = (node: ts.Node): void => {
      // Look for export default statements
      if (ts.isExportAssignment(node)) {
        let expression = node.expression;

        // Handle "as Meta" type assertion
        if (ts.isAsExpression(expression)) {
          expression = expression.expression;
        }

        // Check if it's an object literal with argTypes
        if (ts.isObjectLiteralExpression(expression)) {
          expression.properties.forEach((prop) => {
            if (
              ts.isPropertyAssignment(prop) &&
              ts.isIdentifier(prop.name) &&
              prop.name.text === "argTypes" &&
              ts.isObjectLiteralExpression(prop.initializer)
            ) {
              prop.initializer.properties.forEach((argTypeProp) => {
                if (
                  ts.isPropertyAssignment(argTypeProp) &&
                  (ts.isIdentifier(argTypeProp.name) ||
                    ts.isStringLiteral(argTypeProp.name))
                ) {
                  argTypeProps.push(argTypeProp.name.text);
                }
              });
            }
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    return argTypeProps.length > 0 ? argTypeProps : null;
  } catch (error) {
    console.log(
      `    ⚠️  Could not extract argTypes: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}

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

function extractPropsFromComponent(
  componentPath: string,
  componentName: string,
  storybookPath: string
): MultiComponentProps | null {
  try {
    console.log(`  🔍 Parsing ${componentName}...`);

    // First, extract the argTypes from Storybook
    const argTypeProps = extractArgTypesFromStorybook(storybookPath);
    if (!argTypeProps || argTypeProps.length === 0) {
      console.log(`    ⚠️  No argTypes found in Storybook file`);
      return null;
    }
    console.log(
      `    📚 Found ${argTypeProps.length} props in argTypes: ${argTypeProps.join(", ")}`
    );

    // Extract subcomponents
    const subcomponents = extractExportedSubcomponents(componentPath);
    console.log(
      `    📦 Found ${subcomponents.length} exported subcomponents: ${subcomponents.join(", ")}`
    );

    // Parse main component and all subcomponents
    const allComponents: MultiComponentProps = {};

    // Parse main component
    const mainDocs = parser.parse(componentPath);
    const mainComponentDoc = mainDocs.length > 0 ? mainDocs[0] : null;

    // Parse subcomponents
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subcomponentDocs: Record<string, any> = {};
    for (const subComp of subcomponents) {
      const subCompPath = path.join(
        path.dirname(componentPath),
        "components",
        subComp,
        "index.tsx"
      );

      if (fs.existsSync(subCompPath)) {
        const subDocs = parser.parse(subCompPath);
        if (subDocs.length > 0) {
          subcomponentDocs[subComp] = subDocs[0];
        }
      }
    }

    // Now distribute props to their correct components
    const componentPropsMap: Record<string, Record<string, SimplifiedProp>> = {
      [componentName]: {},
    };

    // Initialize subcomponent prop maps
    for (const subComp of subcomponents) {
      componentPropsMap[subComp] = {};
    }

    // For each prop in argTypes, find which component it belongs to
    for (const propName of argTypeProps) {
      let propAssigned = false;

      // First check if it's in the main component
      if (mainComponentDoc && mainComponentDoc.props[propName]) {
        const propInfo = mainComponentDoc.props[propName];
        componentPropsMap[componentName][propName] = {
          type: simplifyType(extractEnumValues(propInfo.type)),
          isRequired: propInfo.required,
          description: propInfo.description || undefined,
          defaultValue: propInfo.defaultValue?.value
            ? parseDefaultValue(propInfo.defaultValue.value)
            : undefined,
        };
        propAssigned = true;
      } else {
        // Check subcomponents
        for (const [subCompName, subCompDoc] of Object.entries(
          subcomponentDocs
        )) {
          if (subCompDoc.props[propName]) {
            const propInfo = subCompDoc.props[propName];
            componentPropsMap[subCompName][propName] = {
              type: simplifyType(extractEnumValues(propInfo.type)),
              isRequired: propInfo.required,
              description: propInfo.description || undefined,
              defaultValue: propInfo.defaultValue?.value
                ? parseDefaultValue(propInfo.defaultValue.value)
                : undefined,
            };
            propAssigned = true;
            break;
          }
        }
      }

      // If not found anywhere, add to main component as 'any'
      if (!propAssigned) {
        componentPropsMap[componentName][propName] = {
          type: "any",
          isRequired: false,
          description: undefined,
        };
      }
    }

    // Build the result object
    for (const [compName, props] of Object.entries(componentPropsMap)) {
      if (Object.keys(props).length > 0) {
        allComponents[compName] = { props };
      }
    }

    const totalProps = Object.values(componentPropsMap).reduce(
      (sum, props) => sum + Object.keys(props).length,
      0
    );
    console.log(
      `    ✅ Extracted ${totalProps} total props across ${Object.keys(allComponents).length} components`
    );

    return allComponents;
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
  storybookPath: string,
  corePath: string,
  outputDir: string
): { success: boolean; propCount?: number } {
  if (!fs.existsSync(componentPath)) {
    console.log(`❌ ${componentName} - Component file not found`);
    return { success: false };
  }

  if (!fs.existsSync(storybookPath)) {
    console.log(`❌ ${componentName} - Storybook file not found`);
    return { success: false };
  }

  const allComponents = extractPropsFromComponent(
    componentPath,
    componentName,
    storybookPath
  );

  if (allComponents && Object.keys(allComponents).length > 0) {
    const outputPath = path.join(outputDir, `${componentName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(allComponents, null, 2));

    // Count total props across all components
    const totalPropCount = Object.values(allComponents).reduce(
      (sum, comp) => sum + Object.keys(comp.props).length,
      0
    );

    return { success: true, propCount: totalPropCount };
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
    const storybookPath = path.join(
      dirname,
      corePath,
      componentName,
      "__storybook__",
      "index.stories.tsx"
    );
    const fullCorePath = path.join(dirname, corePath, componentName);
    const result = processComponent(
      componentName,
      componentPath,
      storybookPath,
      fullCorePath,
      outputDir
    );

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
