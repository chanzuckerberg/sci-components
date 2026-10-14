import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/editor/editor.worker?worker";
import TypeScriptWorker from "monaco-editor/languages/features/typescript/ts.worker?worker";
import { Theme, getSemanticColors } from "@components/src/core/styles";
import type { ThemeMode } from "@sds-docs/useThemeMode";
import type { Transpile } from "./lib/runner";

/**
 * The type definitions the editor offers completions and errors against,
 * written by `scripts/generate-types.mjs` and served from Storybook's static
 * directory. Resolved against the current document so that a Storybook deployed
 * under a subpath, as the GitHub Pages one is, still finds it.
 */
const TYPES_PATH = "playground-types/types.json";

/**
 * Monaco's own themes, minus the surfaces they paint.
 *
 * The editor's own backgrounds are given up so that the pane shows through and
 * the code sits on the same sheet as the preview beside it. The syntax colours
 * are inherited untouched — they are the part of the theme worth having.
 */
export const EDITOR_THEME = { dark: "sds-dark", light: "sds-light" } as const;

/**
 * Monaco ships its own copy of TypeScript and runs it in a worker. Vite bundles
 * both workers from source rather than loading them off a CDN, so the
 * playground works offline and behind a proxy — and so the compiler in the
 * editor is the same one that compiles the preview.
 */
if (typeof window !== "undefined") {
  window.MonacoEnvironment = {
    getWorker(_moduleId, label) {
      return label === "typescript" || label === "javascript"
        ? new TypeScriptWorker()
        : new EditorWorker();
    },
  };

  loader.config({ monaco });
  defineEditorThemes();
}

function defineEditorThemes(): void {
  const transparent = "#00000000";

  /**
   * Every surface the editor would paint is dropped, leaving the pane's own to
   * show through, bar the line the caret is on.
   *
   * That one is filled instead of outlined. Monaco rules a box around it by
   * default, which on a pane with no chrome of its own reads as a stray border;
   * the fill is the theme's own secondary surface, the same lift a hovered row
   * gets elsewhere in the system.
   *
   * The indent guides are ruled in the theme's divider, active one included:
   * they are the same hairline the rest of the system draws to separate things,
   * and a snippet this short has no block deep enough to need singling out.
   */
  const colors = (mode: ThemeMode) => {
    const semanticColors = getSemanticColors({ theme: Theme(mode) });

    return {
      "editor.background": transparent,
      "editor.lineHighlightBackground":
        semanticColors?.base?.backgroundSecondary ?? transparent,
      "editor.lineHighlightBorder": transparent,
      "editorGutter.background": transparent,
      "editorIndentGuide.activeBackground1":
        semanticColors?.base?.borderPrimary ?? transparent,
      "editorIndentGuide.background1":
        semanticColors?.base?.divider ?? transparent,
      "minimap.background": transparent,
    };
  };

  monaco.editor.defineTheme(EDITOR_THEME.light, {
    base: "vs",
    colors: colors("light"),
    inherit: true,
    rules: [],
  });
  monaco.editor.defineTheme(EDITOR_THEME.dark, {
    base: "vs-dark",
    colors: colors("dark"),
    inherit: true,
    rules: [],
  });
}

let configured = false;

/**
 * Point Monaco's TypeScript service at the playground's world: the module
 * format the runner expects back, and the types of the packages it can import.
 *
 * Safe to call on every editor mount. React's development double-effect and a
 * Fast Refresh re-evaluation of this module would otherwise stack a second
 * formatter onto the same language.
 */
