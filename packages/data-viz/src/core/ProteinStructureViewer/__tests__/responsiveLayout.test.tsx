import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
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

/** Opens the rules that only apply once the viewer is wide. */
const WIDE_QUERY = "@containersds-structure-viewer(min-width:880px)";

/**
 * The rules Emotion wrote for one element, whitespace stripped: the ones that
 * apply at every width, and the ones the wide breakpoint adds.
 *
 * Outside production Emotion writes each rule into a style tag of its own, and
 * the tag's text is read rather than its parsed sheet, since jsdom's parser
 * drops the `max()` heights the defaults use. Scoped to the element's own
 * class, because Emotion leaves every earlier test's rules in the document.
 */
function layoutCss(element: HTMLElement): { base: string; wide: string } {
  const scope = `.${element.classList[0]}`;
  const rules = Array.from(document.querySelectorAll("style"), (tag) =>
    (tag.textContent ?? "").replace(/\s+/g, "")
  ).filter((rule) => rule.includes(scope));

  return {
    base: rules.filter((rule) => !rule.startsWith(WIDE_QUERY)).join("\n"),
    wide: rules.filter((rule) => rule.startsWith(WIDE_QUERY)).join("\n"),
  };
}

function renderLayout({
  sequenceViewerHeight,
  showSequenceViewer = true,
}: {
  sequenceViewerHeight?: number | string;
  showSequenceViewer?: boolean;
}) {
  render(
    <ThemeProvider theme={defaultTheme}>
      <ViewerRoot
        data-testid="root"
        sequenceViewerHeight={sequenceViewerHeight}
        showSequenceViewer={showSequenceViewer}
      />
      <LegendOverlay
        data-testid="legend"
        sequenceViewerHeight={sequenceViewerHeight}
        showSequenceViewer={showSequenceViewer}
      />
    </ThemeProvider>
  );

  return {
    legend: layoutCss(screen.getByTestId("legend")),
    root: layoutCss(screen.getByTestId("root")),
  };
}

describe("the viewer's responsive breakpoint", () => {
  it("widens the panel and the legend on the same container query", () => {
    const { legend, root } = renderLayout({});

    // Both rules key off the viewer's container, not the page.
    for (const { base, wide } of [root, legend]) {
      expect(base).not.toMatch(/@media\(min-width:880px\)/);
      expect(wide).toContain(WIDE_QUERY);
    }
  });
});

/**
 * The panel's height is also how far the 3D view above it stops short of the
 * bottom, and where the legend sits, so all three have to move together.
 */
describe("the sequence panel's height", () => {
  it.each([
    ["unset", undefined],
    ["an empty string", ""],
  ])("keeps the defaults, growing on a wide viewer, while %s", (_, height) => {
    const { legend, root } = renderLayout({ sequenceViewerHeight: height });

    expect(root.base).toContain("height:max(104px,30%)!important");
    expect(root.base).toContain("bottom:max(104px,30%)!important");
    expect(legend.base).toContain("bottom:max(104px,30%)");

    expect(root.wide).toContain("height:max(134px,32%)!important");
    expect(root.wide).toContain("bottom:max(134px,32%)!important");
    expect(legend.wide).toContain("bottom:max(134px,32%)");
  });

  it.each([
    ["a CSS length", "40%", "40%"],
    ["a number, as pixels", 200, "200px"],
  ])("holds %s at every width", (_, height, css) => {
    const { legend, root } = renderLayout({ sequenceViewerHeight: height });

    for (const rules of [root.base, root.wide]) {
      expect(rules).toContain(`height:${css}!important`);
      expect(rules).toContain(`bottom:${css}!important`);
    }

    for (const rules of [legend.base, legend.wide]) {
      expect(rules).toContain(`bottom:${css}`);
    }
  });

  it("drops the 3D view and the legend to the bottom edge while the panel is hidden", () => {
    const { legend, root } = renderLayout({
      sequenceViewerHeight: 200,
      showSequenceViewer: false,
    });

    expect(root.base).toContain("display:none!important");

    for (const rules of [root.base, root.wide, legend.base, legend.wide]) {
      expect(rules).toContain("bottom:0");
      expect(rules).not.toContain("bottom:200px");
    }
  });
});
