import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<ComplexFilter />", () => {
  generateSnapshots(stories);

  it("renders ComplexFilter component", () => {
    render(<Test {...Test.args} />);
    const ComplexFilterElement = screen.getByTestId("complex-filter");
    expect(ComplexFilterElement).not.toBeNull();
  });

  it("loses the minimal trigger when InputDropdownProps is given", () => {
    const { rerender } = render(<Test {...Test.args} />);
    const minimal = screen.getByRole("button").getAttribute("class");

    // The default is the whole object, not a set of defaults merged into what
    // the caller passes, so setting anything at all drops `sdsStyle: minimal`.
    rerender(<Test {...Test.args} InputDropdownProps={{ disabled: false }} />);

    expect(screen.getByRole("button").getAttribute("class")).not.toBe(minimal);
  });
});
