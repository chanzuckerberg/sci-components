import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<CellComponent />", () => {
  generateSnapshots(stories);

  it("renders cellComponent component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("CellComponentA");
    expect(elements).toBeTruthy();
  });

  it("renders child components", async () => {
    render(<Test />);
    const elements = screen.getAllByTestId("Child");
    expect(elements).toHaveLength(5);
  });

  it("renders content at bottom right side", async () => {
    render(<Test />);
    const cellComponentElement = screen.getByTestId("CellComponentA");
    const renderedElement = document.getElementsByClassName(
      cellComponentElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.textAlign).toBe("right");
    expect(style.verticalAlign).toBe("bottom");
  });

  it("renders content at upper left side", async () => {
    render(<Test />);
    const cellComponentElement = screen.getByTestId("CellComponentB");
    const renderedElement = document.getElementsByClassName(
      cellComponentElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.textAlign).toBe("left");
    expect(style.verticalAlign).toBe("top");
  });
});
