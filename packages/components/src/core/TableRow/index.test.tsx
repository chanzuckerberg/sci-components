import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<TableRow />", () => {
  generateSnapshots(stories);

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
