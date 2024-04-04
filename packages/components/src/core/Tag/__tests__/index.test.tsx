import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<Tag />", () => {
  generateSnapshots(stories);

  it("renders Tags component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("tags");
    expect(elements.length).toBeTruthy();
  });
});
