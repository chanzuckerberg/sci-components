import { getSemanticColors } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { act, render, screen } from "@testing-library/react";
import { createRef } from "react";
import ResidueTooltip, {
  ResidueTooltipHandle,
} from "../components/SequenceView/components/ResidueTooltip";
import { ThemeMode, themeForMode } from "../utils/theme";

/**
 * The residue tooltip forces its own surface, so it has to force the text on
 * that surface too. Both colors are asserted on the *inline* style rather than
 * the computed one: the computed value would be satisfied by the SDS Tooltip's
 * own class, which is exactly the rule a host app's cascade can outrank, and
 * did -- leaving white text on the forced-white surface.
 */
function showTooltip(mode: ThemeMode): HTMLElement {
  const ref = createRef<ResidueTooltipHandle>();
  render(
    <ThemeProvider theme={themeForMode(mode)}>
      <ResidueTooltip ref={ref} />
    </ThemeProvider>
  );

  // MUI positions the popper against a real element, so the anchor has to be
  // in the document for the tooltip to open.
  const anchor = document.createElement("span");
  document.body.appendChild(anchor);
  act(() => ref.current?.show(anchor, "N"));

  // `role="tooltip"` sits on MUI's popper wrapper; the styled node that carries
  // the colors is the element inside it.
  const tooltip = screen
    .getByRole("tooltip")
    .querySelector<HTMLElement>(".MuiTooltip-tooltip");
  if (!tooltip) throw new Error("tooltip did not render");

  return tooltip;
}

/** A token as the DOM would report it, which is always `rgb()`. */
function asComputed(color: string): string {
  const probe = document.createElement("div");
  probe.style.backgroundColor = color;
  return probe.style.backgroundColor;
}

describe("residue tooltip", () => {
  it("shows the residue label", () => {
    expect(showTooltip("light")).toHaveTextContent("N");
  });

  for (const mode of ["light", "dark"] as const) {
    const base = getSemanticColors({ theme: themeForMode(mode) })?.base;

    it(`sets both surface and text inline in ${mode} mode`, () => {
      const tooltip = showTooltip(mode);

      expect(tooltip.style.backgroundColor).toBe(
        asComputed(base?.backgroundPrimary as string)
      );
      expect(tooltip.style.color).toBe(asComputed(base?.textPrimary as string));
    });

    it(`keeps the label readable against its surface in ${mode} mode`, () => {
      const tooltip = showTooltip(mode);

      // The color has to be set for the comparison to mean anything: an unset
      // one trivially differs from the surface while rendering invisible.
      expect(tooltip.style.color).not.toBe("");
      expect(tooltip.style.color).not.toBe(tooltip.style.backgroundColor);
    });
  }
});
