/* eslint-disable sonarjs/no-duplicate-string */
/**
 * Extracts the props of every SDS component into `data/component-props/`.
 *
 * The set of props to document comes from each component's Storybook
 * `argTypes`, and their types come from `react-docgen-typescript`. Every
 * component is parsed by a single shared TypeScript program: the parser builds
 * a new program on each `parse()` call, and building one per component means
 * re-reading all of React, MUI and emotion's type definitions each time.
 */
import * as fs from "fs";
import * as path from "path";
import { ComponentDoc, PropItem } from "react-docgen-typescript";
import * as ts from "typescript";
import { fileURLToPath } from "url";
import { parseDefaultValue, parser, resolveType } from "./lib/docgen.js";
import {
  PropsTable,
  PropsTableEntry,
  readPropsTable,
} from "./lib/props-tables.js";
import {
  ArgType,
  extractArgTypesFromStorybook,
} from "./lib/story-arg-types.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const REPO_ROOT = path.join(dirname, "../../..");

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

/** One component to document, with every input resolved before parsing. */
interface ComponentTarget {
  argTypes: ArgType[];
  /** Props as written in the component's documentation page. */
  authoredProps: PropsTable;
  componentPath: string;
  name: string;
  /** Exported subcomponents that have their own directory, by name. */
  subcomponents: Map<string, string>;
}

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
 * Combine what the three sources each know best: the program resolves types,
 * the story knows the curated option lists, and the authored table is the only
 * place descriptions and documented defaults exist.
 */
function mergeProp(
  argType: ArgType,
  docgenProp?: PropItem,
  authored?: PropsTableEntry
): SimplifiedProp {
  const docgenType = docgenProp ? resolveType(docgenProp) : undefined;
  const optionsType = argType.options
    ?.map((option) => `"${option}"`)
    .join(" | ");
  const rawDefault = docgenProp?.defaultValue?.value ?? authored?.defaultValue;

  return {
    defaultValue: rawDefault ? parseDefaultValue(rawDefault) : undefined,
    description: docgenProp?.description || authored?.description,
    isRequired: docgenProp?.required || argType.required || false,
    type:
      (docgenType !== "any" && docgenType) ||
      optionsType ||
      authored?.type ||
      "any",
  };
}

/**
 * Resolve every component that has both a source file and Storybook argTypes.
 */
function collectTargets(
  corePath: string,
  components: string[]
): ComponentTarget[] {
  const targets: ComponentTarget[] = [];

  for (const name of components) {
    const componentDir = path.join(dirname, corePath, name);
    const componentPath = path.join(componentDir, "index.tsx");
    const storybookPath = path.join(
      componentDir,
      "__storybook__",
      "index.stories.tsx"
    );

    if (!fs.existsSync(componentPath)) {
      console.log(`❌ ${name} - Component file not found`);
      continue;
    }

    if (!fs.existsSync(storybookPath)) {
      console.log(`❌ ${name} - Storybook file not found`);
      continue;
    }

    const argTypes = extractArgTypesFromStorybook(storybookPath);
    if (!argTypes || argTypes.length === 0) {
      console.log(`⚠️  ${name} - No argTypes found in Storybook file`);
      continue;
    }

    const subcomponents = new Map<string, string>();
    for (const subName of extractExportedSubcomponents(componentPath)) {
      const subPath = path.join(
        componentDir,
        "components",
        subName,
        "index.tsx"
      );
      if (fs.existsSync(subPath)) {
        subcomponents.set(subName, subPath);
      }
    }

    targets.push({
      argTypes,
      authoredProps: readPropsTable(
        path.join(componentDir, "__storybook__", "docs", "content.html")
      ),
      componentPath,
      name,
      subcomponents,
    });
  }

  return targets;
}

/**
 * docgen reports `filePath` either absolute or relative to the repo root
 * depending on where the script is run from, so both are normalized to the
 * same key.
 */
function fileKey(filePath: string): string {
  return path.resolve(REPO_ROOT, filePath);
}

