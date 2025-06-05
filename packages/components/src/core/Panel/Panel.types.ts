import { DrawerProps } from "@mui/material";
import { PanelHeaderCloseProps } from "./components/PanelHeaderClose";

export interface BasicPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType: "basic"; // Discriminator
  position?: "left" | "right";
  width?: number | string;
  isBackdropClickEnabled?: boolean;
}

export interface OverlayPanelProps extends Omit<DrawerProps, "variant"> {
  sdsType: "overlay"; // Discriminator
  position?: "left" | "right" | "bottom";
  width?: number | string;
  HeaderComponent?: React.ReactNode;
  closeButtonOnClick?: PanelHeaderCloseProps["onClick"];
  CloseButtonComponent?: PanelHeaderCloseProps["CloseButtonComponent"];
  isBackdropClickEnabled?: boolean;
}

// Discriminated Union
export type PanelProps = BasicPanelProps | OverlayPanelProps;

export const PANEL_BASIC_MIN_WIDTH_PX = 240;
export const PANEL_OVERLAY_MIN_WIDTH_PX = 320;
