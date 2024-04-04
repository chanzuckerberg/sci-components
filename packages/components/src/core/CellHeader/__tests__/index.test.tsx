import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
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
    render(<Test />);
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

  it("renders a sort icon when header is active", async () => {
    render(<Test />);
    const headerCellElement = screen.getByTestId("CellHeader");
    const sortIcon =
      headerCellElement.getElementsByClassName("MuiSvgIcon-root")[0];
    expect(sortIcon).toBeTruthy();
  });
});
