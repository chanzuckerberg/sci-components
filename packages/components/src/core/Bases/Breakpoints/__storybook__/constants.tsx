import { Breakpoint } from "@mui/material";
import { Breakpoints } from "../../../styles/common/constants/breakpoints";

export const BREAKPOINTS_USAGE: Record<Breakpoint, string> = {
  lg: "Large breakpoint can be used for all large displays.",
  md: "Medium breakpoint will work for small laptops and large-screened tablets.",
  sm: "Small breakpoint will work for mobile devices and small-screened tablets.",
};

// Generate breakpoint ranges dynamically from constants
const generateBreakpointRanges = () => {
  const breakpointEntries = Object.entries(Breakpoints).sort(
    ([, a], [, b]) => a - b
  );
  const ranges: Record<string, string> = {};

  breakpointEntries.forEach(([key, value], index) => {
    if (index === 0) {
      // First breakpoint (smallest) - from 0 to next breakpoint - 1
      const nextValue = breakpointEntries[index + 1]?.[1];
      ranges[key] = nextValue
        ? `${value}px - ${nextValue - 1}px`
        : `>= ${value}px`;
    } else if (index === breakpointEntries.length - 1) {
      // Last breakpoint (largest) - from current value and up
      ranges[key] = `>= ${value}px`;
    } else {
      // Middle breakpoints - from current value to next value - 1
      const nextValue = breakpointEntries[index + 1][1];
      ranges[key] = `${value}px - ${nextValue - 1}px`;
    }
  });

  return ranges as Record<Breakpoint, string>;
};

export const BREAKPOINTS_RANGE: Record<Breakpoint, string> =
  generateBreakpointRanges();
