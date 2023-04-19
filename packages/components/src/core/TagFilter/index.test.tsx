import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<TagFilter />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders TagFilter component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("tag-filter");
    expect(elements.length).toBeTruthy();
  });
});
