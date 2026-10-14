import { DrawerProps, SlideProps } from "@mui/material";
import { PanelHeaderCloseProps } from "./components/PanelHeaderClose";

/**
 * An overlay Panel slides in on MUI's `Slide`, which takes a `container` to
 * measure that slide against. MUI types the transition slot against the generic
 * transition interface, which knows nothing of it, and leaves this interface
 * open for the component that does — so the prop is declared here.
 *
 * A Panel rendered into a box rather than the page needs it. Without one the
 * slide is measured against the window and the panel spends most of its
 * animation outside the frame it was given.
 */
declare module "@mui/material/Drawer" {
  interface DrawerTransitionSlotPropsOverrides {
    container?: SlideProps["container"];
  }
}

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

/**
 * (masoudmanson): The SDS theme shortens MUI's global transition durations to
 * 20ms in and 10ms out, which suits small elements but is too brief for a surface
 * as large as a Panel: it arrives before the eye can follow it in, so it reads as
 * a jump rather than a slide. The Panel therefore keeps MUI's own drawer timings
 * instead of the SDS ones. Pass `transitionDuration` to change or remove the
 * animation, e.g. `transitionDuration={0}` or `{ enter: 300, exit: 200 }`.
 */
export const PANEL_TRANSITION_DURATION_MS = {
  enter: 225,
  exit: 195,
};
