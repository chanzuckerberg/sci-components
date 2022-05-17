import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<TooltipCondensed />", () => {
  // (mmoore): no snapshot of this component. The tooltip can be shown by default, but MUI appends it to the page outside the scope of what `generateSnapshots` captures.

  it("renders components", async () => {
    render(<Test />);
    const tooltipHoverElement = screen.getByTestId("tooltip-hover");
    fireEvent.mouseOver(tooltipHoverElement);
    await screen.findByText("Test");
  });
});
