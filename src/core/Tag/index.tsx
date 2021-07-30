import { ChipProps as RawChipProps } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import React from "react";
import { ExtraProps, StyledChip } from "./style";

type TagProps = ExtraProps & RawChipProps;

export { TagProps };

const Tag = (props: TagProps): JSX.Element => {
  const { dismissable } = props;
  if (dismissable) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  } else {
    return <StyledChip {...props} />;
  }
};

export default Tag;
