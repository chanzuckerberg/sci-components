import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { cleanup, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import { SDS_WARNINGS, SDSWarningTypes } from "src/common/warnings";

const { Test } = composeStories(stories);

const BUTTON_TOGGLE_TEST_ID = "button-toggle";

describe("<ButtonToggle />", () => {
  generateSnapshots(stories);

  it("renders ButtonToggle component", () => {
    render(<Test {...Test.args} />);
    const panelElement = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(panelElement).not.toBeNull();
  });

  it("renders with different sdsSize values", () => {
    render(<Test {...Test.args} sdsSize="small" />);
    const smallButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(smallButton).toBeInTheDocument();

    // (masoudmanson): cleanup is necessary to avoid having
    // multiple elements with the same test id in the DOM
    cleanup();

    render(<Test {...Test.args} sdsSize="large" />);
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

  it("displays warning when icon is missing", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    render(<Test {...Test.args} icon={undefined} />);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        SDS_WARNINGS[SDSWarningTypes.ButtonToggleMissingIconProp].message
      )
    );
    warnSpy.mockRestore();
  });

  it("displays an error when an icon doesn't support the ButtonToggle size", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    // (masoudmanson): SlidersHorizontal icon doesn't support the small size
    // make sure to change this to another icon if the SlidersHorizontal icon is updated
    const SdsIconWithoutSmallSize = "SlidersHorizontal";
    render(
      <Test {...Test.args} sdsSize="small" icon={SdsIconWithoutSmallSize} />
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `Error: Icon ${SdsIconWithoutSmallSize} not found for size s. This is a @czi-sds/components problem.`
      )
    );
    errorSpy.mockRestore();
  });

  it("renders with disabled state", () => {
    render(<Test {...Test.args} disabled={true} />);
    const disabledButton = screen.getByTestId(BUTTON_TOGGLE_TEST_ID);
    expect(disabledButton).toBeDisabled();
  });
});
