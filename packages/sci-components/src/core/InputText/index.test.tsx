import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { StoryFileExports } from "@chanzuckerberg/story-utils/build/getStories";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<InputText />", () => {
  generateSnapshots<StoryFileExports<typeof Meta>, typeof Meta>(
    snapshotTestStoryFile
  );

  it("renders inputText component", () => {
    render(<Test {...Test.args} />);
    const inputTextElement = screen.getByTestId("inputTextBase");
    expect(inputTextElement).not.toBeNull();
  });

  it("component fails if missing id or label prop", () => {
    render(<Test />);
    const inputTextElement = screen.queryByTestId("inputTextFail");
    expect(inputTextElement).toBeNull();
  });

  it("hides label is hideLabel is true, but aria-label is still set", () => {
    render(<Test />);
    const inputTextElement = screen.getByLabelText("Hidden Label");
    expect(inputTextElement).not.toBeNull();
  });

  it("renders text area if sdsType is set to 'textArea'", () => {
    render(<Test />);
    const inputTextAreaElement = screen.getByTestId("inputTextArea");
    expect(inputTextAreaElement).not.toBeNull();
  });
});
