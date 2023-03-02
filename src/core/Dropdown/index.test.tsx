import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import LoadingIndicator from "../LoadingIndicator";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<Dropdown />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders Dropdown component", () => {
    render(<Test {...Test.args} />);
    const DropdownElement = screen.getByTestId("dropdown");
    expect(DropdownElement).not.toBeNull();
  });

  it("renders loading indicator when loading state passed in", () => {
    const args = {
      ...Test.args,
      DropdownMenuProps: {
        loading: true,
        loadingText: (
          <>
            <LoadingIndicator sdsStyle="minimal" />
          </>
        ),
      },
      multiple: true,
      options: [],
    };

    render(<Test {...args} />);

    const DropdownElement = screen.getByTestId("dropdown");
    expect(DropdownElement).not.toBeNull();

    fireEvent.click(DropdownElement);
    expect(screen.getAllByText("Loading")).not.toBeNull();
  });
});
