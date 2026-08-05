import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import {
  buildPlaygroundHref,
  type PlaygroundPadding,
} from "../playground/lib/link";
import { CodeFigure } from "./CodeFigure";
import {
  CODE_ACTION_CLASS,
  PREVIEW_CLASS,
  SB_UNSTYLED_CLASS,
} from "./constants";
import {
  ExampleErrorBoundary,
  exampleLoaders,
  exampleStyles,
  modulePath,
  scopeCss,
  sourceLoaders,
} from "./exampleRegistry";
import { previewTheme } from "./previewTheme";
import { useThemeMode } from "./useThemeMode";

/**
 * Themed surface the example renders on. It reproduces the little the original
 * sandbox stylesheets provided (page padding, a smaller `h1`) and takes its
 * background from the SDS theme so previews read correctly in both modes.
 */
const PreviewSurface = styled.div<CommonThemeProps & { padded: boolean }>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      background-color: ${semanticColors?.base?.backgroundPrimary};
      color: ${semanticColors?.base?.textPrimary};
      border: 1px solid ${semanticColors?.base?.divider};
      border-bottom: none;
      border-radius: ${corners?.l}px ${corners?.l}px 0 0;
      overflow: auto;

      /* Containing block for the overlays the previews open, so that a menu is
         placed and measured against this box rather than the page. */
      position: relative;

      /* Stories get this reset from the <CssBaseline /> in .storybook/preview.jsx,
         which docs pages never render. Components count on it: a padded
         \`width: 100%\` content box otherwise overflows its own card. */
      box-sizing: border-box;
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      .app {
        padding: ${props.padded ? "50px" : "0"};
      }
    `;
  }}
`;

/** Room left around an overlay so it does not sit flush against the frame. */
const OVERLAY_GUTTER = 16;

/**
 * How far the overlays a preview opened reach past the room it has for them,
 * above and below.
 *
 * An overlay is positioned rather than laid out, so it contributes nothing to
 * the surface's own height. With an empty div for an anchor, as these examples
 * use, that leaves nothing to hold the frame open and the menu covers whatever
 * follows it. Measuring the overlays gives the surface a height to take.
 *
 * Both directions matter, because a menu that has no room beneath it flips and
 * opens upwards, and the surface would clip it. Room above is made by padding
 * the surface, which carries the anchor down and the overlay with it.
 */
function overlayOverflow(surface: HTMLElement): {
  above: number;
  below: number;
} {
  const box = surface.getBoundingClientRect();
  const overlays = Array.from(
    surface.querySelectorAll<HTMLElement>(".MuiPopper-root")
  ).filter((overlay) => overlay.getBoundingClientRect().height > 0);

  const tops = overlays.map((o) => o.getBoundingClientRect().top);
  const bottoms = overlays.map((o) => o.getBoundingClientRect().bottom);

  const highest = Math.min(box.top, ...tops.map((t) => t - OVERLAY_GUTTER));
  const lowest = Math.max(
    box.top + surface.scrollHeight,
    ...bottoms.map((b) => b + OVERLAY_GUTTER)
  );

  return {
    above: box.top - highest,
    below: lowest - box.top - surface.clientHeight,
  };
}

/**
 * An overlay is mounted and then positioned over the frames following the
 * example's own render, so a single measurement would read it mid-flight. These
 * are the points, in milliseconds, at which the fit is retaken.
 */
const SETTLE_DELAYS = [0, 50, 150, 400, 1000];

/**
 * Reserve room in the preview for the overlays its example opens, so they are
 * framed with it rather than spilling over the prose below.
 *
 * The surface only ever grows, which is what keeps this convergent: each fit
 * moves the overlays it just made room for, prompting another, and with no room
 * left to add the measurements agree and it settles.
 */
function useFitContent(surface: HTMLElement | null): void {
  useEffect(() => {
    if (!surface) return;

    const timers: number[] = [];

    const fit = (): void => {
      const { above, below } = overlayOverflow(surface);

      if (above > 1) {
        const padding = parseFloat(getComputedStyle(surface).paddingTop);
        surface.style.paddingTop = `${padding + above}px`;
      }

      if (below > 1) {
        surface.style.minHeight = `${surface.clientHeight + below}px`;
      }
    };

    const settle = (): void => {
      timers.splice(0).forEach(clearTimeout);
      SETTLE_DELAYS.forEach((delay) =>
        timers.push(window.setTimeout(fit, delay))
      );
    };

    // An overlay opened later, from a click target say, arrives as a new node
    // under the surface.
    const observer = new MutationObserver(settle);
    observer.observe(surface, { childList: true, subtree: true });

    settle();
    window.addEventListener("resize", settle);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener("resize", settle);
    };
  }, [surface]);
}

