import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { cleanup, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

const BUTTON_TOGGLE_TEST_ID = "button-toggle";

describe("<ButtonToggleV2 />", () => {
  generateSnapshots(stories);

  it("renders ButtonToggleV2 component", () => {
    render(<Test {...Test.args} />);
    const panelElement = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(panelElement).not.toBeNull();
  });

  it("renders with different size values", () => {
    render(<Test {...Test.args} size="small" />);
    const smallButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(smallButton).toBeInTheDocument();

    // (masoudmanson): cleanup is necessary to avoid having
    // multiple elements with the same test id in the DOM
    cleanup();

    render(<Test {...Test.args} size="medium" />);
    const mediumButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(mediumButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="large" />);
    const largeButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(largeButton).toBeInTheDocument();
  });

  it("renders with different sdsStage values", () => {
    render(<Test {...Test.args} sdsStage="on" />);
    const onStageButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(onStageButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStage="off" />);
    const offStageButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(offStageButton).toBeInTheDocument();
  });

  it("renders with different sdsType values", () => {
    render(<Test {...Test.args} sdsType="primary" />);
    const primaryButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(primaryButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsType="secondary" />);
    const secondaryButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(secondaryButton).toBeInTheDocument();
  });

  it("renders with different sdsStyle values", () => {
    render(<Test {...Test.args} sdsStyle="outline" />);
    const outlineButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(outlineButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStyle="minimal" />);
    const minimalButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(minimalButton).toBeInTheDocument();
  });

  it("renders with disabled state", () => {
    render(<Test {...Test.args} disabled={true} />);
    const disabledButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(disabledButton).toBeDisabled();
  });

  it("renders with startIcon prop", () => {
    render(<Test {...Test.args} startIcon="InfoCircle" />);
    const buttonElement = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with backgroundOnHover prop", () => {
    render(<Test {...Test.args} backgroundOnHover={true} />);
    const buttonElement = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(buttonElement).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} backgroundOnHover={false} />);
    const buttonWithoutHover = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(buttonWithoutHover).toBeInTheDocument();
  });
});