export function configureMonaco(): void {
  if (configured) return;
  configured = true;

  const { typescriptDefaults } = monaco.typescript;

  typescriptDefaults.setCompilerOptions({
    allowJs: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: monaco.typescript.JsxEmit.ReactJSX,
    /**
     * CommonJS because the runner evaluates the emit with a `require` of its
     * own; the automatic JSX runtime then arrives the same way, as a require of
     * `react/jsx-runtime`, which the scope provides.
     */
    module: monaco.typescript.ModuleKind.CommonJS,
    moduleResolution: monaco.typescript.ModuleResolutionKind.NodeJs,
    /**
     * Off, because the playground is for trying things: half-written code is
     * the normal state of the editor, and errors about it while you type would
     * be noise. Everything that actually stops the preview rendering is
     * reported under it instead.
     */
    strict: false,
    target: monaco.typescript.ScriptTarget.ESNext,
  });

  /**
   * Syntax is checked; types are not.
   *
   * Completions and hovers come from the definitions loaded below and are as
   * good as the real thing. Type *errors* are not, because the packages SDS
   * builds on are stubbed (see `scripts/generate-types.mjs`): `ButtonProps`
   * extends MUI's, so with MUI stubbed the checker cannot see `children` and
   * reports every `<Button>Label</Button>` in the documentation as wrong.
   *
   * Squiggles under correct code are worse than no squiggles, and the errors
   * that stop a preview rendering are reported under it either way.
   */
  typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  registerFormatter();
  void loadTypeDefinitions();
}

/**
 * Load the SDS and React type definitions, which is what gives the editor its
 * completions, hovers and signature help.
 *
 * A missing or unreadable bundle costs those and nothing else: the preview
 * compiles through a separate path that never consults them. That is
 * deliberate — the definitions are generated from a package build, and a
 * playground that refused to open without one would be broken far more often
 * than it was useful.
 */
async function loadTypeDefinitions(): Promise<void> {
  let files: Record<string, string>;

  try {
    const response = await fetch(new URL(TYPES_PATH, window.location.href));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    files = await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "Playground type definitions unavailable; autocomplete will be limited. " +
        "Run `yarn playground:types` to generate them.",
      error
    );
    return;
  }

  const { typescriptDefaults } = monaco.typescript;

  for (const [path, content] of Object.entries(files)) {
    typescriptDefaults.addExtraLib(content, path);
  }
}

/**
 * Register Prettier as the formatter for the editor's language, which is what
 * powers both the toolbar's "Format" button and Monaco's own Shift+Alt+F.
 *
 * Prettier is loaded on first use rather than with the editor: formatting is
 * something you ask for, and the parser is large enough to be worth not paying
 * for until then.
 */
function registerFormatter(): void {
  monaco.languages.registerDocumentFormattingEditProvider("typescript", {
    async provideDocumentFormattingEdits(model) {
      const [prettier, estree, typescript] = await Promise.all([
        import("prettier/standalone"),
        import("prettier/plugins/estree"),
        import("prettier/plugins/typescript"),
      ]);

      const formatted = await prettier.format(model.getValue(), {
        parser: "typescript",
        plugins: [estree.default ?? estree, typescript.default ?? typescript],
      });

      return [{ range: model.getFullModelRange(), text: formatted }];
    },
  });
}

/**
 * A {@link Transpile} backed by the editor's own TypeScript worker.
 *
 * Reusing the worker is what keeps a second copy of the compiler off the page —
 * the Astryx playground ships one because its editor and its preview live in
 * different documents and cannot share.
 */
export function createTranspiler(uri: monaco.Uri): Transpile {
  const fileName = uri.toString();

  return async (code) => {
    // The worker compiles the model, not the string, so the two have to agree.
    // They already do when this is called from an edit; the guard is for code
    // that arrives some other way, such as a freshly opened share link.
    const model = monaco.editor.getModel(uri);
    if (model && model.getValue() !== code) model.setValue(code);

    const worker = await (await monaco.typescript.getTypeScriptWorker())(uri);

    // Emit is best-effort and will happily produce something from a file that
    // does not parse, so ask first rather than running the wreckage.
    const [syntaxError] = await worker.getSyntacticDiagnostics(fileName);
    if (syntaxError) {
      throw new Error(diagnosticMessage(syntaxError.messageText));
    }

    const output = await worker.getEmitOutput(fileName);
    const emitted = output.outputFiles.find((file) =>
      file.name.endsWith(".js")
    );

    if (!emitted) throw new Error("The compiler produced no output.");

    return emitted.text;
  };
}

/** Diagnostics arrive either as a string or as a chain of them. */
function diagnosticMessage(
  message: string | { messageText: string | unknown }
): string {
  if (typeof message === "string") return message;

  const { messageText } = message;
  return typeof messageText === "string"
    ? messageText
    : "This code did not compile.";
}
