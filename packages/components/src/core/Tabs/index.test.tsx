import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<Tabs />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders Tabs component", () => {
    render(<Test />);

    const elements = screen.getAllByTestId("tabs");

    expect(elements.length).toBeTruthy();
  });

  it("renders tab texts", () => {
    render(<Test />);

    const Label1 = screen.getAllByText(/Tab One/i);
    const Label2 = screen.getAllByText(/Tab Two/i);

    expect(Label1.length).toBeTruthy();
    expect(Label2.length).toBeTruthy();
  });
});
