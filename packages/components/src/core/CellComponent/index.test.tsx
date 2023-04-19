import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<CellComponent />", () => {
  generateSnapshots(snapshotTestStoryFile);

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
