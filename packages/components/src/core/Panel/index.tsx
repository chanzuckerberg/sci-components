import React from "react";
import { StyledDrawer, StyledHeaderComponent } from "./style";
import PanelHeader from "./components/PanelHeader";
import PanelHeaderClose from "./components/PanelHeaderClose";
import {
  OverlayPanelProps,
  BasicPanelProps,
  PANEL_BASIC_MIN_WIDTH_PX,
  PANEL_OVERLAY_MIN_WIDTH_PX,
  PanelProps,
} from "./Panel.types";

export type { PanelProps, BasicPanelProps, OverlayPanelProps };

// Type guard to narrow the type
function isOverlayPanelProps(props: PanelProps): props is OverlayPanelProps {
  return props.sdsType === "overlay";
}

/**
 * @see https://mui.com/material-ui/react-drawer/
 */

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const {
    children,
    sdsType = "basic",
    position = "left",
    width,
    ModalProps,
  } = props;

  const drawerWidth =
    width ??
    (sdsType === "basic"
      ? PANEL_BASIC_MIN_WIDTH_PX
      : PANEL_OVERLAY_MIN_WIDTH_PX);

  const drawerVariant = sdsType === "basic" ? "persistent" : "temporary";

  // (masoudmanson): The basic Panel only supports "left" or "right" positions.
  // If a "bottom" position is provided for a basic Panel, it defaults to "left".
  const drawerAnchor =
    sdsType === "overlay"
      ? position
      : position === "bottom"
        ? "left"
        : position;

  return (
    /**
     * (masoudmanson): We need the props after {...props} to override any
     * user-defined values. Placing them afterward ensures that our values
     * take priority.
     *
     * For example, the SDS design specifies that a BasicPanel should only be anchored
     * to the left or right. To prevent users from positioning it at the bottom,
     * the 'anchor' prop must always be set to our predefined value.
     */
    <StyledDrawer
      {...props}
      ref={ref}
      anchor={drawerAnchor}
      variant={drawerVariant}
      width={drawerWidth}
      ModalProps={{
        ...ModalProps,
        // (masoudmanson): Set disableEnforceFocus: true to prevent the Drawer from forcing
        // focus on itself. This is necessary for the SDS Panel, as it should not trap focus
        // within itself; users should be able to interact with the rest of the page.
        // However, this prop is not working correctly in MUI v5, causing accessibility (a11y) issues.
        // The issue has been reported to the MUI team, and we are awaiting a fix.
        // In the meantime, the a11y errors can be ignored.
        disableEnforceFocus: true,
        // (masoudmanson): Set disableScrollLock: true to prevent the Drawer from locking
        // the page scroll when it is open. This is necessary for the SDS Panel, as it should
        // not lock the page scroll when it is open.
        disableScrollLock: true,
      }}
      hideBackdrop={true}
    >
      {isOverlayPanelProps(props) && (
        <StyledHeaderComponent>
          {props?.HeaderComponent && (
            <PanelHeader>{props?.HeaderComponent}</PanelHeader>
          )}
          {
            <PanelHeaderClose
              onClick={props?.closeButtonOnClick}
              CloseButtonComponent={props?.CloseButtonComponent}
            />
          }
        </StyledHeaderComponent>
      )}
      {children}
    </StyledDrawer>
  );
});

export default Panel;
