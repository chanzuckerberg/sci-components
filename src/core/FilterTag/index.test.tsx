import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<FilterTag />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders FilterTag component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("filter-tag");
    expect(elements.length).toBeTruthy();
  });
});
