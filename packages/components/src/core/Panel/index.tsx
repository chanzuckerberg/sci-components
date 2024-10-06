import React from "react";
import { StyledDrawer, StyledHeaderComponent } from "./style";
import { DrawerProps } from "@mui/material";
import PanelHeader from "./components/PanelHeader";
import PanelHeaderClose, {
  PanelHeaderCloseProps,
} from "./components/PanelHeaderClose";

export interface BasicPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType: "basic"; // Discriminator
  position?: "left" | "right";
  width?: number | string;
}

export interface OverlayPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType: "overlay"; // Discriminator
  position?: "left" | "right" | "bottom";
  width?: number | string;
  HeaderComponent?: React.ReactNode;
  closeButtonOnClick?: PanelHeaderCloseProps["onClick"];
  CloseButtonComponent?: PanelHeaderCloseProps["CloseButtonComponent"];
}

// Discriminated Union
export type PanelProps = BasicPanelProps | OverlayPanelProps;

// Type guard to narrow the type
function isOverlayPanelProps(props: PanelProps): props is OverlayPanelProps {
  return props.sdsType === "overlay";
}

export const PANEL_BASIC_MIN_WIDTH_PX = 240;
export const PANEL_OVERLAY_MIN_WIDTH_PX = 320;

/**
 * @see https://mui.com/material-ui/react-drawer/
 */

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { children, sdsType = "basic", position = "left", width } = props;

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
