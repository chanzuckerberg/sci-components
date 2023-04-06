import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<CellBasic />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

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
