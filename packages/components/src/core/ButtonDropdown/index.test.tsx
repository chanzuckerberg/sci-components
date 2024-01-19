import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<ButtonDropdown />", () => {
  generateSnapshots(stories);

  it("renders ButtonDropdown component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("button-dropdown");
    expect(elements.length).toBeTruthy();
  });
});
