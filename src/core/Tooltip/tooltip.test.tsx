import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<Tooltip />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders tooltip component", async () => {
    render(<Test {...Test.args} title="I am a tooltip" />);
    const tooltipElement = screen.getByTestId("tooltip");
    expect(tooltipElement).not.toBeNull();
  });

  it("does not render when no title content provided", () => {
    render(<Test {...Test.args} title="" />);
    const tooltipElement = screen.queryByTestId("tooltip");
    expect(tooltipElement).toBeNull();
  });

  it("renders children even when it does not render a tooltip", () => {
    render(<Test {...Test.args} title="" />);
    const child = screen.getByText("I am a tooltip child element");
    expect(child).not.toBeNull();
  });
});
