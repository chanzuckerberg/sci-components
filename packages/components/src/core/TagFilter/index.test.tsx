import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Test } = composeStories(stories);

describe("<TagFilter />", () => {
  generateSnapshots(stories);

  it("renders TagFilter component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("tag-filter");
    expect(elements.length).toBeTruthy();
  });
});
