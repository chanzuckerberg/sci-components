import { ChipProps } from "@mui/material";
import React from "react";
import { SdsTagColorType, StyledTag } from "./style";

export interface SdsTagProps extends Omit<ChipProps, "color"> {
  label: string;
  sdsStyle?: "rounded" | "square";
  sdsType?: "primary" | "secondary";
  color?: SdsTagColorType;
}

export type TagProps = SdsTagProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 *
 * @props color: {string}                   - applies color for tag based on default theme color values
 *               [string, string]           - applies custom colors for [font, background]
 *               [string, string, string]   - applies custom colors for [font, background, icon]
 */
const Tag = (props: SdsTagProps): JSX.Element => {
  const { color } = props;

  return <StyledTag tagColor={color} {...props} color="primary" />;
};

export default Tag;
