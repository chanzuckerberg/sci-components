import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<Notification />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders notification component", () => {
    render(<Test {...Test.args} />);
    const notificationElement = screen.getByTestId("notification");
    expect(notificationElement).not.toBeNull();
  });

  it("renders button if buttonOnClick is passed", () => {
    const props = {
      buttonOnClick: () => {},
      buttonText: "click me",
    };
    render(<Test {...Test.args} {...props} />);
    const notificationButton = screen.getByText(/click me/i);
    expect(notificationButton).toBeTruthy();
  });

  it("dismisses on click on close button if present", async () => {
    const props = {
      onClose: () => {},
    };

    render(<Test {...Test.args} {...props} />);
    const dismissButton = screen.getByTestId("notificationCloseButton");
    dismissButton.click();

    await waitForElementToBeRemoved(() => screen.getByTestId("notification"));
  });
});
