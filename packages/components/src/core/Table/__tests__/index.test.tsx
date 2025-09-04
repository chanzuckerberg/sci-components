import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Table />", () => {
  generateSnapshots(stories);

  it("renders table component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("Table");
    expect(elements).toBeTruthy();
  });

  it("renders table component children", async () => {
    render(<Test />);
    await screen.findByText("Primary 1");
  });
});
