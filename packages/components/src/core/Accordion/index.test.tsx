import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const Test = composeStory(TestStory, Meta);

describe("<Accordion />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders accordion component", () => {
    render(<Test {...Test.args} />);
    const accordionElement = screen.getByTestId("accordion");
    expect(accordionElement).not.toBeNull();
  });

  it("opens accordion when clicked", () => {
    render(<Test />);
    const accordionElement = screen.getByTestId("accordion");
    fireEvent.click(accordionElement);
    expect(
      screen.getAllByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
      )
    ).not.toBeNull();
  });
});
