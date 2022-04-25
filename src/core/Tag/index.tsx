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

type TagProps = SdsTagProps;

export type { TagProps };

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
            color="primary"
            tagColor={color}
            onDelete={handleDelete}
          />
        )}
      </>
    );
  }
  return <StyledTag {...props} color="primary" tagColor={color} />;
};

export default Tag;
