import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "../__storybook__/index.stories";
import Meta, { Test as TestStory } from "../__storybook__/index.stories";
import Autocomplete from "..";

const Test = composeStory(TestStory, Meta);

describe("<Autocomplete />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders AutocompleteBase component", () => {
    render(<Test {...Test.args} />);
    const AutocompleteElement = screen.getByTestId("autocomplete-base");
    expect(AutocompleteElement).not.toBeNull();
  });

  it("renders the input a caller passes instead of its own", () => {
    render(
      <Autocomplete
        options={[{ name: "One" }]}
        renderInput={() => <input data-testid="my-input" />}
        search
        value={null}
      />
    );

    // The SDS input comes with its own search and clear buttons, so replacing
    // it takes those with it.
    expect(screen.getByTestId("my-input")).toBeInTheDocument();
    expect(screen.queryByLabelText("search-button")).toBeNull();
  });
});
