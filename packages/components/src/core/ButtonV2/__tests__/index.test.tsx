import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { cleanup, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

const BUTTON_TEST_ID = "button";

describe("<ButtonV2 />", () => {
  generateSnapshots(stories);

  it("renders ButtonV2 component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId(BUTTON_TEST_ID);
    expect(elements.length).toBeTruthy();
  });

  it("renders with different size values", () => {
    render(<Test {...Test.args} size="small" />);
    const smallButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(smallButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="medium" />);
    const mediumButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(mediumButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="large" />);
    const largeButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(largeButton).toBeInTheDocument();
  });

  it("renders with different sdsStyle values", () => {
    render(<Test {...Test.args} sdsStyle="solid" />);
    const solidButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(solidButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStyle="outline" />);
    const outlineButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(outlineButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStyle="minimal" />);
    const minimalButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(minimalButton).toBeInTheDocument();
  });

  it("renders with different sdsType values", () => {
    render(<Test {...Test.args} sdsType="primary" />);
    const primaryButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(primaryButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsType="secondary" />);
    const secondaryButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(secondaryButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsType="destructive" />);
    const destructiveButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(destructiveButton).toBeInTheDocument();
  });

  it("renders with disabled state", () => {
    render(<Test {...Test.args} disabled={true} />);
    const disabledButton = screen.getByTestId(BUTTON_TEST_ID);
    expect(disabledButton).toBeDisabled();
  });

  it("renders with startIcon prop", () => {
    render(<Test {...Test.args} startIcon="Download" />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with endIcon prop", () => {
    render(<Test {...Test.args} endIcon="Download" />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with both startIcon and endIcon props", () => {
    render(<Test {...Test.args} startIcon="Download" endIcon="XMark" />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with backgroundOnHover prop", () => {
    render(<Test {...Test.args} backgroundOnHover={true} />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} backgroundOnHover={false} />);
    const buttonWithoutHover = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonWithoutHover).toBeInTheDocument();
  });

  it("renders with children content", () => {
    render(<Test {...Test.args}>Click Me</Test>);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
  });
});
