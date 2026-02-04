import { ButtonProps as RawButtonProps } from "@mui/material";
import { HTMLAttributeAnchorTarget } from "react";

export interface ButtonProps extends RawButtonProps {
  sdsStyle?: "solid" | "outline" | "minimal";
  sdsType?: "primary" | "secondary" | "destructive";
  backgroundOnHover?: boolean;
  backgroundAppearance?: "matchBackground" | "dark";
  target?: HTMLAttributeAnchorTarget;
}
