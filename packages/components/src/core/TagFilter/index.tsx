import { ChipProps } from "@mui/material";
import React from "react";
import { StyledTag } from "./style";
import ButtonIcon from "../ButtonIcon";

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
      {...props}
      deleteIcon={
        <ButtonIcon icon="XMark" sdsSize="small" sdsType="tertiary" />
      }
      color="info"
    />
  );
};

export default TagFilter;
