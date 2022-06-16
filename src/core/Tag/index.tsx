import { ChipProps } from "@material-ui/core";
import React from "react";
import { StyledTag } from "./style";

export interface SdsTagProps extends Omit<ChipProps, "color"> {
  label: string;
  sdsStyle?: "rounded" | "square";
  sdsType?: "primary" | "secondary";
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "gray"
    | "beta"
    | [string, string]
    | [string, string, string];
}

export type TagProps = SdsTagProps;

/**
 * @see https://v4.mui.com/components/chips/
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
