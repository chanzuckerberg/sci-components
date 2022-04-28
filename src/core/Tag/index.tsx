import { ChipProps } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useState } from "react";
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
 * @see: https://v4.mui.com/components/chips/
 *
 * @props color: {string}                   - applies color for tag based on default theme color values
 *               [string, string]           - applies custom colors for [font, background]
 *               [string, string, string]   - applies custom colors for [font, background, icon]
 */
const Tag = (props: SdsTagProps): JSX.Element => {
  const { onDelete, color } = props;
  const [visible, setVisible] = useState(true);

  const handleDelete = (event: React.SyntheticEvent<Element, Event>) => {
    setVisible(false);
    if (onDelete) onDelete(event);
  };

  if (onDelete) {
    return (
      <>
        {visible && (
          <StyledTag
            {...props}
            deleteIcon={<ClearIcon fontSize="small" />}
            tagColor={color}
            onDelete={handleDelete}
            {...props}
            color="primary"
          />
        )}
      </>
    );
  }
  return <StyledTag tagColor={color} {...props} color="primary" />;
};

export default Tag;
