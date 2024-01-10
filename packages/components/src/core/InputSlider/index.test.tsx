import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputSlider />", () => {
  generateSnapshots(stories);

  it("renders InputSlider component", () => {
    render(<Test {...Test.args} />);
    const InputSliderElement = screen.getByTestId("test-input-slider");
    expect(InputSliderElement).not.toBeNull();
  });
});
