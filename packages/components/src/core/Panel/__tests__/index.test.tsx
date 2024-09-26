import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";
import Button from "src/core/Button";

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test } = composeStories(stories);

const PaperRootClassName = "MuiPaper-root";
const MuiDrawerAnchorLeftClass = "MuiDrawer-paperAnchorLeft";
const MuiDrawerAnchorRightClass = "MuiDrawer-paperAnchorRight";
const MuiDrawerAnchorBottomClass = "MuiDrawer-paperAnchorBottom";

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
        headerComponent={<p>Header</p>}
        closeButtonComponent={
          <Button
            sdsStyle="icon"
            sdsSize="medium"
            sdsType="secondary"
            icon="ChevronLeft"
            data-testid="panel-close-button"
          />
        }
      />
    );

    // Check if headerComponent is rendered
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
      .getElementsByClassName(PaperRootClassName)[0];
    expect(panelElementPaper).toHaveClass(MuiDrawerAnchorLeftClass);

    rerender(<Test position="right" />);
    panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PaperRootClassName)[0];
    expect(panelElementPaper).toHaveClass(MuiDrawerAnchorRightClass);

    rerender(<Test sdsType="overlay" position="bottom" />);
    panelElementPaper = screen
      .getByTestId("panel")
      .getElementsByClassName(PaperRootClassName)[0];
    expect(panelElementPaper).toHaveClass(MuiDrawerAnchorBottomClass);
  });

  it("calls the onClick handler when close button is clicked", () => {
    const handleClose = jest.fn();

    render(
      <Test
        sdsType="overlay"
        closeButtonOnClick={handleClose}
        headerComponent={<div>Header</div>}
        closeButtonComponent={
          <Button
            sdsStyle="icon"
            sdsSize="medium"
            sdsType="secondary"
            icon="ChevronLeft"
            data-testid="panel-close-button"
          />
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
      .getElementsByClassName(PaperRootClassName)[0];

    // Default props: sdsType should be 'basic' and position should be 'left'
    expect(panelElementPaper).toHaveClass(MuiDrawerAnchorLeftClass);
  });

  it("does not accept position='bottom' for sdsType='basic', should default to position='left'", () => {
    // Render the BasicPanel with an invalid position 'bottom'
    render(<Test sdsType="basic" position="bottom" />);

    const panelElement = screen.getByTestId("panel");

    expect(panelElement).not.toHaveClass(MuiDrawerAnchorBottomClass);
  });
});
