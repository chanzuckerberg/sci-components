import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const DIALOG_TITLE_TEST_ID = "dialog-title";
const DIALOG_CONTENT_TEST_ID = "dialog-content";
const DIALOG_ACTIONS_TEST_ID = "dialog-actions";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test, TestButtonPositionLeft, TestNoTitleOnClose } =
  composeStories(stories);

describe("<Dialog />", () => {
  generateSnapshots(stories);

  test("Dialog all sizes match the snapshots", () => {
    render(<Test />);

    const titles = screen.getAllByTestId(DIALOG_TITLE_TEST_ID);
    const contents = screen.getAllByTestId(DIALOG_CONTENT_TEST_ID);
    const actions = screen.getAllByTestId(DIALOG_ACTIONS_TEST_ID);

    Array.from(Array(titles.length), (_, index) => index).forEach((index) => {
      expect(titles[index]).toMatchSnapshot();
      expect(contents[index]).toMatchSnapshot();
      expect(actions[index]).toMatchSnapshot();
    });
  });

  it("renders Dialog without title X button", () => {
    render(<TestNoTitleOnClose />);

    const title = screen.getByTestId(DIALOG_TITLE_TEST_ID);

    expect(title).toMatchSnapshot();
  });

  it("renders Dialog left positioned buttons", () => {
    render(<TestButtonPositionLeft />);

    const actions = screen.getByTestId(DIALOG_ACTIONS_TEST_ID);

    expect(actions).toMatchSnapshot();
  });
});
