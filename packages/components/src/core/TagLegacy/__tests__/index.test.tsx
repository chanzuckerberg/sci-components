import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import TagLegacy from "..";

const { Test } = composeStories(stories);

describe("<TagLegacy />", () => {
  generateSnapshots(stories);

  it("renders TagLegacy component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("tags");
    expect(elements.length).toBeTruthy();
  });

  it("paints the pair of custom colors it is given", () => {
    render(
      <TagLegacy label="Custom" color={["rgb(0, 0, 255)", "rgb(255, 0, 0)"]} />
    );

    // The pair is [text, background], and the text color lands on the label
    // rather than on the root.
    const label = screen.getByText("Custom");
    const root = label.parentElement as HTMLElement;

    expect(window.getComputedStyle(root).backgroundColor).toBe(
      "rgb(255, 0, 0)"
    );
    expect(window.getComputedStyle(label).color).toBe("rgb(0, 0, 255)");
  });
});
