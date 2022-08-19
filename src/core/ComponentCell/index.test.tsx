import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<ComponentCell />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders component cell component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("ComponentCellA");
    expect(elements).toBeTruthy();
  });

  it("renders component at left side", async () => {
    render(<Test />);
    const componentCellElement = screen.getByTestId("ComponentCellA");
    const renderedElement = document.getElementsByClassName(
      componentCellElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.justifyContent).toBe("flex-start");
    expect(style.display).toBe("flex");
  });

  it("renders component at right side", async () => {
    render(<Test />);
    const componentCellElement = screen.getByTestId("ComponentCellB");
    const renderedElement = document.getElementsByClassName(
      componentCellElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.justifyContent).toBe("flex-end");
    expect(style.display).toBe("flex");
  });
});
