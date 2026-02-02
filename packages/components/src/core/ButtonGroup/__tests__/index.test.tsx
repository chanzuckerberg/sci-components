import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { cleanup, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

const BUTTON_GROUP_TEST_ID = "button-group";

describe("<ButtonGroup />", () => {
  generateSnapshots(stories);

  it("renders ButtonGroup component", () => {
    render(<Test {...Test.args} />);
    const panelElement = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(panelElement).not.toBeNull();
  });

  it("renders with different size values", () => {
    render(<Test {...Test.args} size="small" />);
    const smallButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(smallButtonGroup).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="medium" />);
    const mediumButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(mediumButtonGroup).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="large" />);
    const largeButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(largeButtonGroup).toBeInTheDocument();
  });

  it("renders with different sdsType values", () => {
    render(<Test {...Test.args} sdsType="primary" />);
    const primaryButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(primaryButtonGroup).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsType="secondary" />);
    const secondaryButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(secondaryButtonGroup).toBeInTheDocument();
  });

  it("renders with different orientation values", () => {
    render(<Test {...Test.args} orientation="horizontal" />);
    const horizontalButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(horizontalButtonGroup).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} orientation="vertical" />);
    const verticalButtonGroup = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(verticalButtonGroup).toBeInTheDocument();
  });

  it("renders with disabled state", () => {
    render(<Test {...Test.args} disabled={true} />);
    const buttonGroupElement = screen.getByTestId(BUTTON_GROUP_TEST_ID);
    expect(buttonGroupElement).toBeInTheDocument();

    // Check that buttons inside the group are disabled
    const buttons = buttonGroupElement.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("renders child buttons correctly", () => {
    render(<Test {...Test.args} />);
    const button1 = screen.getByTestId("button-group-button-1");
    const button2 = screen.getByTestId("button-group-button-2");
    const button3 = screen.getByTestId("button-group-button-3");

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button1).toHaveTextContent("One");
    expect(button2).toHaveTextContent("Two");
    expect(button3).toHaveTextContent("Three");
  });
});
