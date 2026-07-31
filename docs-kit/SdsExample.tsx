import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import {
  Theme,
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import { CodeFigure } from "./CodeFigure";
import { PREVIEW_CLASS, SB_UNSTYLED_CLASS } from "./constants";

/**
 * Registry of the example apps referenced by the `data-example` placeholders in
 * the docs HTML. They live in two places: alongside the design pages under
 * `zeroheight-docs/pages/`, and alongside each component's own code docs under
 * `packages/components/src/core/`. Globs are lazy so every example is code-split
 * into its own chunk instead of shipping with every docs page. Companion CSS is
 * loaded eagerly as raw text (it is only a handful of small files) and injected
 * scoped to the preview, so page-level selectors such as `thead { ... }` cannot
 * leak into the docs page around it.
 */
const exampleLoaders = {
  ...import.meta.glob<{ default: ComponentType }>(
    "../zeroheight-docs/pages/*/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.tsx"
  ),
};
const sourceLoaders = {
  ...import.meta.glob<string>("../zeroheight-docs/pages/*/examples/*.tsx", {
    import: "default",
    query: "?raw",
  }),
  ...import.meta.glob<string>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.tsx",
    { import: "default", query: "?raw" }
  ),
};
const exampleStyles = {
  ...import.meta.glob<string>("../zeroheight-docs/pages/*/examples/*.css", {
    eager: true,
    import: "default",
    query: "?raw",
  }),
  ...import.meta.glob<string>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.css",
    { eager: true, import: "default", query: "?raw" }
  ),
};

type ThemeMode = "light" | "dark";

/**
 * Storybook's toolbar theme, as seen from a docs page. Decorators (and their
 * globals) only wrap stories, so the SDS theme provider from
 * `.storybook/preview.jsx` never reaches MDX docs content; we read the global
 * ourselves and provide the theme around each preview instead.
 */
function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const globals = new URLSearchParams(window.location.search).get("globals");
    return /(?:^|;)theme:dark(?:;|$)/.test(globals ?? "") ? "dark" : "light";
  });

  useEffect(() => {
    const channel = addons.getChannel();
    const onGlobalsUpdated = ({
      globals,
    }: {
      globals?: { theme?: string };
    }): void => {
      if (globals?.theme) setMode(globals.theme === "dark" ? "dark" : "light");
    };

    channel.on(GLOBALS_UPDATED, onGlobalsUpdated);
    return () => channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
  }, []);

  return mode;
}

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
 * two shapes: `<Page>/<Name>` for an example that belongs to a design page, and
 * `core/<Component>/<Name>` for one that belongs to a component's code docs.
 * The component part may itself be nested, as in `core/Bases/Typography/<Name>`.
 */
function modulePath(id: string): string {
  const segments = id.split("/");
  const name = segments[segments.length - 1];

  if (segments[0] === "core") {
    const component = segments.slice(1, -1).join("/");
    return `../packages/components/src/core/${component}/__storybook__/docs/examples/${name}`;
  }

  return `../zeroheight-docs/pages/${segments[0]}/examples/${name}`;
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
        <p className="zeroheight-example-error">
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
      collapsedByDefault
      code={source}
      label="Source Code"
      language="tsx"
    />
  );
}

export type ExamplePadding = "default" | "none";

export interface SdsExampleProps {
  /**
   * `<Page>/<Name>` (e.g. `Theming/DarkModeByDefault`) or
   * `core/<Component>/<Name>` (e.g. `core/Accordion/DefaultAccordion`).
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
  const theme = useMemo(() => Theme(mode), [mode]);

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
      <p className="zeroheight-example-error">
        Missing example module for <code>{id}</code>.
      </p>
    );
  }

  return (
    <div className={`zeroheight-example-block ${SB_UNSTYLED_CLASS}`}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <PreviewSurface
            className={PREVIEW_CLASS}
            padded={padding === "default"}
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
