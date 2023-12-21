import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputDropdown />", () => {
  generateSnapshots(stories);

  it("renders InputDropdown component", () => {
    render(<Test {...Test.args} />);
    const InputDropdownElement = screen.getByTestId("InputDropdown");
    expect(InputDropdownElement).not.toBeNull();
  });

  it("opens the menu on click", () => {
    render(<Test {...Test.args} />);
    const InputDropdownElement = screen.getByTestId("InputDropdown");
    fireEvent.click(InputDropdownElement);
    expect(screen.getAllByText("Menu Item 1")).not.toBeNull();
  });
});
