import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import SegmentedControl from "@components/src/core/SegmentedControl";
import { Theme } from "@components/src/core/styles";
import { useThemeMode, type ThemeMode } from "@sds-docs/useThemeMode";
import { Editor, type EditorHandle } from "./Editor";
import { DEFAULT_CODE } from "./lib/defaultCode";
import {
  buildPlaygroundHref,
  readCodeFromHash,
  readPaddingFromSearch,
  storybookHref,
  writeCodeToHash,
  type PlaygroundPadding,
} from "./lib/link";
import { runCode, type RunResult } from "./lib/runner";
import { scope } from "./lib/scope";
import { Preview, type PreviewWidth } from "./Preview";
import {
  Actions,
  Divider,
  EditorPane,
  Header,
  Layout,
  Panes,
  PreviewPane,
  Spacer,
  Status,
  Title,
  TitleLink,
} from "./style";

/**
 * How long the editor has to go quiet before the preview is rebuilt. Long
 * enough that a compile is not queued behind every keystroke, short enough that
 * the preview still reads as live.
 */
const RUN_DELAY = 400;

/** Limits on the split, so neither pane can be dragged out of existence. */
const MIN_EDITOR_PERCENT = 20;
const MAX_EDITOR_PERCENT = 80;
const DEFAULT_EDITOR_PERCENT = 45;

function initialCode(): string {
  if (typeof window === "undefined") return DEFAULT_CODE;
  return readCodeFromHash(window.location.hash) ?? DEFAULT_CODE;
}

function initialPadding(): PlaygroundPadding {
  if (typeof window === "undefined") return "default";
  return readPaddingFromSearch(window.location.search);
}

/**
 * The live code playground: an editor over an SDS preview, sharing its state
 * through the URL so any revision can be linked to.
 *
 * It is a Storybook story rather than an app of its own, which is what gives it
 * the component library, the theme, and the deploy without any of them being
 * set up twice. Every code example in the documentation links here through
 * `buildPlaygroundHref`.
 */
