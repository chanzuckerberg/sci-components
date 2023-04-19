import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<TableHeader />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders row component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("TableHeader");
    expect(elements).toBeTruthy();
  });
});
