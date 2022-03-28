import { MenuItemProps as RawMenuItemProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import {
  ColumnWrapper,
  ContentWrapper,
  StyledCheck,
  StyledMenuItem,
  TextWrapper,
} from "./style";

export interface ExtraProps {
  column?: React.ReactNode;
  isMultiSelect?: boolean;
}

export type MenuItemProps = ExtraProps & RawMenuItemProps;

const MenuItem = forwardRef((props: MenuItemProps, _) => {
  const {
    children,
    column = null,
    disabled,
    isMultiSelect = false,
    ...originalMenuItemProps
  } = props;
  const { selected = false } = originalMenuItemProps as MenuItemProps;

  return (
    <StyledMenuItem {...(originalMenuItemProps as unknown)} disabled={disabled}>
      {isMultiSelect && (
        // TODO (mlila): replace with sds InputCheckbox class once complete
        <StyledCheck selected={selected} color="primary" />
      )}

      <ContentWrapper>
        <TextWrapper
          selected={selected}
          className="primary-text"
          disabled={disabled}
        >
          {children}
        </TextWrapper>
        {column && <ColumnWrapper disabled={disabled}>{column}</ColumnWrapper>}
      </ContentWrapper>
    </StyledMenuItem>
  );
});

export default MenuItem;
