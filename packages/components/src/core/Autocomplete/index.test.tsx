import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<Autocomplete />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders AutocompleteBase component", () => {
    render(<Test {...Test.args} />);
    const AutocompleteElement = screen.getByTestId("autocomplete-base");
    expect(AutocompleteElement).not.toBeNull();
  });
});