/** Parse every component in one shared TypeScript program. */
function parseAll(targets: ComponentTarget[]): Map<string, ComponentDoc[]> {
  const files = targets.flatMap((target) => [
    target.componentPath,
    ...target.subcomponents.values(),
  ]);

  console.log(
    `🔍 Parsing ${files.length} files in a single TypeScript program...`
  );

  const started = Date.now();
  const docs = parser.parse(files);
  console.log(
    `   Found ${docs.length} components in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
  );

  const byFile = new Map<string, ComponentDoc[]>();
  for (const doc of docs) {
    const key = fileKey(doc.filePath);
    const existing = byFile.get(key);
    if (existing) {
      existing.push(doc);
    } else {
      byFile.set(key, [doc]);
    }
  }

  return byFile;
}

/**
 * The docs a prop may belong to, most specific first: the component itself,
 * then each subcomponent, then anything else the entry file exports (named
 * re-exports and styled components).
 */
function searchOrder(
  target: ComponentTarget,
  byFile: Map<string, ComponentDoc[]>
): { owner: string; doc: ComponentDoc }[] {
  const entryDocs = byFile.get(fileKey(target.componentPath)) ?? [];
  const main = entryDocs.filter((doc) => doc.displayName === target.name);
  const rest = entryDocs.filter((doc) => doc.displayName !== target.name);

  const subs = [...target.subcomponents].flatMap(([subName, subPath]) =>
    (byFile.get(fileKey(subPath)) ?? []).map((doc) => ({
      owner: subName,
      doc,
    }))
  );

  return [
    ...main.map((doc) => ({ owner: target.name, doc })),
    ...subs,
    ...rest.map((doc) => ({ owner: doc.displayName, doc })),
  ];
}

function extractProps(
  target: ComponentTarget,
  byFile: Map<string, ComponentDoc[]>
): MultiComponentProps {
  const candidates = searchOrder(target, byFile);
  const componentPropsMap: Record<string, Record<string, SimplifiedProp>> = {
    [target.name]: {},
  };

  let unresolved = 0;

  // A story only puts controls on what can usefully be fiddled with, and the
  // props table is the curated list of what the component takes, so the two
  // together describe the API better than either alone.
  const byName = new Map(
    target.argTypes.map((argType) => [argType.name, argType])
  );
  for (const name of target.authoredProps.keys()) {
    byName.set(name, byName.get(name) ?? { name });
  }

  for (const argType of byName.values()) {
    const match = candidates.find(({ doc }) => doc.props[argType.name]);
    const authored = target.authoredProps.get(argType.name);

    // Stories invent controls for themselves: text to put in a slot, a canned
    // set of options, a longer body to scroll. Nothing in the source or the
    // documentation knows the name, so it is a control rather than a prop, and
    // publishing it would describe an API the component does not have.
    //
    // Only a component whose page documents its props can be read this way.
    // Without a table there is no second opinion, and dropping every prop the
    // parser could not resolve would leave the component with none at all.
    if (!match && !authored && target.authoredProps.size > 0) {
      console.log(`    ↷ ${target.name}.${argType.name} - story-only control`);
      continue;
    }

    const owner = match?.owner ?? target.name;
    const prop = mergeProp(argType, match?.doc.props[argType.name], authored);

    if (prop.type === "any") {
      unresolved += 1;
    }

    componentPropsMap[owner] ??= {};
    componentPropsMap[owner][argType.name] = prop;
  }

  const allComponents: MultiComponentProps = {};
  for (const [compName, props] of Object.entries(componentPropsMap)) {
    if (Object.keys(props).length > 0) {
      allComponents[compName] = { props };
    }
  }

  const resolved = byName.size - unresolved;
  console.log(
    `  ✅ ${target.name}: ${resolved}/${byName.size} props resolved` +
      (unresolved > 0 ? ` (${unresolved} unresolved)` : "")
  );

  return allComponents;
}

interface ProcessResult {
  successCount: number;
  failCount: number;
  propsCount: Record<string, number>;
  unresolvedCount: number;
}

function writeComponentProps(
  targets: ComponentTarget[],
  byFile: Map<string, ComponentDoc[]>,
  outputDir: string
): ProcessResult {
  let successCount = 0;
  let failCount = 0;
  let unresolvedCount = 0;
  const propsCount: Record<string, number> = {};

  for (const target of targets) {
    const allComponents = extractProps(target, byFile);

    if (Object.keys(allComponents).length === 0) {
      console.log(`⚠️  ${target.name} - No props extracted`);
      failCount += 1;
      continue;
    }

    fs.writeFileSync(
      path.join(outputDir, `${target.name}.json`),
      JSON.stringify(allComponents, null, 2)
    );

    successCount += 1;
    propsCount[target.name] = Object.values(allComponents).reduce(
      (sum, comp) => sum + Object.keys(comp.props).length,
      0
    );
    unresolvedCount += Object.values(allComponents).reduce(
      (sum, comp) =>
        sum + Object.values(comp.props).filter((p) => p.type === "any").length,
      0
    );
  }

  return { successCount, failCount, propsCount, unresolvedCount };
}

function printSummary(
  result: ProcessResult,
  totalProps: number,
  outputDir: string
): void {
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Successfully processed: ${result.successCount} components`);
  console.log(`⚠️  Failed: ${result.failCount} components`);
  console.log(
    `❓ Props with an unresolved type: ${result.unresolvedCount}/${totalProps}`
  );
  console.log(`📂 Output directory: ${outputDir}`);

  const sorted = Object.entries(result.propsCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  if (sorted.length > 0) {
    console.log("\n📈 Top components by prop count:");
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

  // Rebuilt from scratch so a component that has been removed or renamed does
  // not keep shipping a file no tool can reach.
  fs.rmSync(outputDir, { force: true, recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const targets = [
    ...collectTargets("../../components/src/core", componentList.components),
    ...collectTargets("../../data-viz/src/core", componentList["data-viz"]),
  ];

  console.log(`\n📦 ${targets.length} components to document\n`);

  const byFile = parseAll(targets);
  const result = writeComponentProps(targets, byFile, outputDir);
  const totalProps = Object.values(result.propsCount).reduce(
    (sum, count) => sum + count,
    0
  );

  printSummary(result, totalProps, outputDir);
}

// Run the script
generatePropsWithDocgen();
