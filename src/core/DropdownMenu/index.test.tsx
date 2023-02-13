import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<DropdownMenu />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders DropdownMenu component", () => {
    render(<Test {...Test.args} />);
    const DropdownMenuElement = screen.getByTestId("dropdown-menu");
    expect(DropdownMenuElement).not.toBeNull();
  });

  it("opens the menu on click", () => {
    render(<Test {...Test.args} />);
    const InputDropdownElement = screen.getByTestId("dropdown-menu");
    fireEvent.click(InputDropdownElement);
    expect(screen.getAllByText("Status: confirmed")).not.toBeNull();
  });
});
