import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Default as DefaultStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Default = composeStory(DefaultStory, Meta);

describe("<Notification />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders notification component", async () => {
    render(<Default {...Default.args} />);
    const notificationElement = screen.getByText(/This is a notification!/i);
    expect(notificationElement).not.toBeNull();
  });
});
