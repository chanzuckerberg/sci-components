import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import * as react from "react";
import * as jsxRuntime from "react/jsx-runtime";
import type { LazyModuleScope, ModuleScope, Transpile } from "../runner";
import { resolveModule, runCode } from "../runner";

/**
 * The same emit the editor's TypeScript worker produces at runtime, down to the
 * interop helpers, so these tests exercise the runner against real compiler
 * output rather than something hand-written that happens to suit it.
 */
const transpile: Transpile = async (code) => {
  const { diagnostics, outputText } = ts.transpileModule(code, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: "playground.tsx",
    reportDiagnostics: true,
  });

  const [first] = diagnostics ?? [];
  if (first) {
    throw new Error(ts.flattenDiagnosticMessageText(first.messageText, " "));
  }

  return outputText;
};

/** A component that names itself in the markup, so assertions can find it. */
function stub(name: string) {
  return ({ children }: { children?: ReactNode }) =>
    createElement("div", { "data-component": name }, children);
}

function stubs(...names: string[]): Record<string, unknown> {
  return Object.fromEntries(names.map((name) => [name, stub(name)]));
}

/**
 * Stands in for the real scope, so these tests run without loading the
 * component library, MUI and ECharts. What the imports resolve to does not
 * matter here — that they resolve, and that the module around them runs, does.
 */
const scope: ModuleScope = {
  "@czi-sds/components": stubs(
    "Accordion",
    "AccordionDetails",
    "AccordionHeader",
    "Button"
  ),
  react: { ...react, default: react },
  "react/jsx-runtime": { ...jsxRuntime },
};

async function render(code: string): Promise<string> {
  const result = await runCode(code, { scope, transpile });

  if (!result.Component) throw new Error(`[${result.phase}] ${result.error}`);

  return renderToStaticMarkup(createElement(result.Component));
}

describe("runCode", () => {
  it("renders a component from source written as the docs write it", async () => {
    const markup = await render(`
      import { Button } from "@czi-sds/components";

      function App() {
        return <Button>Click me</Button>;
      }

      export default App;
    `);

    expect(markup).toContain('data-component="Button"');
    expect(markup).toContain("Click me");
  });

  it("runs a real documentation example", async () => {
    const source = readFileSync(
      resolve(
        process.cwd(),
        "packages/components/src/core/Accordion/__storybook__/docs/examples/DefaultAccordion.tsx"
      ),
      "utf-8"
    );

    expect(await render(source)).toContain('data-component="Accordion"');
  });

  it("resolves a component used without importing it", async () => {
    const markup = await render(`
      export default function App() {
        return <Button>No import</Button>;
      }
    `);

    expect(markup).toContain('data-component="Button"');
  });

  it("lets the example's own declarations win over the injected globals", async () => {
    const markup = await render(`
      const Button = () => <p>Mine</p>;

      export default function App() {
        return <Button />;
      }
    `);

    expect(markup).toBe("<p>Mine</p>");
  });

  it("renders nothing for an import it cannot resolve, and carries on", async () => {
    const markup = await render(`
      import { Chart } from "some-package-we-do-not-ship";

      export default function App() {
        return (
          <div>
            <Chart />
            <span>Still here</span>
          </div>
        );
      }
    `);

    expect(markup).toBe("<div><span>Still here</span></div>");
  });

  it("reports a syntax error as a compile failure", async () => {
    const result = await runCode("export default function App( {", {
      scope,
      transpile,
    });

    expect(result).toMatchObject({ phase: "compile" });
  });

  it("reports a throw at module scope as an evaluate failure", async () => {
    const result = await runCode('throw new Error("boom");', {
      scope,
      transpile,
    });

    expect(result).toMatchObject({ error: "boom", phase: "evaluate" });
  });

  it("asks for a default export when the file has none", async () => {
    const result = await runCode("export function App() { return null; }", {
      scope,
      transpile,
    });

    expect(result.error).toContain("export default App");
  });
});

describe("runCode, on the modules it fetches on demand", () => {
  /** Counted so the tests can tell a module that was fetched from one that was not. */
  function iconPack(): { fetches: () => number; lazyScope: LazyModuleScope } {
    let fetches = 0;

    return {
      fetches: () => fetches,
      lazyScope: {
        "icon-pack": async () => {
          fetches += 1;
          return stubs("Heart", "Table");
        },
      },
    };
  }

  it("fetches one the example imports", async () => {
    const { fetches, lazyScope } = iconPack();
    const result = await runCode(
      `
        import { Heart } from "icon-pack";

        export default function App() {
          return <Heart />;
        }
      `,
      { lazyScope, scope, transpile }
    );

    expect(fetches()).toBe(1);
    expect(renderToStaticMarkup(createElement(result.Component!))).toContain(
      'data-component="Heart"'
    );
  });

  it("leaves one the example says nothing about alone", async () => {
    const { fetches, lazyScope } = iconPack();
    await runCode("export default () => null;", {
      lazyScope,
      scope,
      transpile,
    });

    expect(fetches()).toBe(0);
  });

  it("keeps its exports out of the names a run is handed", async () => {
    // Which is the point of fetching them this way: an icon pack is full of
    // names the component library uses too, and bare `Table` means the SDS one.
    const { lazyScope } = iconPack();
    const result = await runCode(
      `
        import "icon-pack";

        export default function App() {
          return <Table />;
        }
      `,
      { lazyScope, scope, transpile }
    );

    expect(() =>
      renderToStaticMarkup(createElement(result.Component!))
    ).toThrow(/Table is not defined/);
  });

  it("renders nothing for one that fails to arrive, and carries on", async () => {
    const result = await runCode(
      `
        import { Heart } from "icon-pack";

        export default function App() {
          return (
            <div>
              <Heart />
              <span>Still here</span>
            </div>
          );
        }
      `,
      {
        lazyScope: { "icon-pack": () => Promise.reject(new Error("offline")) },
        scope,
        transpile,
      }
    );

    expect(renderToStaticMarkup(createElement(result.Component!))).toBe(
      "<div><span>Still here</span></div>"
    );
  });
});

describe("resolveModule", () => {
  it("prefers an exact match", () => {
    expect(resolveModule(scope, "react")).toBe(scope.react);
  });

  it("falls back to a named export of the parent for a deep import", () => {
    const box = resolveModule(
      { "@mui/material": { Box: "box" } },
      "@mui/material/Box"
    );

    expect(box).toMatchObject({ Box: "box", default: "box" });
  });

  it("reports nothing for a package it does not carry", () => {
    expect(resolveModule(scope, "left-pad")).toBeNull();
  });
});
