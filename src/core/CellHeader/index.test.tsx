import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<CellHeader />", () => {
  generateSnapshots(snapshotTestStoryFile);

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
      headerCellElement.getElementsByClassName("MuiButtonBase-root")[0];
    expect(sortIcon).toBeTruthy();
  });
});
