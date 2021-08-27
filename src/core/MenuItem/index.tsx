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
  const { children, column, isMultiSelect, ...originalMenuItemProps } = props;
  const { selected = false } = originalMenuItemProps as MenuItemProps;

  return (
    <StyledMenuItem {...(originalMenuItemProps as unknown)}>
      {isMultiSelect && (
        // TODO (mlila): replace with sds InputCheckbox class once complete
        <StyledCheck
          // TODO (mlila): replace with sds Icon class once complete
          selected={selected}
          color="primary"
        />
      )}

      <ContentWrapper>
        <TextWrapper selected={selected} className="primary-text">
          {children}
        </TextWrapper>
        {column && <ColumnWrapper>{column}</ColumnWrapper>}
      </ContentWrapper>
    </StyledMenuItem>
  );
});

MenuItem.defaultProps = {
  column: null,
  isMultiSelect: false,
};

export default MenuItem;
