import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import ChainHeader, {
  ChainHeaderProps,
} from "../components/SequenceView/components/ChainHeader";

/**
 * The caption above one chain's residue grid. It renders inside the React root
 * Mol* owns, so the viewer's own tests cannot reach it - it is mounted directly
 * here instead.
 */
function renderHeader(props: Partial<ChainHeaderProps> = {}) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <ChainHeader
        chainId="B"
        isHidden={false}
        isSelected={false}
        label="B"
        onSelect={() => undefined}
        onToggle={() => undefined}
        {...props}
      />
    </ThemeProvider>
  );
}

describe("<ChainHeader />", () => {
  it("names the chain and offers to select it", () => {
    renderHeader();

    const name = screen.getByRole("button", { name: "Chain B" });
    expect(name).toBeInTheDocument();
    expect(name).toHaveAttribute("aria-pressed", "false");
  });

  it("reports the chain when its name is clicked", () => {
    const onSelect = vi.fn();
    renderHeader({ onSelect });

    fireEvent.click(screen.getByRole("button", { name: "Chain B" }));

    expect(onSelect).toHaveBeenCalledWith("B");
  });

  it("marks the name as pressed while the chain is selected", () => {
    renderHeader({ isSelected: true });

    expect(screen.getByRole("button", { name: "Chain B" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("reports the chain when the visibility toggle is clicked", () => {
    const onToggle = vi.fn();
    renderHeader({ onToggle });

    fireEvent.click(screen.getByRole("button", { name: "Hide chain B" }));

    expect(onToggle).toHaveBeenCalledWith("B");
  });

  it("offers to show the chain again once hidden", () => {
    renderHeader({ isHidden: true });

    expect(
      screen.getByRole("button", { name: "Show chain B" })
    ).toBeInTheDocument();
  });

  /**
   * A hidden chain draws nothing, so there is nothing to select: the focus
   * would resolve to no geometry and be dropped again. The name stops being
   * clickable rather than accepting a click that goes nowhere.
   */
  describe("while the chain is hidden", () => {
    it("disables the name", () => {
      renderHeader({ isHidden: true });

      expect(screen.getByRole("button", { name: "Chain B" })).toBeDisabled();
    });

    it("does not report a selection when the name is clicked", () => {
      const onSelect = vi.fn();
      renderHeader({ isHidden: true, onSelect });

      fireEvent.click(screen.getByRole("button", { name: "Chain B" }));

      expect(onSelect).not.toHaveBeenCalled();
    });

    it("leaves the visibility toggle working, which is the way back", () => {
      const onToggle = vi.fn();
      renderHeader({ isHidden: true, onToggle });

      const toggle = screen.getByRole("button", { name: "Show chain B" });
      expect(toggle).toBeEnabled();

      fireEvent.click(toggle);

      expect(onToggle).toHaveBeenCalledWith("B");
    });

    it("enables the name again once the chain is shown", () => {
      renderHeader({ isHidden: false });

      expect(screen.getByRole("button", { name: "Chain B" })).toBeEnabled();
    });
  });

  /**
   * The name is a toggle, so the tooltip has to say which way the next click
   * goes. Offering to select a chain that is already selected would be telling
   * the reader the wrong thing.
   *
   * Only the subtitle is asserted, which is the half that turns on state.
   * Under jsdom the SDS Tooltip puts just its subtitle in the popper - its
   * title renders alongside in a browser, where the full `Chain: B` caption
   * was checked by hand - so matching the title here would be pinning a quirk
   * of the environment rather than anything this component decides.
   */
  async function tooltipText(): Promise<string> {
    fireEvent.mouseOver(screen.getByRole("button", { name: "Chain B" }));
    const tip = await screen.findByRole("tooltip");
    return tip.textContent ?? "";
  }

  it("offers to select a chain that is not selected", async () => {
    renderHeader();

    expect(await tooltipText()).toContain("Click to select Chain B");
  });

  it("offers to deselect the chain once it is selected", async () => {
    renderHeader({ isSelected: true });

    expect(await tooltipText()).toContain("Click to deselect Chain B");
  });

  it("leaves the caption inert when nothing is listening", () => {
    renderHeader({ onSelect: undefined, onToggle: undefined });

    // No toggle at all, and clicking the name is a no-op rather than a crash.
    expect(
      screen.queryByRole("button", { name: "Hide chain B" })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Chain B" }));
  });
});
