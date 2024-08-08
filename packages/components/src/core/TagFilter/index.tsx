"use client";

import { ChipProps } from "@mui/material";
import React from "react";
import { StyledTag } from "./style";
import Button from "../Button";

export interface SdsTagFilterProps
  extends Omit<ChipProps, "color" | "variant"> {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
}

export type TagFilterProps = SdsTagFilterProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 */

const TagFilter = (props: SdsTagFilterProps): JSX.Element => {
  return (
    <StyledTag
      role="none presentation"
      {...props}
      deleteIcon={
        <Button
          aria-label="Delete Tag"
          icon="XMark"
          sdsSize="small"
          sdsType="tertiary"
          sdsStyle="icon"
        />
      }
      color="info"
    />
  );
};

export default TagFilter;
