import { defaultTheme, getSemanticColors } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import {
  EmptyState,
  SequencePanel,
  SequenceScroller,
} from "../components/SequenceView/style";

/**
 * `sequenceViewerBackgroundColor` reaches the panel through Mol*'s own React
 * root, which never starts under jsdom, so the surfaces are rendered directly
 * here instead. What matters is that the override reaches all three of them and
 * that each falls back to its own theme token without one.
 */
const CUSTOM = "rgb(1, 2, 3)";

function paint(node: ReactElement): HTMLElement {
  render(<ThemeProvider theme={defaultTheme}>{node}</ThemeProvider>);
  return screen.getByTestId("surface");
}

/** The token as jsdom would report it, which is always `rgb()`. */
function asComputed(color: string): string {
  const probe = document.createElement("div");
  probe.style.backgroundColor = color;
  return probe.style.backgroundColor;
}

/** Every rule Emotion injected, whitespace stripped. */
function injectedCss(): string {
  return Array.from(document.querySelectorAll("style"))
    .flatMap((tag) =>
      Array.from(tag.sheet?.cssRules ?? []).map((r) => r.cssText)
    )
    .join("\n")
    .replace(/\s+/g, "");
}

describe("sequence panel surfaces", () => {
  const base = getSemanticColors({ theme: defaultTheme })?.base;

  it("paints the panel with the theme surface by default", () => {
    const panel = paint(<SequencePanel data-testid="surface" />);

    expect(getComputedStyle(panel).backgroundColor).toBe(
      asComputed(base?.surfacePrimary as string)
    );
  });

  it("paints the empty state with its own theme surface by default", () => {
    const empty = paint(<EmptyState data-testid="surface" />);

    expect(getComputedStyle(empty).backgroundColor).toBe(
      asComputed(base?.surfaceSecondary as string)
    );
  });

  it("overrides the panel", () => {
    const panel = paint(
      <SequencePanel backgroundColor={CUSTOM} data-testid="surface" />
    );

    expect(getComputedStyle(panel).backgroundColor).toBe(CUSTOM);
  });

  it("overrides the empty state", () => {
    const empty = paint(
      <EmptyState backgroundColor={CUSTOM} data-testid="surface" />
    );

    expect(getComputedStyle(empty).backgroundColor).toBe(CUSTOM);
  });

  it("does not leak the styling prop onto the DOM", () => {
    const panel = paint(
      <SequencePanel backgroundColor={CUSTOM} data-testid="surface" />
    );

    expect(panel.getAttribute("backgroundColor")).toBeNull();
    expect(panel.getAttribute("backgroundcolor")).toBeNull();
  });

  it("starts the scroll fade from the override", () => {
    // The fade masks residues scrolling under the header, so it has to begin
    // at whatever the panel is painted with. jsdom does not resolve
    // pseudo-element styles, hence reading the injected rule.
    paint(<SequenceScroller backgroundColor={CUSTOM} data-testid="surface" />);

    const css = injectedCss();

    expect(css).toContain("::before");
    expect(css).toContain(`${CUSTOM.replace(/\s+/g, "")},transparent)`);
  });
});