/** The extracted `App.tsx`, shown below its live preview and collapsible. */
function ExampleSource({
  id,
  padding,
}: {
  id: string;
  padding: ExamplePadding;
}): ReactElement {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const load = sourceLoaders[`${modulePath(id)}.tsx`];
    if (!load) return;

    let active = true;
    void load().then((text) => {
      if (active) setSource(text);
    });

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <CodeFigure
      action={
        source === null ? null : (
          <PlaygroundLink padding={padding} source={source} />
        )
      }
      collapsedByDefault
      code={source}
      label="Source Code"
      language="tsx"
    />
  );
}

/**
 * Opens this example in the playground, with its source already loaded and the
 * same room around it that it has here.
 *
 * The code travels in the link's own fragment, so the playground needs to know
 * nothing about the docs and the docs need no server. In a new tab, because the
 * playground fills the frame and the reader should not lose their place in the
 * page to try something out.
 */
function PlaygroundLink({
  padding,
  source,
}: {
  padding: ExamplePadding;
  source: string;
}): ReactElement {
  const mode = useThemeMode();

  return (
    <a
      className={CODE_ACTION_CLASS}
      href={buildPlaygroundHref(source, { padding, theme: mode })}
      rel="noreferrer"
      target="_blank"
    >
      Open in Playground
    </a>
  );
}

/** The docs' name for the same flag the playground reads out of a link. */
export type ExamplePadding = PlaygroundPadding;

export interface SdsExampleProps {
  /**
   * `<Page>/<Name>` (e.g. `Theming/DarkModeByDefault`),
   * `core/<Component>/<Name>` (e.g. `core/Accordion/DefaultAccordion`), or
   * `data-viz/<Component>/<Name>` (e.g. `data-viz/StackedBarChart/Default`).
   */
  id: string;
  /**
   * How much room the preview leaves around the example. `"none"` suits
   * components that span the full width of a page, such as NavigationHeader,
   * which read as inset boxes rather than page furniture when padded.
   */
  padding?: ExamplePadding;
}

/**
 * Renders one documentation code example as a live preview plus its source. The
 * SDS theme comes from the global Storybook decorator in
 * `.storybook/preview.jsx`, which is all the original sandbox `index.tsx`
 * boilerplate provided.
 */
export function SdsExample({
  id,
  padding = "default",
}: SdsExampleProps): ReactElement {
  const mode = useThemeMode();
  /*
   * Held in state rather than a ref because the theme is built from it: the
   * overlays an example opens are portaled into this node, and a ref would not
   * have told the theme when there was one.
   */
  const [surface, setSurface] = useState<HTMLDivElement | null>(null);
  const theme = useMemo(() => previewTheme(mode, surface), [mode, surface]);
  useFitContent(surface);

  const Example = useMemo(() => {
    const load = exampleLoaders[`${modulePath(id)}.tsx`];
    return load ? lazy(load) : null;
  }, [id]);

  const css = useMemo(() => {
    const raw = exampleStyles[`${modulePath(id)}.css`];
    return raw ? scopeCss(raw, `.${PREVIEW_CLASS}`) : null;
  }, [id]);

  if (!Example) {
    return (
      <p className="sds-doc-example-error">
        Missing example module for <code>{id}</code>.
      </p>
    );
  }

  return (
    <div className={`sds-doc-example-block ${SB_UNSTYLED_CLASS}`}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <PreviewSurface
            className={PREVIEW_CLASS}
            padded={padding === "default"}
            ref={setSurface}
          >
            {css ? <style>{css}</style> : null}
            <ExampleErrorBoundary id={id}>
              <Suspense fallback={null}>
                <Example />
              </Suspense>
            </ExampleErrorBoundary>
          </PreviewSurface>
        </EmotionThemeProvider>
      </ThemeProvider>
      <ExampleSource id={id} padding={padding} />
    </div>
  );
}

export default SdsExample;
