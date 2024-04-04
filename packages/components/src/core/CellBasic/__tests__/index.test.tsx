import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<CellBasic />", () => {
  generateSnapshots(stories);

  it("renders cell basic component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("CellBasic");
    expect(elements).toBeTruthy();
  });

  it("renders tooltip on hover", async () => {
    render(<Test />);
    const cellBasicElement = screen.getByTestId("CellBasic");
    fireEvent.mouseOver(cellBasicElement);
    await screen.findByText("testTooltipTitle");
  });

  it("renders text at right side", async () => {
    render(<Test />);
    const cellBasicElement = screen.getByTestId("CellBasic");
    const renderedElement = document.getElementsByClassName(
      cellBasicElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.textAlign).toBe("right");
  });

  it("renders text at the bottom", async () => {
    render(<Test />);
    const cellBasicElement = screen.getByTestId("CellBasicVerticalAlignTest");
    const renderedElement = document.getElementsByClassName(
      cellBasicElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.verticalAlign).toBe("bottom");
  });

  it("renders icon with a basic cell", async () => {
    render(<Test />);
    const cellBasicElement = screen.getByTestId("CellBasicWithIcon");
    const iconElement = cellBasicElement.getElementsByTagName("svg");
    expect(iconElement).toBeTruthy();
  });
});
