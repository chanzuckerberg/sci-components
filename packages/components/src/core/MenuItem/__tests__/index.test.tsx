import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<MenuItem />", () => {
  generateSnapshots(stories);

  it("renders menu item component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("MenuItem");
    expect(elements).toBeTruthy();
  });
});
