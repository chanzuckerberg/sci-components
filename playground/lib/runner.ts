import type { ComponentType } from "react";

/** The modules a run can import, keyed by specifier. See `./scope`. */
export type ModuleScope = Record<string, Record<string, unknown>>;

/**
 * Turns the editor's source into JavaScript. Supplied by the caller rather than
 * imported, because the only TypeScript compiler on the page belongs to the
 * editor: see `createTranspiler` in `../monacoSetup`. Keeping it a parameter is
 * also what lets the tests run this file without Monaco.
 */
export type Transpile = (code: string) => Promise<string>;

/** Where a run gave out, which is the difference between a typo and a bug. */
export type RunPhase = "compile" | "evaluate";

export type RunResult =
  | { Component: ComponentType; error?: undefined }
  | { Component?: undefined; error: string; phase: RunPhase };

/** The CommonJS arguments the compiled module is handed before any global. */
const MODULE_ARGUMENTS = new Set([
  "default",
  "__esModule",
  "module",
  "exports",
  "require",
]);

/**
 * Names that must not be handed to the module as globals, because each one
 * already means something in JavaScript. Most SDS exports are harmless here,
 * but the library ships an `Image` icon, and shadowing the built-in would break
 * `new Image()` in any example that reaches for it.
 */
const RESERVED_GLOBALS = new Set([
  "Array",
  "BigInt",
  "Boolean",
  "Date",
  "Error",
  "Event",
  "Function",
  "Image",
  "Intl",
  "JSON",
  "Map",
  "Math",
  "Number",
  "Object",
  "Promise",
  "Proxy",
  "Reflect",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "URL",
  "WeakMap",
  "WeakSet",
]);

/**
 * Resolve a module specifier against the scope, falling back to a named export
 * of its parent so the deep imports these packages also publish keep working —
 * `@mui/material/Box` is the same component as `Box` from `@mui/material`, and
 * an example pasted in from elsewhere may well be written either way.
 */
export function resolveModule(
  scope: ModuleScope,
  id: string
): Record<string, unknown> | null {
  const direct = scope[id];
  if (direct) return direct;

  const separator = id.lastIndexOf("/");
  if (separator === -1) return null;

  const parent = scope[id.slice(0, separator)];
  const name = id.slice(separator + 1);
  if (!parent || !(name in parent)) return null;

  return { [name]: parent[name], default: parent[name], __esModule: true };
}

/**
 * Modules the playground cannot resolve stand in as objects whose every
 * property is a component rendering nothing, so an unavailable import costs the
 * example that one element rather than the whole preview.
 */
function missingModule(id: string): Record<string, unknown> {
  return new Proxy(
    { __esModule: true },
    {
      get(_target, property) {
        if (property === "__esModule") return true;
        if (typeof property !== "string") return undefined;

        const placeholder = () => null;
        placeholder.displayName = `${id}/${property}`;
        return placeholder;
      },
    }
  );
}

function makeRequire(scope: ModuleScope): (id: string) => unknown {
  return (id) => {
    const resolved = resolveModule(scope, id);
    if (!resolved) return missingModule(id);

    // TypeScript's `esModuleInterop` helpers read this flag to decide whether a
    // default import means the namespace or its `default` property.
    return resolved.__esModule ? resolved : { ...resolved, __esModule: true };
  };
}

/**
 * Every export in the scope, by name.
 *
 * Handing these to the module as arguments means a snippet that uses `Button`
 * without importing it still renders, which is what makes pasting a fragment
 * out of a code review into the playground work.
 */
function collectGlobals(scope: ModuleScope): Record<string, unknown> {
  const globals: Record<string, unknown> = {};

  for (const moduleExports of Object.values(scope)) {
    for (const [name, value] of Object.entries(moduleExports)) {
      if (RESERVED_GLOBALS.has(name)) continue;
      // A name that is not a plain identifier, or that names one of the three
      // arguments the module already takes, cannot be a function parameter —
      // and one bad parameter is a syntax error for every run, not just the
      // example that would have used it.
      if (MODULE_ARGUMENTS.has(name)) continue;
      if (!/^[A-Za-z_$][\w$]*$/.test(name)) continue;
      globals[name] = value;
    }
  }

  if (scope.react) globals.React = scope.react;
  return globals;
}

/**
 * Names the compiled module declares for itself. A global is passed in as a
 * function parameter, and a parameter cannot coexist with a top-level `const`
 * of the same name ("Identifier 'Table' has already been declared"), so an
 * example that defines its own `Table` needs us to stand back and let it.
 */
function declaredNames(compiled: string): Set<string> {
  const declaration =
    /^(?:export\s+)?(?:const|let|var|function\*?|class)\s+([A-Za-z_$][\w$]*)/gm;

  const names = new Set<string>();
  let match = declaration.exec(compiled);

  while (match !== null) {
    names.add(match[1]);
    match = declaration.exec(compiled);
  }

  return names;
}

function evaluate(compiled: string, scope: ModuleScope): ComponentType {
  const exports: Record<string, unknown> = {};
  const module = { exports };

  const globals = collectGlobals(scope);
  const declared = declaredNames(compiled);
  const names = Object.keys(globals).filter((name) => !declared.has(name));

  /**
   * Running code the user wrote is the whole point here, so the usual objection
   * to the Function constructor does not apply: there is no privilege to
   * escalate to. It runs in the same origin as the rest of Storybook, which is
   * a static documentation site with nothing to reach for.
   */
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const run = new Function("module", "exports", "require", ...names, compiled);
  run(
    module,
    exports,
    makeRequire(scope),
    ...names.map((name) => globals[name])
  );

  const exported = (module.exports as Record<string, unknown>).default;

  if (typeof exported !== "function") {
    throw new Error(
      "Nothing to render. End the file with `export default App;`, where App is your component."
    );
  }

  return exported as ComponentType;
}

export interface RunOptions {
  scope: ModuleScope;
  transpile: Transpile;
}

/**
 * Compile and run one revision of the editor's contents.
 *
 * Errors come back rather than thrown, tagged with the phase they happened in,
 * so the playground can say whether the code did not compile or did not run.
 * Errors thrown while React renders the component are not ours to catch here;
 * the error boundary around the preview handles those.
 */
export async function runCode(
  code: string,
  { scope, transpile }: RunOptions
): Promise<RunResult> {
  let compiled: string;

  try {
    compiled = await transpile(code);
  } catch (error) {
    return { error: messageOf(error), phase: "compile" };
  }

  try {
    return { Component: evaluate(compiled, scope) };
  } catch (error) {
    return { error: messageOf(error), phase: "evaluate" };
  }
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
