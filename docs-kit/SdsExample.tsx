import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import {
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import { buildPlaygroundHref } from "../playground/lib/link";
import { CodeFigure } from "./CodeFigure";
import {
  CODE_ACTION_CLASS,
  PREVIEW_CLASS,
  SB_UNSTYLED_CLASS,
} from "./constants";
import { previewTheme } from "./previewTheme";
import { useThemeMode } from "./useThemeMode";

/**
 * Registry of the example apps referenced by the `data-example` placeholders in
 * the docs HTML. They live in three places: alongside the design pages under
 * `design-docs/pages/`, and alongside each component's own code docs under
 * `packages/components/src/core/` and `packages/data-viz/src/core/`. Globs are
 * lazy so every example is code-split into its own chunk instead of shipping
 * with every docs page. Companion CSS is loaded eagerly as raw text (it is only
 * a handful of small files) and injected scoped to the preview, so page-level
 * selectors such as `thead { ... }` cannot leak into the docs page around it.
 */
const exampleLoaders = {
  ...import.meta.glob<{ default: ComponentType }>(
    "../design-docs/pages/*/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/data-viz/src/core/**/__storybook__/docs/examples/*.tsx"
  ),
};
const sourceLoaders = {
  ...import.meta.glob<string>("../design-docs/pages/*/examples/*.tsx", {
    import: "default",
    query: "?raw",
  }),
  ...import.meta.glob<string>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.tsx",
    { import: "default", query: "?raw" }
  ),
  ...import.meta.glob<string>(
    "../packages/data-viz/src/core/**/__storybook__/docs/examples/*.tsx",
    { import: "default", query: "?raw" }
  ),
};
const exampleStyles = {
  ...import.meta.glob<string>("../design-docs/pages/*/examples/*.css", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  ...import.meta.glob<string>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.css",
    { eager: true, import: "default", query: "?raw" }
  ),
  ...import.meta.glob<string>(
    "../packages/data-viz/src/core/**/__storybook__/docs/examples/*.css",
    { eager: true, import: "default", query: "?raw" }
  ),
};

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

/**
 * Resolve an example id to its glob key, minus the file extension. Ids come in
 * three shapes: `<Page>/<Name>` for an example that belongs to a design page,
 * `core/<Component>/<Name>` for one that belongs to a component's code docs,
 * and `data-viz/<Component>/<Name>` for one belonging to a chart's code docs.
 * The component part may itself be nested, as in `core/Bases/Typography/<Name>`.
 */
function modulePath(id: string): string {
  const segments = id.split("/");
  const name = segments[segments.length - 1];
  const component = segments.slice(1, -1).join("/");

  if (segments[0] === "core") {
    return `../packages/components/src/core/${component}/__storybook__/docs/examples/${name}`;
  }

  if (segments[0] === "data-viz") {
    return `../packages/data-viz/src/core/${component}/__storybook__/docs/examples/${name}`;
  }

  return `../design-docs/pages/${segments[0]}/examples/${name}`;
}

function findMatchingBrace(css: string, start: number): number {
  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return css.length - 1;
}

/**
 * Prefix every top-level selector with `scope`. The example stylesheets were
 * written for a standalone CodeSandbox page, so they contain bare element
 * selectors; scoping keeps them from styling the rest of the docs page. Nested
 * selectors are left untouched — the browser resolves them against the scoped
 * parent.
 */
function scopeCss(css: string, scope: string): string {
  let scoped = "";
  let index = 0;

  while (index < css.length) {
    const braceStart = css.indexOf("{", index);
    if (braceStart === -1) break;

    const prelude = css.slice(index, braceStart).trim();
    const braceEnd = findMatchingBrace(css, braceStart);
    const body = css.slice(braceStart + 1, braceEnd);

    if (prelude.startsWith("@")) {
      scoped += `${prelude} {${scopeCss(body, scope)}}\n`;
    } else if (prelude !== "") {
      const selectors = prelude
        .split(",")
        .map((selector) => `${scope} ${selector.trim()}`)
        .join(", ");
      scoped += `${selectors} {${body}}\n`;
    }

    index = braceEnd + 1;
  }

  return scoped;
}

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
function useFitContent(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const surface = ref.current;
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
  }, [ref]);
}

class ExampleErrorBoundary extends Component<
  { id: string; children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(
      `Docs example "${this.props.id}" failed to render`,
      error,
      info
    );
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <p className="sds-doc-example-error">
          This example failed to render: {error.message}
        </p>
      );
    }
    return this.props.children;
  }
}

/** The extracted `App.tsx`, shown below its live preview and collapsible. */
function ExampleSource({ id }: { id: string }): ReactElement {
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
      action={source === null ? null : <PlaygroundLink source={source} />}
      collapsedByDefault
      code={source}
      label="Source Code"
      language="tsx"
    />
  );
}

/**
 * Opens this example in the playground, with its source already loaded.
 *
 * The code travels in the link's own fragment, so the playground needs to know
 * nothing about the docs and the docs need no server. In a new tab, because the
 * playground fills the frame and the reader should not lose their place in the
 * page to try something out.
 */
function PlaygroundLink({ source }: { source: string }): ReactElement {
  const mode = useThemeMode();

  return (
    <a
      className={CODE_ACTION_CLASS}
      href={buildPlaygroundHref(source, mode)}
      rel="noreferrer"
      target="_blank"
    >
      Open in Playground
    </a>
  );
}

export type ExamplePadding = "default" | "none";

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
  const theme = useMemo(() => previewTheme(mode), [mode]);
  const surfaceRef = useRef<HTMLDivElement>(null);
  useFitContent(surfaceRef);

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
            ref={surfaceRef}
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
      <ExampleSource id={id} />
    </div>
  );
}

export default SdsExample;
