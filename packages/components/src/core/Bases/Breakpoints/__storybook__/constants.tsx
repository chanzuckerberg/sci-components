import { Breakpoint } from "@mui/material";

export const BREAKPOINTS_USAGE: Record<Breakpoint, string> = {
  lg: "Large breakpoint can be used for all large displays.",
  md: "Medium breakpoint will work for small laptops and large-screened tablets.",
  sm: "Small breakpoint will work for mobile devices and small-screened tablets.",
};

export const BREAKPOINTS_RANGE: Record<Breakpoint, string> = {
  lg: "> 1024px",
  md: "512px - 1023px",
  sm: "0px - 511px",
};
