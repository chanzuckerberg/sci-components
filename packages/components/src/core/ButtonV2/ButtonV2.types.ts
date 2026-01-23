import { ButtonProps as RawButtonProps } from "@mui/material";

export interface ButtonV2Props extends RawButtonProps {
  sdsStyle?: "solid" | "outline" | "minimal";
  sdsType?: "primary" | "secondary" | "destructive";
  backgroundOnHover?: boolean;
  backgroundAppearance?: "matchBackground" | "dark";
}
