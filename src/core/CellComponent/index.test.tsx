import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
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

  it("renders content at left side", async () => {
    render(<Test />);
    const cellComponentElement = screen.getByTestId("CellComponentA");
    const renderedElement = document.getElementsByClassName(
      cellComponentElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.justifyContent).toBe("flex-start");
    expect(style.display).toBe("flex");
  });

  it("renders content at right side", async () => {
    render(<Test />);
    const cellComponentElement = screen.getByTestId("CellComponentB");
    const renderedElement = document.getElementsByClassName(
      cellComponentElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.justifyContent).toBe("flex-end");
    expect(style.display).toBe("flex");
  });
});
