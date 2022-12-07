import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<TooltipTable />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders tooltip component", async () => {
    render(<Test {...Test.args} />);
    const tooltipTableElement = screen.getByTestId("tooltipTable");
    expect(tooltipTableElement).not.toBeNull();
  });

  it("renders two sections if provided two objects of data", () => {
    render(<Test {...Test.args} />);
    const sectionHeaders = screen.getAllByText(/Section/i);
    expect(sectionHeaders).toHaveLength(2);
  });

  it("renders an alert if one is passed", async () => {
    const props = {
      contentAlert: "test",
    };

    render(<Test {...Test.args} {...props} />);
    const contentAlert = screen.getByText(/test/i);
    expect(contentAlert).toBeTruthy();
  });
});
