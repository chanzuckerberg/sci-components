import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputCheckbox />", () => {
  generateSnapshots(stories);

  it("renders checkbox component", () => {
    render(<Test {...Test.args} />);
    const checkboxElement = screen.getByTestId("checkbox");
    expect(checkboxElement).not.toBeNull();
  });

  it("renders checkbox with label component", () => {
    render(<Test {...Test.args} />);
    const checkboxElement = screen.getByTestId("labelCheckbox");
    expect(checkboxElement).not.toBeNull();
  });

  it("renders checkbox with caption", () => {
    render(<Test {...Test.args} />);
    const captionElement = screen.findAllByText("Caption");
    expect(captionElement).not.toBeNull();
  });
});
