import { ChipProps } from "@mui/material";
import React from "react";
import { StyledTag } from "./style";
import ButtonV2 from "../ButtonV2";
import Icon from "../Icon";

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
        <ButtonV2
          aria-label="Delete Tag"
          sdsStyle="minimal"
          sdsType="secondary"
          size="medium"
          backgroundOnHover={false}
        >
          <Icon sdsIcon="XMark" sdsSize="s" />
        </ButtonV2>
      }
      color="info"
    />
  );
};

export default TagFilter;
