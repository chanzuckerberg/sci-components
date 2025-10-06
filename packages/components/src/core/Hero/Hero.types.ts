/* eslint-disable sonarjs/no-duplicate-string */
import { ReactNode } from "react";

export interface HeroProps {
  heroHeight?: string;
  children?: ReactNode;
  overlayContainerMinMargin?: {
    small: number;
    medium: number;
    large: number;
  };
  headerText?: string;
  headerFontSize?: "s" | "m" | "l";
  captionText?: string;
  textAlignment?: "left" | "center" | "right";
  hasInvertTextColor?: boolean;
  overlayContentWidth?: string;
  overlayContentPosition?:
    | "top-left"
    | "top"
    | "top-right"
    | "left"
    | "center"
    | "right"
    | "bottom-left"
    | "bottom"
    | "bottom-right";
  darkeningMask?: boolean;
  darkeningMaskColor?: string;
  darkeningMaskOpacity?: number;
  darkeningVignette?: boolean;
  overlayMedia?: ReactNode;
  overlayMediaPosition?:
    | "top-left"
    | "top"
    | "top-right"
    | "left"
    | "center"
    | "right"
    | "bottom-left"
    | "bottom"
    | "bottom-right";
  overlayMediaMaxHeight?: string;
  overlayMediaMaxWidth?: string;
  overlayMediaMargin?:
    | string
    | {
        small: string;
        medium: string;
        large: string;
      };
}

export const HeroMargins = {
  SMALL: 24,
  MEDIUM: 40,
  LARGE: 120,
} as const;

export const textAlignmentMapping = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
} as const;

export const overlayContentPositionAlignMapping = {
  "top-left": "flex-start",
  top: "center",
  "top-right": "flex-end",
  left: "flex-start",
  center: "center",
  right: "flex-end",
  "bottom-left": "flex-start",
  bottom: "center",
  "bottom-right": "flex-end",
} as const;

export const overlayContentPositionJustifyMapping = {
  "top-left": "flex-start",
  top: "flex-start",
  "top-right": "flex-start",
  left: "center",
  center: "center",
  right: "center",
  "bottom-left": "flex-end",
  bottom: "flex-end",
  "bottom-right": "flex-end",
} as const;
