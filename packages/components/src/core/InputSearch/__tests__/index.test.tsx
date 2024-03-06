import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<InputSearch />", () => {
  generateSnapshots(stories);

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
