import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputText />", () => {
  generateSnapshots(stories);

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
