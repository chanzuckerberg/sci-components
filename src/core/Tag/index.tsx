import { Clear } from "@mui/icons-material";
import { ChipProps } from "@mui/material";
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
  tagColor?:
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

type TagProps = SdsTagProps;

export type { TagProps };

const Tag = (props: SdsTagProps): JSX.Element => {
  const { onDelete, color } = props;

  const newProps = { ...props };
  newProps.tagColor = color;
  newProps.sdsType = props.sdsType || "primary";

  if (onDelete) {
    return <StyledTag {...newProps} color="primary" deleteIcon={<Clear />} />;
  }
  return <StyledTag {...newProps} color="primary" />;
};

export default Tag;
