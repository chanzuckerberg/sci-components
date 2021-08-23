import {
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
  StyledCheckbox,
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
        // TODO (mlila): replace with sds InputCheckbox class once complete
        <StyledCheckbox
          // TODO (mlila): replace with sds Icon class once complete
          icon={Icon && <Icon fontSize="small" />}
          checkedIcon={CheckedIcon && <CheckedIcon fontSize="small" />}
          checked={selected}
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
  isMultiSelectCheckbox: false,
};

export default MenuItem;
