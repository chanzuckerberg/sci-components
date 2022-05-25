import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<InputDropdown />", () => {
  generateSnapshots(snapshotTestStoryFile);

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
