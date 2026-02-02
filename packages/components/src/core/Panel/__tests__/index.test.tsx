import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react-webpack5";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import Button from "src/core/Button";
import Icon from "src/core/Icon";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

const PAPER_ROOT_CLASS_NAME = "MuiPaper-root";
const MUI_DRAWER_ANCHOR_LEFT_CLASS_NAME = "MuiDrawer-paperAnchorLeft";
const MUI_DRAWER_ANCHOR_RIGHT_CLASS_NAME = "MuiDrawer-paperAnchorRight";
const MUI_DRAWER_ANCHOR_BOTTOM_CLASS_NAME = "MuiDrawer-paperAnchorBottom";

describe("<Panel />", () => {
  generateSnapshots(stories);

  it("renders panel component", () => {
    render(<Test {...Test.args} />);
    const panelElement = screen.getByTestId("panel");
    expect(panelElement).not.toBeNull();
  });

  it("renders with overlay header and close button when sdsType is 'overlay'", () => {
    render(
      <Test
        sdsType="overlay"
        HeaderComponent={<p>Header</p>}
        CloseButtonComponent={
          <Button
            sdsStyle="minimal"
            size="large"
            sdsType="secondary"
            data-testid="panel-close-button"
          >
            <Icon sdsIcon="ChevronLeft" sdsSize="l" />
          </Button>
        }
      />
    );

    // Check if HeaderComponent is rendered
    const headerElement = screen.getByText("Header");
    expect(headerElement).toBeInTheDocument();

    // Check if close button is rendered
    const closeButton = screen.getByTestId("panel-close-button");
    expect(closeButton).toBeInTheDocument();
  });

  it("renders without header when sdsType is 'basic'", () => {
    render(<Test sdsType="basic" />);

    // The header component should not be rendered for 'basic' panels
    const headerElement = screen.queryByText("Header");
    expect(headerElement).not.toBeInTheDocument();
  });

  it("applies the correct position based on the 'position' prop", () => {
    const { rerender } = render(<Test position="left" />);

    let panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PAPER_ROOT_CLASS_NAME)[0];
    expect(panelElementPaper).toHaveClass(MUI_DRAWER_ANCHOR_LEFT_CLASS_NAME);

    rerender(<Test position="right" />);
    panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PAPER_ROOT_CLASS_NAME)[0];
    expect(panelElementPaper).toHaveClass(MUI_DRAWER_ANCHOR_RIGHT_CLASS_NAME);

    rerender(<Test sdsType="overlay" position="bottom" />);
    panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PAPER_ROOT_CLASS_NAME)[0];
    expect(panelElementPaper).toHaveClass(MUI_DRAWER_ANCHOR_BOTTOM_CLASS_NAME);
  });

  it("calls the onClick handler when close button is clicked", () => {
    const handleClose = jest.fn();

    render(
      <Test
        sdsType="overlay"
        closeButtonOnClick={handleClose}
        HeaderComponent={<div>Header</div>}
        CloseButtonComponent={
          <Button
            sdsStyle="minimal"
            size="large"
            sdsType="secondary"
            data-testid="panel-close-button"
          >
            <Icon sdsIcon="ChevronLeft" sdsSize="l" />
          </Button>
        }
      />
    );

    const closeButton = screen.getByTestId("panel-close-button");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders with default 'sdsType' and 'position' props", () => {
    render(<Test />);

    const panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PAPER_ROOT_CLASS_NAME)[0];

    // Default props: sdsType should be 'basic' and position should be 'left'
    expect(panelElementPaper).toHaveClass(MUI_DRAWER_ANCHOR_LEFT_CLASS_NAME);
  });

  it("does not accept position='bottom' for sdsType='basic', should default to position='left'", () => {
    // Render the BasicPanel with an invalid position 'bottom'
    render(<Test sdsType="basic" position="bottom" />);

    const panelElement = screen.getByTestId("panel");

    expect(panelElement).not.toHaveClass(MUI_DRAWER_ANCHOR_BOTTOM_CLASS_NAME);
  });
});
