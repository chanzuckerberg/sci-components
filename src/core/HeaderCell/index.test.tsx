import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<HeaderCell />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders header cell component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("HeaderCell");
    expect(elements).toBeTruthy();
  });

  it("renders tooltip on hover", async () => {
    render(<Test />);
    const headerCellElement = screen.getByTestId("HeaderCell");
    fireEvent.mouseOver(headerCellElement);
    await screen.findByText("testTooltipTitle");
  });

  it("renders text at right side", async () => {
    render(<Test />);
    const headerCellElement = screen.getByTestId("HeaderCell");
    const renderedElement = document.getElementsByClassName(
      headerCellElement.className
    )[0];
    const style = window.getComputedStyle(renderedElement);
    expect(style.justifyContent).toBe("flex-end");
  });
});
