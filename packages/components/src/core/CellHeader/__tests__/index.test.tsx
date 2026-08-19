import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<CellHeader />", () => {
  generateSnapshots(stories);

  it("renders header cell component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("CellHeader");
    expect(elements).toBeTruthy();
  });

  it("renders tooltip on hover", async () => {
    render(<Test hover={true} />);
    const headerCellElement = screen.getByTestId("CellHeader");
    fireEvent.mouseOver(headerCellElement);
    await screen.findByText("testTooltipTitle");
  });

  it("renders text at right side", async () => {
    render(<Test />);
    const headerCellElement = screen.getByTestId("CellHeader");
    const style = window.getComputedStyle(headerCellElement as Element);
    expect(style.textAlign).toBe("right");
  });

  it("renders a sort icon when header is active and hover is true", async () => {
    render(<Test hover={true} />);
    const headerCellElement = screen.getByTestId("CellHeader");
    const sortIcon =
      headerCellElement.getElementsByClassName("MuiSvgIcon-root")[0];
    expect(sortIcon).toBeTruthy();
  });

  it("renders as a th, and as whatever else it is told", () => {
    const { rerender } = render(<Test />);
    expect(screen.getByTestId("CellHeader").tagName).toBe("TH");

    rerender(<Test as="td" />);
    expect(screen.getByTestId("CellHeader").tagName).toBe("TD");
  });

  it("passes width through to the cell", () => {
    render(<Test width={240} />);
    expect(screen.getByTestId("CellHeader").getAttribute("width")).toBe("240");
  });

  it("shows no tooltip while hover is false", async () => {
    render(<Test hover={false} />);

    fireEvent.mouseOver(screen.getByTestId("CellHeader"));

    expect(screen.queryByText("testTooltipTitle")).toBeNull();
  });

  it("draws no sort icon while hover is false", () => {
    render(<Test hover={false} />);
    const cell = screen.getByTestId("CellHeader");
    expect(cell.getElementsByClassName("MuiSvgIcon-root")).toHaveLength(0);
  });
});
