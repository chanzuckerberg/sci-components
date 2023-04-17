import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<TableRow />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders row component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("TableRow");
    expect(elements).toBeTruthy();
  });

  it("renders tooltip on hover", async () => {
    render(<Test />);
    const rowElement = screen.getByTestId("TableRow");
    fireEvent.mouseOver(rowElement);
    await screen.findByText("testTooltipTitle");
  });
});
