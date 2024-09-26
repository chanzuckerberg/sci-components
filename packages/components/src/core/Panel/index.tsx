import React from "react";
import { StyledDrawer, StyledHeaderComponent } from "./style";
import { DrawerProps } from "@mui/material";
import PanelHeader from "./components/PanelHeader";
import PanelHeaderClose, {
  PanelHeaderCloseProps,
} from "./components/PanelHeaderClose";

export interface BasicPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType?: "basic"; // Discriminator
  position?: "left" | "right";
  width?: number | string;
}

export interface OverlayPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType?: "overlay"; // Discriminator
  position?: "left" | "right" | "bottom";
  width?: number | string;
  headerComponent?: React.ReactNode;
  closeButtonOnClick?: PanelHeaderCloseProps["onClick"];
  CloseButtonComponent?: PanelHeaderCloseProps["CloseButtonComponent"];
}

// Discriminated Union
export type PanelProps = BasicPanelProps | OverlayPanelProps;

// Type guard to narrow the type
function isOverlayPanelProps(props: PanelProps): props is OverlayPanelProps {
  return props.sdsType === "overlay";
}

export const PANEL_BASIC_MIN_WIDTH = 240;
export const PANEL_OVERLAY_MIN_WIDTH = 320;

/**
 * @see https://mui.com/material-ui/react-drawer/
 */

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { children, sdsType = "basic", position = "left", width } = props;

  const DrawerWidth = width
    ? width
    : sdsType === "basic"
      ? PANEL_BASIC_MIN_WIDTH
      : PANEL_OVERLAY_MIN_WIDTH;
  const DrawerVariant = sdsType === "basic" ? "persistent" : "temporary";

  // (masoudmanson): The basic Panel only supports "left" or "right" positions.
  // If a "bottom" position is provided for a basic Panel, it defaults to "left".
  const DrawerAnchor =
    sdsType === "overlay"
      ? position
      : position === "bottom"
        ? "left"
        : position;

  return (
    <StyledDrawer
      {...props}
      ref={ref}
      anchor={DrawerAnchor}
      variant={DrawerVariant}
      width={DrawerWidth}
    >
      {isOverlayPanelProps(props) && (
        <StyledHeaderComponent>
          {props?.headerComponent && (
            <PanelHeader>{props?.headerComponent}</PanelHeader>
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
