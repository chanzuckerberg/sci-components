import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<TooltipTable />", () => {
  generateSnapshots(stories);

  it("renders tooltip component", async () => {
    render(<Test {...Test.args} />);
    const tooltipTableElement = screen.getByTestId("tooltipTable");
    expect(tooltipTableElement).not.toBeNull();
  });

  it("renders two sections if provided two objects of data", () => {
    render(<Test {...Test.args} />);
    const sectionHeaders = screen.getAllByText(/Section/i);
    expect(sectionHeaders).toHaveLength(2);
  });

  it("renders an alert if one is passed", async () => {
    const props = {
      contentAlert: "test",
    };

    render(<Test {...Test.args} {...props} />);
    const contentAlert = screen.getByText(/test/i);
    expect(contentAlert).toBeTruthy();
  });
});
