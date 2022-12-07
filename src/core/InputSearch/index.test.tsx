import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<InputSearch />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders inputSearch component", () => {
    render(<Test {...Test.args} />);
    const inputSearchRoundElement = screen.getByTestId("inputSearchRound");
    expect(inputSearchRoundElement).not.toBeNull();
    const inputSearchSquareElement = screen.getByTestId("inputSearchSquare");
    expect(inputSearchSquareElement).not.toBeNull();
  });

  it("component fails if missing id or label prop", () => {
    render(<Test />);
    const inputTextElement = screen.queryByTestId("inputSearchFail");
    expect(inputTextElement).toBeNull();
  });

  it("no label is rendered, but component is still accessible", () => {
    render(<Test />);
    const inputSearchElement = screen.getByLabelText("Round Search");
    expect(inputSearchElement).not.toBeNull();
  });

  it("input value updates on change", () => {
    render(<Test />);
    const input = screen.getByLabelText("Round Search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "apple" } });
    expect(input.value).toBe("apple");
  });
});
