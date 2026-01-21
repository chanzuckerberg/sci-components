import { ButtonProps as RawButtonProps } from "@mui/material";

export interface ButtonNewProps extends RawButtonProps {
  sdsStyle?: "solid" | "outline" | "minimal";
  sdsType?: "primary" | "secondary" | "destructive";
  backgroundOnHover?: boolean;
}
