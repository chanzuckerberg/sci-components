import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react-webpack5";
import { render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "../__storybook__/index.stories";
import Meta, { Test as TestStory } from "../__storybook__/index.stories";

const Test = composeStory(TestStory, Meta);

describe("<Autocomplete />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders AutocompleteBase component", () => {
    render(<Test {...Test.args} />);
    const AutocompleteElement = screen.getByTestId("autocomplete-base");
    expect(AutocompleteElement).not.toBeNull();
  });
});
