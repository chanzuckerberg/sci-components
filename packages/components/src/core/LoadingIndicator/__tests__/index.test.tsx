import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { render } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<LoadingIndicator />", () => {
  generateSnapshots(stories);

  it("renders loading indicator component", () => {
    const { container } = render(<Test />);
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