export function Playground(): ReactElement {
  /**
   * Only the seed. Storybook's toolbar is not on screen in a fullscreen story,
   * so the mode is the playground's own from here; this is what carries the
   * reader's choice over from the documentation page they came from, which
   * `buildPlaygroundHref` writes into the link as Storybook's theme global.
   */
  const initialMode = useThemeMode();

  const [code, setCode] = useState(initialCode);
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const theme = useMemo(() => Theme(mode), [mode]);
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("desktop");

  /**
   * Read once and then left alone: it is how the example was documented, not
   * something the playground offers to change. `writeCodeToHash` keeps the
   * query string it arrived in, so it survives every edit.
   */
  const [padding] = useState(initialPadding);

  const [editorPercent, setEditorPercent] = useState(DEFAULT_EDITOR_PERCENT);

  const [result, setResult] = useState<RunResult | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const editorRef = useRef<EditorHandle | null>(null);

  const handleEditorReady = useCallback((handle: EditorHandle) => {
    editorRef.current = handle;
    setIsReady(true);
  }, []);

  /**
   * Compile and run whatever the editor last settled on, and record it in the
   * URL. Both are debounced together: the address bar should describe what is
   * on screen, so it moves when the preview does and not on every keystroke.
   */
  useEffect(() => {
    const handle = editorRef.current;
    if (!handle) return;

    let cancelled = false;

    const timer = window.setTimeout(() => {
      void runCode(code, { scope, transpile: handle.transpile }).then(
        (next) => {
          if (cancelled) return;

          setResult(next);
          setRunKey((previous) => previous + 1);
        }
      );

      writeCodeToHash(code);
    }, RUN_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [code, isReady]);

  const { handleKeyDown, handlePointerDown } = useResizeSplit(setEditorPercent);
  const { copyLink, hasCopied } = useCopyLink(code, mode, padding);

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <Layout>
          <Header>
            <Title>
              {/* Out of the preview frame and into the tab: the playground is
                  a story, so a link left to itself would open Storybook inside
                  the iframe Storybook is already showing. */}
              <TitleLink href={storybookHref()} target="_top">
                SDS Playground
              </TitleLink>
            </Title>

            <Actions>
              <Button
                onClick={() => void editorRef.current?.format()}
                sdsStyle="minimal"
                sdsType="secondary"
                size="medium"
                startIcon={<Icon sdsIcon="Code" sdsSize="s" />}
              >
                Format
              </Button>
              <Button
                onClick={() => setCode(DEFAULT_CODE)}
                sdsStyle="minimal"
                sdsType="secondary"
                size="medium"
                startIcon={<Icon sdsIcon="Refresh" sdsSize="s" />}
              >
                Reset
              </Button>
              <Button
                onClick={copyLink}
                sdsStyle="minimal"
                sdsType="secondary"
                size="medium"
                startIcon={
                  <Icon
                    sdsIcon={hasCopied ? "CheckCircle" : "Share"}
                    sdsSize="l"
                  />
                }
              >
                {hasCopied ? "Copied" : "Share"}
              </Button>
            </Actions>

            <Spacer />

            <Actions>
              <SegmentedControl
                aria-label="Theme"
                buttonDefinition={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
                onChange={(_event, next) => {
                  if (next) setMode(next as ThemeMode);
                }}
                value={mode}
              />
              <SegmentedControl
                aria-label="Preview width"
                buttonDefinition={[
                  { label: "Desktop", value: "desktop" },
                  { label: "Mobile", value: "mobile" },
                ]}
                onChange={(_event, next) => {
                  if (next) setPreviewWidth(next as PreviewWidth);
                }}
                value={previewWidth}
              />
            </Actions>
          </Header>

          <Panes>
            <EditorPane widthPercent={editorPercent}>
              <Editor
                mode={mode}
                onChange={setCode}
                onReady={handleEditorReady}
                value={code}
              />
              <Status isError={Boolean(result?.error)}>
                {statusOf(result)}
              </Status>
            </EditorPane>

            <Divider
              aria-label="Resize the editor"
              aria-orientation="vertical"
              aria-valuemax={MAX_EDITOR_PERCENT}
              aria-valuemin={MIN_EDITOR_PERCENT}
              aria-valuenow={Math.round(editorPercent)}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              role="separator"
              tabIndex={0}
            />

            <PreviewPane>
              <Preview
                mode={mode}
                padding={padding}
                result={result}
                runKey={runKey}
                width={previewWidth}
              />
            </PreviewPane>
          </Panes>
        </Layout>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

/** The one-line summary under the editor, which doubles as the error report. */
function statusOf(result: RunResult | null): string {
  if (!result) return "Starting the compiler…";
  if (!result.error) return "Ready";

  return result.phase === "compile"
    ? `Did not compile: ${result.error}`
    : `Did not run: ${result.error}`;
}

/** How far one arrow key press moves the split. */
const KEYBOARD_STEP = 5;

function clampPercent(percent: number): number {
  return Math.min(MAX_EDITOR_PERCENT, Math.max(MIN_EDITOR_PERCENT, percent));
}

/**
 * Move the split between the panes, by dragging the divider or by focusing it
 * and using the arrow keys.
 *
 * The drag listeners go on the window rather than the divider so the drag
 * survives the pointer running ahead of it — which it will, since the divider
 * is only a few pixels wide and the panes are what the pointer is over.
 */
function useResizeSplit(onResize: (percent: number) => void): {
  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handlePointerDown: (event: React.PointerEvent<HTMLElement>) => void;
} {
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      event.preventDefault();

      const panes = event.currentTarget.parentElement;
      if (!panes) return;

      const move = (pointer: PointerEvent) => {
        const { left, width } = panes.getBoundingClientRect();
        onResize(clampPercent(((pointer.clientX - left) / width) * 100));
      };

      const stop = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", stop);
        document.body.style.removeProperty("cursor");
        document.body.style.removeProperty("user-select");
      };

      // Held for the length of the drag, so the pointer keeps the resize cursor
      // over the panes and no text is selected on the way past.
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", stop);
    },
    [onResize]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const step =
        event.key === "ArrowLeft"
          ? -KEYBOARD_STEP
          : event.key === "ArrowRight"
            ? KEYBOARD_STEP
            : 0;

      if (step === 0) return;

      event.preventDefault();
      onResize(
        clampPercent(
          Number(event.currentTarget.getAttribute("aria-valuenow")) + step
        )
      );
    },
    [onResize]
  );

  return { handleKeyDown, handlePointerDown };
}

/** How long the copy button stays on its confirmation. */
const COPIED_FOR = 2000;

/**
 * Put a link to what is on screen on the clipboard, and say so.
 *
 * The link is built from the current code rather than read off the address bar,
 * which trails it by the debounce and would hand over the previous revision to
 * anyone who copied straight after an edit.
 */
function useCopyLink(
  code: string,
  mode: ThemeMode,
  padding: PlaygroundPadding
): { copyLink: () => void; hasCopied: boolean } {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;

    const timer = window.setTimeout(() => setHasCopied(false), COPIED_FOR);
    return () => window.clearTimeout(timer);
  }, [hasCopied]);

  const copyLink = useCallback(() => {
    void navigator.clipboard
      ?.writeText(buildPlaygroundHref(code, { padding, theme: mode }))
      .then(() => setHasCopied(true));
  }, [code, mode, padding]);

  return { copyLink, hasCopied };
}

export default Playground;
