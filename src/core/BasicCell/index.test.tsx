import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<BasicCell />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders basic cell component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("BasicCell");
    expect(elements).toBeTruthy();
  });

  it("renders tooltip on hover", async () => {
    render(<Test />);
    const basicCellElement = screen.getByTestId("BasicCell");
    fireEvent.mouseOver(basicCellElement);
    await screen.findByText("testTooltipTitle");
  });

  it("renders text at right side", async () => {
    render(<Test />);
    const basicCellElement = screen.getByTestId("BasicCell");
    const renderedElement = document.getElementsByClassName(
      basicCellElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.textAlign).toBe("right");
  });
});
