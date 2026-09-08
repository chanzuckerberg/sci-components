import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render } from "@testing-library/react";
import { LegendOverlay } from "../components/StructureLegend/style";
import { ViewerRoot } from "../style";

/**
 * The legend sits just above the sequence panel, so the two have to widen on
 * the same signal. The panel is sized against the viewer's own size container;
 * a legend that answered to the browser viewport instead would part company
 * with it in exactly the case the container exists for - a viewer narrower
 * than the page it is embedded in.
 *
 * jsdom resolves neither query, so this reads the rules Emotion emitted.
 */

/** Every rule Emotion injected, whitespace stripped. */
function injectedCss(): string {
  return Array.from(document.querySelectorAll("style"))
    .flatMap((tag) =>
      Array.from(tag.sheet?.cssRules ?? []).map((rule) => rule.cssText)
    )
    .join("\n")
    .replace(/\s+/g, "");
}

describe("the viewer's responsive breakpoint", () => {
  it("widens the panel and the legend on the same container query", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewerRoot showSequenceViewer />
        <LegendOverlay showSequenceViewer />
      </ThemeProvider>
    );

    const css = injectedCss();

    // Both rules key off the viewer's container, not the page.
    expect(css).not.toMatch(/@media\(min-width:880px\)/);
    expect(
      css.match(/@containersds-structure-viewer\(min-width:880px\)/g)
    ).toHaveLength(2);
  });
});
