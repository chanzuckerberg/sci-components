/* eslint-disable sonarjs/no-duplicate-string */
import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

describe("<Popover />", () => {
  generateSnapshots(stories);

  it("renders the trigger button", () => {
    render(<Test {...Test.args} />);
    const trigger = screen.getByTestId("popover-trigger");
    expect(trigger).not.toBeNull();
  });

  it("does not render popover content initially", () => {
    render(<Test {...Test.args} />);
    const content = screen.queryByTestId("popover-content");
    expect(content).toBeNull();
  });

  it("opens the popover when the trigger is clicked", () => {
    render(<Test {...Test.args} />);
    const trigger = screen.getByTestId("popover-trigger");
    fireEvent.click(trigger);

    const content = screen.getByTestId("popover-content");
    expect(content).not.toBeNull();
    expect(content).toHaveTextContent("Popover content");
  });
});
