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
} from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import {
  Theme,
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import { PREVIEW_CLASS, TOGGLE_CLASS } from "./constants";
import { highlightBlock } from "./highlight";

/**
 * Registry of the example apps extracted from the imported ZeroHeight docs (see
 * the `data-example` placeholders in each `content.html`). Globs are lazy so
 * every example is code-split into its own chunk instead of shipping with every
 * docs page. Companion CSS is loaded eagerly as raw text (it is only a handful
 * of small files) and injected scoped to the preview, so page-level selectors
 * such as `thead { ... }` cannot leak into the docs page around it.
 */
const exampleLoaders = import.meta.glob<{ default: ComponentType }>(
  "./pages/*/examples/*.tsx"
);
const sourceLoaders = import.meta.glob<string>("./pages/*/examples/*.tsx", {
  import: "default",
  query: "?raw",
});
const exampleStyles = import.meta.glob<string>("./pages/*/examples/*.css", {
  eager: true,
  import: "default",
  query: "?raw",
});

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
const PreviewSurface = styled.div<CommonThemeProps>`
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

      .app {
        padding: 50px;
      }
    `;
  }}
`;

/** `Accordion/DefaultAccordion` -> `./pages/Accordion/examples/DefaultAccordion`. */
function modulePath(id: string): string {
  const [page, name] = id.split("/");
  return `./pages/${page}/examples/${name}`;
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
      `ZeroHeight example "${this.props.id}" failed to render`,
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
  const [collapsed, setCollapsed] = useState(true);
  const codeRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (source === null || !codeRef.current) return;
    highlightBlock(codeRef.current, { compact: false });
  }, [source]);

  return (
    <figure {...(collapsed ? { "data-collapsed": "" } : {})}>
      <figcaption>
        <button
          type="button"
          className={TOGGLE_CLASS}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((previous) => !previous)}
        >
          Source Code
        </button>
      </figcaption>
      <pre>
        <code className="language-tsx" ref={codeRef}>
          {source ?? ""}
        </code>
      </pre>
    </figure>
  );
}

export interface ZeroheightExampleProps {
  /** `<Page>/<Name>`, e.g. `Accordion/DefaultAccordion`. */
  id: string;
}

/**
 * Renders one imported ZeroHeight code example as a live preview plus its
 * source. The SDS theme comes from the global Storybook decorator in
 * `.storybook/preview.jsx`, which is all the original sandbox `index.tsx`
 * boilerplate provided.
 */
export function ZeroheightExample({
  id,
}: ZeroheightExampleProps): ReactElement {
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
    <div className="zeroheight-example-block">
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <PreviewSurface className={PREVIEW_CLASS}>
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

export default ZeroheightExample;
