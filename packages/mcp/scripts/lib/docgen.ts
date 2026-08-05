/**
 * The `react-docgen-typescript` setup shared by everything that reads a
 * component's real API out of its source: the props data the MCP server ships,
 * and the audit that checks the documentation against it. Both have to agree on
 * what a prop's type is, so they resolve types through the same code.
 */
import * as path from "path";
import {
  withDefaultConfig,
  ParserOptions,
  PropItem,
} from "react-docgen-typescript";
import * as ts from "typescript";

/**
 * For a named export, `exp.getName()` is the name the component is published
 * as. For a default export it is instead the anonymous type React wraps the
 * component in, so those fall back to the directory name.
 */
const ANONYMOUS_EXPORT_NAMES = new Set([
  "default",
  "ExoticComponent",
  "ForwardRefExoticComponent",
  "FunctionComponent",
  "MemoExoticComponent",
  "NamedExoticComponent",
]);

function resolveComponentName(
  exp: ts.Symbol,
  source: ts.SourceFile
): string | undefined {
  const name = exp.getName();

  if (!name || name.startsWith("__") || ANONYMOUS_EXPORT_NAMES.has(name)) {
    return path.basename(path.dirname(source.fileName));
  }

  return name;
}

// Configure the parser to extract ALL props without filtering
const parserOptions: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  // Don't filter any props - callers filter later, by argTypes or by origin
  propFilter: () => true,
  componentNameResolver: resolveComponentName,
};

// Note: despite the name, `withDefaultConfig` does not read a tsconfig. It uses
// react-docgen-typescript's own hardcoded compiler options.
export const parser = withDefaultConfig(parserOptions);

/**
 * React's node and event types expand into unions too large to be worth
 * printing, so they collapse back to the names people write.
 */
function collapseReactTypes(type: string): string | undefined {
  if (type.includes("ReactNode")) {
    return "ReactNode";
  }
  if (type.includes("ReactElement")) {
    return "ReactElement";
  }
  if (type.includes("MouseEvent") || type.includes("ChangeEvent")) {
    return "function";
  }

  return undefined;
}

const PRIMITIVES = new Set(["boolean", "number", "string"]);

/**
 * A component that narrows an inherited prop ends up with an intersection:
 * `label: string` over MUI's `label?: ReactNode` resolves to `ReactNode &
 * string`. The primitive is the whole of what a caller may pass, and printing
 * the other side would say the opposite.
 */
function narrowedPrimitive(type: string): string | undefined {
  if (!type.includes("&")) {
    return undefined;
  }

  return type
    .split("&")
    .map((part) => part.trim())
    .find((part) => PRIMITIVES.has(part));
}

function simplifyType(type: string): string {
  // Clean up the type string
  type = type.replace(/\s+/g, " ").trim();

  const narrowed = narrowedPrimitive(type);
  if (narrowed) {
    return narrowed;
  }

  const react = collapseReactTypes(type);
  if (react) {
    return react;
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

export function parseDefaultValue(
  value: string
): string | number | boolean | null {
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

/**
 * Rebuild a union from the members docgen resolved.
 *
 * Members arrive already quoted when they are string literals, so they are
 * joined as they are: re-quoting everything would render `width` as though it
 * accepted the strings "string" and "number".
 */
function enumUnion(typeValue: PropItem["type"]): string | null {
  if (typeValue.name !== "enum" || !typeValue.value) {
    return null;
  }

  const members: string[] = (
    typeValue.value as ({ value?: unknown } | string | number)[]
  )
    .map((v) =>
      typeof v === "object" && v !== null && v.value !== undefined
        ? String(v.value)
        : String(v)
    )
    .filter((v) => v !== "" && v !== "|");

  if (members.length === 0) {
    return null;
  }

  // `shouldExtractLiteralValuesFromEnum` splits a boolean into its two
  // literals, which reads as if the prop took the strings "true" and "false".
  if (
    members.length === 2 &&
    members.every((v) => v === "true" || v === "false")
  ) {
    return "boolean";
  }

  return members.join(" | ");
}

/**
 * A union built from resolved members is already in its final shape, so it
 * skips the heuristics `simplifyType` uses to rescue something readable out of
 * a raw type string.
 */
export function resolveType(propInfo: PropItem): string {
  const union = enumUnion(propInfo.type);

  if (union === null) {
    return simplifyType(propInfo.type.raw || propInfo.type.name);
  }

  return collapseReactTypes(union) ?? union;
}
