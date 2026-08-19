import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from "react";

/**
 * Registry of the example apps the documentation renders, shared by the two
 * things that render them: the full previews on a component's page and the
 * miniatures on the Overview page's catalog.
 *
 * They live in three places: alongside the design pages under
 * `design-docs/pages/`, and alongside each component's own code docs under
 * `packages/components/src/core/` and `packages/data-viz/src/core/`. Globs are
 * lazy so every example is code-split into its own chunk instead of shipping
 * with every docs page. Companion CSS is loaded eagerly as raw text (it is only
 * a handful of small files) and injected scoped to the preview, so page-level
 * selectors such as `thead { ... }` cannot leak into the docs page around it.
 */
export const exampleLoaders = {
  ...import.meta.glob<{ default: ComponentType }>(
    "../design-docs/pages/*/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/components/src/core/**/__storybook__/docs/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/data-viz/src/core/**/__storybook__/docs/examples/*.tsx"
  ),
  ...import.meta.glob<{ default: ComponentType }>(
    "../packages/icons/src/__storybook__/docs/examples/*.tsx"
  ),
};

export const sourceLoaders = {
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
  ...import.meta.glob<string>(
    "../packages/icons/src/__storybook__/docs/examples/*.tsx",
    { import: "default", query: "?raw" }
  ),
};

export const exampleStyles = {
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
  ...import.meta.glob<string>(
    "../packages/icons/src/__storybook__/docs/examples/*.css",
    { eager: true, import: "default", query: "?raw" }
  ),
};

/**
 * Resolve an example id to its glob key, minus the file extension. Ids come in
 * four shapes: `<Page>/<Name>` for an example that belongs to a design page,
 * `core/<Component>/<Name>` for one that belongs to a component's code docs,
 * `data-viz/<Component>/<Name>` for one belonging to a chart's code docs, and
 * `icons/<Name>` for one belonging to the icons package, whose documentation is
 * the package itself rather than a component within it. The component part may
 * itself be nested, as in `core/Bases/Typography/<Name>`.
 */
export function modulePath(id: string): string {
  const segments = id.split("/");
  const name = segments[segments.length - 1];
  const component = segments.slice(1, -1).join("/");

  if (segments[0] === "core") {
    return `../packages/components/src/core/${component}/__storybook__/docs/examples/${name}`;
  }

  if (segments[0] === "data-viz") {
    return `../packages/data-viz/src/core/${component}/__storybook__/docs/examples/${name}`;
  }

  if (segments[0] === "icons") {
    return `../packages/icons/src/__storybook__/docs/examples/${name}`;
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
export function scopeCss(css: string, scope: string): string {
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

/**
 * Keeps an example that throws to itself, rather than taking the page it
 * illustrates down with it. What stands in its place is the caller's to decide:
 * a preview says so in as many words, a catalog card falls back to its label.
 */
export class ExampleErrorBoundary extends Component<
  { id: string; children: ReactNode; fallback?: (error: Error) => ReactNode },
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
        this.props.fallback?.(error) ?? (
          <p className="sds-doc-example-error">
            This example failed to render: {error.message}
          </p>
        )
      );
    }
    return this.props.children;
  }
}
