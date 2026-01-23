import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { cleanup, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

const BUTTON_DROPDOWN_TEST_ID = "button-dropdown";

describe("<ButtonDropdownV2 />", () => {
  generateSnapshots(stories);

  it("renders ButtonDropdownV2 component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(elements.length).toBeTruthy();
  });

  it("renders with different size values", () => {
    render(<Test {...Test.args} size="small" />);
    const smallButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(smallButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="medium" />);
    const mediumButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(mediumButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} size="large" />);
    const largeButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(largeButton).toBeInTheDocument();
  });

  it("renders with different sdsStyle values", () => {
    render(<Test {...Test.args} sdsStyle="solid" />);
    const solidButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(solidButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStyle="outline" />);
    const outlineButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(outlineButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsStyle="minimal" />);
    const minimalButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(minimalButton).toBeInTheDocument();
  });

  it("renders with different sdsType values", () => {
    render(<Test {...Test.args} sdsType="primary" />);
    const primaryButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(primaryButton).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} sdsType="secondary" />);
    const secondaryButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(secondaryButton).toBeInTheDocument();
  });

  it("renders with disabled state", () => {
    render(<Test {...Test.args} disabled={true} />);
    const disabledButton = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(disabledButton).toBeDisabled();
  });

  it("renders with startIcon prop", () => {
    render(<Test {...Test.args} startIcon="Download" />);
    const buttonElement = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with backgroundOnHover prop", () => {
    render(<Test {...Test.args} backgroundOnHover={true} />);
    const buttonElement = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(buttonElement).toBeInTheDocument();

    cleanup();

    render(<Test {...Test.args} backgroundOnHover={false} />);
    const buttonWithoutHover = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(buttonWithoutHover).toBeInTheDocument();
  });

  it("renders with children content", () => {
    render(<Test {...Test.args}>Dropdown Label</Test>);
    const buttonElement = screen.getByTestId(BUTTON_DROPDOWN_TEST_ID);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Dropdown Label");
  });
});
