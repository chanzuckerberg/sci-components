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

const SLOT_PROPS = {
  backdrop: {
    invisible: true,
  },
  // (masoudmanson): From MUI v6+, the temporary Drawer's paper renders with
  // `role="dialog"` and `aria-modal="true"`, which requires an accessible name.
  // Provide a default `aria-label` so the Panel doesn't trigger the
  // `aria-dialog-name` accessibility violation. Consumers can override it via
  // `slotProps.paper`.
  paper: {
    "aria-label": "Panel",
  },
};

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
    isBackdropClickEnabled = false,
    slotProps: userSlotProps,
    ...rest
  } = props;

  // Merge the SDS default slot props with any consumer-provided slot props so
  // overrides (e.g. a custom `aria-label`/`aria-labelledby` on the paper slot)
  // still take effect while preserving the SDS defaults.
  const mergedSlotProps = {
    ...SLOT_PROPS,
    ...userSlotProps,
    backdrop: {
      ...SLOT_PROPS.backdrop,
      ...(typeof userSlotProps?.backdrop === "object"
        ? userSlotProps.backdrop
        : {}),
    },
    paper: {
      ...SLOT_PROPS.paper,
      ...(typeof userSlotProps?.paper === "object" ? userSlotProps.paper : {}),
    },
  };

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
      {...rest}
      ref={ref}
      sdsType={sdsType}
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
      slotProps={mergedSlotProps}
      hideBackdrop={!isBackdropClickEnabled}
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
