import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<AutocompleteMultiColumn />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders AutocompleteMultiColumn component", () => {
    render(<Test {...Test.args} />);
    const AutocompleteElement = screen.getByTestId("autocomplete-multi-column");
    expect(AutocompleteElement).not.toBeNull();
  });
});
