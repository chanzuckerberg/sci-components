import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

describe("<Tooltip />", () => {
  generateSnapshots(stories);

  it("renders tooltip component", async () => {
    render(<Test {...Test.args} title="I am a tooltip" />);
    const tooltipElement = screen.getByTestId("tooltip");
    expect(tooltipElement).not.toBeNull();
  });

  it("does not render when no title content provided", () => {
    render(<Test {...Test.args} title="" />);
    const tooltipElement = screen.queryByTestId("tooltip");
    expect(tooltipElement).toBeNull();
  });

  it("renders children even when it does not render a tooltip", () => {
    render(<Test {...Test.args} title="" />);
    const child = screen.getByText("I am a tooltip child element.");
    expect(child).not.toBeNull();
  });
});
