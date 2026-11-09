import { generateSnapshots } from "@chanzuckerberg/story-utils";
import styled from "@emotion/styled";
import { AtlasIcon } from "@czi-sds/icons";
import { DownloadSimpleIcon, XIcon } from "@phosphor-icons/react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import Icon from "@components/src/core/Icon";
import { isIconOnlyChild } from "../style";
import * as stories from "../__storybook__/index.stories";

const { Test } = composeStories(stories);

const StyledXIcon = styled(XIcon)`
  color: red;
`;

const BUTTON_TEST_ID = "button";

describe("<Button />", () => {
  generateSnapshots(stories);

  it("renders Button component", () => {
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
    render(<Test {...Test.args} startIcon={<DownloadSimpleIcon />} />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with endIcon prop", () => {
    render(<Test {...Test.args} endIcon={<DownloadSimpleIcon />} />);
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with both startIcon and endIcon props", () => {
    render(
      <Test
        {...Test.args}
        startIcon={<DownloadSimpleIcon />}
        endIcon={<XIcon />}
      />
    );
    const buttonElement = screen.getByTestId(BUTTON_TEST_ID);
    expect(buttonElement.querySelectorAll("svg")).toHaveLength(2);
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

describe("isIconOnlyChild", () => {
  it("recognizes a Phosphor icon", () => {
    expect(isIconOnlyChild(<XIcon />)).toBe(true);
  });

  it("recognizes an @czi-sds/icons icon", () => {
    expect(isIconOnlyChild(<AtlasIcon />)).toBe(true);
  });

  it("recognizes a styled Phosphor icon", () => {
    expect(isIconOnlyChild(<StyledXIcon />)).toBe(true);
  });

  it("recognizes the deprecated SDS Icon and a raw svg", () => {
    expect(isIconOnlyChild(<Icon sdsIcon="XMark" sdsSize="s" />)).toBe(true);
    expect(isIconOnlyChild(<svg />)).toBe(true);
  });

  it("rejects text, other elements, and an icon next to a label", () => {
    expect(isIconOnlyChild("Label")).toBe(false);
    expect(isIconOnlyChild(<span>Label</span>)).toBe(false);
    expect(isIconOnlyChild([<XIcon key="icon" />, "Label"])).toBe(false);
  });
});
