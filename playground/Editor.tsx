import MonacoEditor from "@monaco-editor/react";
import { useCallback, useRef, type ReactElement } from "react";
import type { editor } from "monaco-editor";
import type { ThemeMode } from "@sds-docs/useThemeMode";
import type { Transpile } from "./lib/runner";
import { configureMonaco, createTranspiler } from "./monacoSetup";
import { EditorSurface } from "./style";

/** What the playground can ask of the editor once it has mounted. */
export interface EditorHandle {
  /** Run the registered formatter over the buffer. */
  format: () => Promise<void>;
  transpile: Transpile;
}

export interface EditorProps {
  mode: ThemeMode;
  onChange: (code: string) => void;
  /** Called once, when the editor and its TypeScript worker are usable. */
  onReady: (handle: EditorHandle) => void;
  value: string;
}

const OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  fontSize: 13,
  minimap: { enabled: false },
  padding: { top: 12 },
  scrollBeyondLastLine: false,
  tabSize: 2,
  // The editor is one pane of a split, so a long line should wrap into the
  // width it has rather than hide itself behind a horizontal scrollbar.
  wordWrap: "on",
};

/**
 * The left-hand pane. Monaco is loaded from the bundle rather than a CDN (see
 * `./monacoSetup`), and the same TypeScript worker that gives the editor its
 * completions also compiles what the preview runs.
 */
export function Editor({
  mode,
  onChange,
  onReady,
  value,
}: EditorProps): ReactElement {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleMount = useCallback(
    (instance: editor.IStandaloneCodeEditor) => {
      editorRef.current = instance;
      configureMonaco();

      const model = instance.getModel();
      if (!model) return;

      onReady({
        format: async () => {
          await instance.getAction("editor.action.formatDocument")?.run();
        },
        transpile: createTranspiler(model.uri),
      });
    },
    [onReady]
  );

  return (
    <EditorSurface>
      <MonacoEditor
        defaultLanguage="typescript"
        height="100%"
        onChange={(next) => onChange(next ?? "")}
        onMount={handleMount}
        options={OPTIONS}
        /**
         * A `.tsx` path is what makes Monaco parse JSX and resolve the imports
         * as a bundler would; the model's URI is also the file name the
         * transpiler emits against.
         */
        path="file:///playground.tsx"
        theme={mode === "dark" ? "vs-dark" : "vs"}
        value={value}
      />
    </EditorSurface>
  );
}

export default Editor;
