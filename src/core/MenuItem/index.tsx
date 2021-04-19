import {
  Checkbox,
  Icon as RawIcon,
  IconTypeMap,
  MenuItemProps as RawMenuItemProps,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Check, CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import React, { forwardRef } from "react";
import {
  ColumnWrapper,
  ContentWrapper,
  StyledMenuItem,
  TextWrapper,
} from "./style";

export interface ExtraProps {
  column?: React.ReactNode;
  isMultiSelect?: boolean;
  isMultiSelectCheckbox?: boolean;
}

export type MenuItemProps = ExtraProps & RawMenuItemProps;

const MenuItem = forwardRef((props: MenuItemProps, _) => {
  const {
    children,
    column,
    isMultiSelect,
    isMultiSelectCheckbox,
    ...originalMenuItemProps
  } = props;

  const { selected = false } = originalMenuItemProps as MenuItemProps;

  let Icon:
    | OverridableComponent<IconTypeMap<Record<string, unknown>, "span">>
    | OverridableComponent<IconTypeMap<Record<string, unknown>, "svg">>
    | null = null;
  let CheckedIcon;

  if (isMultiSelect) {
    Icon = RawIcon;
    CheckedIcon = Check;
  } else if (isMultiSelectCheckbox) {
    Icon = CheckBoxOutlineBlank as OverridableComponent<
      IconTypeMap<Record<string, unknown>, "svg">
    >;
    CheckedIcon = CheckBox;
  }

  const hasCheckbox = isMultiSelect || isMultiSelectCheckbox;

  return (
    <StyledMenuItem {...(originalMenuItemProps as unknown)}>
      {hasCheckbox && (
        <Checkbox
          icon={Icon && <Icon fontSize="small" />}
          checkedIcon={CheckedIcon && <CheckedIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
          color="primary"
        />
      )}

      <ContentWrapper>
        <TextWrapper selected={selected}>{children}</TextWrapper>
        {column && <ColumnWrapper>{column}</ColumnWrapper>}
      </ContentWrapper>
    </StyledMenuItem>
  );
});

MenuItem.defaultProps = {
  column: null,
  isMultiSelect: false,
  isMultiSelectCheckbox: false,
};

export default MenuItem;
