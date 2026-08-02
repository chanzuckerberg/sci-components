import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Component,
  useMemo,
  type ComponentType,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from "react";
import type { SDSTheme } from "@components/src/core/styles";
import { previewTheme } from "@sds-docs/previewTheme";
import type { ThemeMode } from "@sds-docs/useThemeMode";
import type { PlaygroundPadding } from "./lib/link";
import type { RunResult } from "./lib/runner";
import { Message, Stage, Surface, Viewport } from "./style";

/** How much of the pane's width a preview is given. */
export type PreviewWidth = "desktop" | "mobile";

/** iPhone-class logical width, where a responsive layout starts to reflow. */
const MOBILE_WIDTH = 402;

interface BoundaryProps {
  /** Changing this remounts the subtree, clearing an error from a past run. */
  runKey: number;
  children: ReactNode;
}

/**
 * Catches what the runner cannot: an example that compiles and evaluates
 * cleanly, then throws while React renders it. Without this the whole
 * playground unmounts and the editor goes with it, taking the user's code.
 */
class RenderBoundary extends Component<BoundaryProps, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidUpdate(previous: BoundaryProps): void {
    if (previous.runKey !== this.props.runKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("Playground example failed to render", error, info);
  }

  render(): ReactNode {
    const { error } = this.state;

    if (error) {
      return <Message role="alert">Render error: {error.message}</Message>;
    }

    return this.props.children;
  }
}

export interface PreviewProps {
  mode: ThemeMode;
  /**
   * How much room the device leaves around the example, carried over from how
   * the documentation page frames it. Page-width components such as a
   * navigation header are shown without any, so that they sit against the top
   * of the screen the way they would in an app.
   */
  padding: PlaygroundPadding;
  /**
   * Bumped on every run. It remounts the example, so state left over from the
   * previous revision (an open menu, a half-filled form) does not survive an
   * edit and make the preview disagree with the code beside it.
   */
  runKey: number;
  result: RunResult | null;
  width: PreviewWidth;
}

/**
 * The right-hand pane: whatever the last run produced, on an SDS surface of its
 * own so the preview can be read in light or dark independently of the
 * playground around it.
 */
export function Preview({
  mode,
  padding,
  result,
  runKey,
  width,
}: PreviewProps): ReactElement {
  const theme = useMemo(() => playgroundTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <Surface>
          {/* Scoped to the preview, so the example sits on the same reset a
              story does without the playground's own chrome inheriting it. */}
          <CssBaseline enableColorScheme={false} />
          <Viewport
            padded={padding === "default"}
            width={width === "mobile" ? MOBILE_WIDTH : undefined}
          >
            <Stage>
              {result?.error ? (
                <Message role="alert">
                  {result.phase === "compile"
                    ? "This code did not compile"
                    : "This code did not run"}
                  : {result.error}
                </Message>
              ) : null}
              {result?.Component ? (
                <RenderBoundary runKey={runKey}>
                  <Example key={runKey} of={result.Component} />
                </RenderBoundary>
              ) : null}
            </Stage>
          </Viewport>
        </Surface>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

/**
 * The previews' theme, with the overlays that take over a screen held to the
 * device's.
 *
 * A drawer — what a navigation header collapses to at a phone's width, which is
 * exactly what the mobile preview is for — and a dialog both send themselves to
 * the end of `<body>` and lay themselves out against the browser window. Left
 * alone they cover the playground, editor and all, rather than the example that
 * opened them. Rendered in place and positioned absolutely they fill the stage
 * instead, which is the screen they were asking for.
 *
 * Menus and tooltips are deliberately left out of the second half: they are
 * placed from the on-screen position of whatever opened them, which is measured
 * against the window and only lands correctly while they are positioned against
 * it too.
 *
 * The docs previews keep the default behaviour. A page of prose has no frame
 * tall enough to hold a drawer, and its examples opt in by supplying one.
 */
function playgroundTheme(mode: ThemeMode): SDSTheme {
  const base = previewTheme(mode);
  const onTheStage = { position: "absolute" } as const;

  return {
    ...base,
    components: {
      ...base.components,
      /**
       * Follows whatever it is dimming for. Left fixed it would dim the browser
       * window around a dialog that is no longer covering it.
       */
      MuiBackdrop: {
        ...base.components?.MuiBackdrop,
        styleOverrides: { root: onTheStage },
      },
      MuiDialog: {
        ...base.components?.MuiDialog,
        styleOverrides: { root: onTheStage },
      },
      MuiDrawer: {
        ...base.components?.MuiDrawer,
        styleOverrides: { paper: onTheStage, root: onTheStage },
      },
      MuiModal: {
        ...base.components?.MuiModal,
        defaultProps: {
          ...base.components?.MuiModal?.defaultProps,
          disablePortal: true,
        },
      },
    },
  };
}

/**
 * Renders the compiled component. It goes through a wrapper rather than being
 * written inline so that the `key` remount lands on the boundary's child,
 * leaving the boundary itself mounted to catch the next failure.
 */
function Example({ of: Rendered }: { of: ComponentType }): ReactElement {
  return <Rendered />;
}

export default Preview;
