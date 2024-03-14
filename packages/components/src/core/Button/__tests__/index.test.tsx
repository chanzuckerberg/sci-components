import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<button />", () => {
  generateSnapshots(stories);

  it("renders Button component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("button");
    expect(elements.length).toBeTruthy();
  });
});
