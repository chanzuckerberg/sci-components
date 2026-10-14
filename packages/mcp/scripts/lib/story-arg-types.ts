/**
 * Reads the `argTypes` a component's story declares.
 *
 * They are the curated public surface, as opposed to everything a component
 * inherits from MUI, and they decide which props the generated props data
 * covers. The audit reads them too, to find props the documentation describes
 * that Storybook has no control for.
 */
import * as fs from "fs";
import * as ts from "typescript";

/** The `argTypes` entry for one prop, as authored in a story. */
export interface ArgType {
  name: string;
  options?: string[];
  required?: boolean;
}

function propertyValue(
  object: ts.ObjectLiteralExpression,
  name: string
): ts.Expression | undefined {
  for (const property of object.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
      property.name.text === name
    ) {
      return property.initializer;
    }
  }

  return undefined;
}

function readStringArray(expression?: ts.Expression): string[] | undefined {
  if (!expression || !ts.isArrayLiteralExpression(expression)) {
    return undefined;
  }

  const values = expression.elements
    .filter(ts.isStringLiteralLike)
    .map((element) => element.text);

  return values.length === expression.elements.length && values.length > 0
    ? values
    : undefined;
}

function readArgType(property: ts.ObjectLiteralElementLike): ArgType | null {
  if (
    !ts.isPropertyAssignment(property) ||
    !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
  ) {
    return null;
  }

  const name = property.name.text;

  if (!ts.isObjectLiteralExpression(property.initializer)) {
    return { name };
  }

  return {
    name,
    options: readStringArray(propertyValue(property.initializer, "options")),
    required:
      propertyValue(property.initializer, "required")?.kind ===
      ts.SyntaxKind.TrueKeyword,
  };
}

/** Locate the `argTypes` object on a story file's default-exported meta. */
function findArgTypesObject(
  sourceFile: ts.SourceFile
): ts.ObjectLiteralExpression | undefined {
  let found: ts.ObjectLiteralExpression | undefined;

  const visit = (node: ts.Node): void => {
    if (found) {
      return;
    }

    if (ts.isExportAssignment(node)) {
      // Unwrap an `as Meta` assertion.
      const meta = ts.isAsExpression(node.expression)
        ? node.expression.expression
        : node.expression;

      if (ts.isObjectLiteralExpression(meta)) {
        const argTypes = propertyValue(meta, "argTypes");

        if (argTypes && ts.isObjectLiteralExpression(argTypes)) {
          found = argTypes;
          return;
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return found;
}

/**
 * The story's `argTypes` decide which props get documented: they are the
 * curated public surface, as opposed to everything a component inherits from
 * MUI.
 */
export function extractArgTypesFromStorybook(
  storybookPath: string
): ArgType[] | null {
  try {
    if (!fs.existsSync(storybookPath)) {
      return null;
    }

    const sourceFile = ts.createSourceFile(
      storybookPath,
      fs.readFileSync(storybookPath, "utf-8"),
      ts.ScriptTarget.Latest,
      true
    );

    const argTypesObject = findArgTypesObject(sourceFile);

    if (!argTypesObject) {
      return null;
    }

    const argTypes = argTypesObject.properties
      .map(readArgType)
      .filter((argType): argType is ArgType => argType !== null);

    return argTypes.length > 0 ? argTypes : null;
  } catch (error) {
    console.log(
      `    ⚠️  Could not extract argTypes: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}
