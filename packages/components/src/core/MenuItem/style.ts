import { MenuItem, menuItemClasses, MenuItemProps } from "@mui/material";
import styled from "@emotion/styled";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { fontBodyXs } from "@components/src/core/styles/common/mixins/fonts";
import {
  CommonThemeProps,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "@components/src/core/styles";

export interface MenuItemExtraProps extends CommonThemeProps, MenuItemProps {}

export const StyledMenuItem = styled(MenuItem)`
  ${(props: MenuItemExtraProps) => {
    const { selected } = props;
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.xxs}px ${spaces?.xs}px !important;
      border-radius: ${corners?.m}px;
      min-height: unset;
      opacity: 1;

      &.MuiAutocomplete-option {
        min-height: unset;
      }

      &.MuiButtonBase-root {
        background-color: transparent;
        opacity: 1;

        &:hover, &.${menuItemClasses.focusVisible} {
          background-color: ${semanticColors?.base?.fillPrimaryInteraction};

          &[aria-selected="true"] {
            background-color: ${semanticColors?.base?.fillPrimaryInteraction};
          }
        }
      }

      &.${menuItemClasses.root} svg {
        align-self: flex-start;
      }

      &.${menuItemClasses.root} .${menuItemClasses.disabled} {
        opacity: 1 !important;
      }

      &.MuiAutocomplete-option[aria-selected="true"] {
        background-color: unset !important;

        &:hover {
          background-color: ${semanticColors?.base?.fillPrimaryInteraction} !important;
        }

        ${StyledCheckIcon}, ${StyledMinusIcon}, ${DotIcon} {
          color: ${selected ? semanticColors?.base?.ornamentPrimary : semanticColors?.base?.ornamentSecondary};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        ${StyledCheckIcon}, ${StyledMinusIcon}, ${DotIcon} {
          color: ${selected ? semanticColors?.base?.ornamentPrimary : semanticColors?.base?.ornamentSecondary};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: ${semanticColors?.base?.surfacePrimary};
        &:hover {
          background-color: ${semanticColors?.base?.fillPrimaryInteraction};
        }
      }

      &:active {
        ${StyledCheckIcon}, ${StyledMinusIcon}, ${DotIcon} {
          color: ${semanticColors?.base?.ornamentPrimary};
        }

        &:active {
          ${StyledCheckIcon}, ${StyledMinusIcon}, ${DotIcon} {
            color: ${semanticColors?.base?.ornamentPrimary};
          }
        }
      }
    `;
  }}
`;

export const ContentWrapper = styled("span")`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

interface DisabledType extends CommonThemeProps {
  disabled?: boolean;
}

const disabledStyles = (props: DisabledType) => {
  const { disabled } = props;
  if (!disabled) return ``;

  const semanticColors = getSemanticColors(props);

  return `
    color: ${semanticColors?.base?.textDisabled};
    cursor: default;
  `;
};

interface TextWrapperProps extends CommonThemeProps {
  disabled?: boolean;
  selected: boolean;
}

export const TextWrapper = styled("span")`
  ${fontBodyXs}

  ${(props: TextWrapperProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      display: flex;
      white-space: pre-wrap;
    `;
  }}

  ${disabledStyles}
`;

interface MenuItemIconProps extends CommonThemeProps {
  disabled?: boolean;
}

export const StyledMenuItemIcon = styled("span")`
  ${(props: MenuItemIconProps) => {
    const { disabled } = props;
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);
    const disabledColor = semanticColors?.base?.ornamentDisabled;

    return `
      margin-right: ${spaces?.xs}px;
      margin-top: ${spaces?.xxxs}px;
      height: ${iconSizes?.s.height}px;
      color: ${semanticColors?.accent?.ornament};

      svg {
        height: ${iconSizes?.s.height}px;
        width: ${iconSizes?.s.width}px;
        ${disabled ? `color: ${disabledColor}; fill: ${disabledColor};` : ""}
      }
    `;
  }}
`;

interface ColumnWrapperProps extends CommonThemeProps {
  disabled?: boolean;
}

export const ColumnWrapper = styled("span")`
  ${fontBodyXs}

  ${(props: ColumnWrapperProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      text-align: right;
      color: ${semanticColors?.base?.textPrimary};
      margin-left: ${spaces?.m}px;
    `;
  }}

  ${disabledStyles}
`;

interface StyledIconType extends CommonThemeProps {
  selected?: boolean;
  disabled?: boolean;
}

export const StyledIconWrapper = styled("span")`
  ${(props: StyledIconType) => {
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);

    return `
      display: flex;
      align-self: start;
      margin-right: ${spaces?.xs}px;
      margin-top: ${spaces?.xxs}px;
      height: ${iconSizes?.s.height}px;
    `;
  }}
`;

interface StyledIconProps extends CommonThemeProps {
  selected?: boolean;
  disabled?: boolean;
}

const selectionIconStyles = (props: StyledIconProps) => {
  const { selected, disabled } = props;
  const semanticColors = getSemanticColors(props);

  const selectedColor = disabled
    ? semanticColors?.base?.ornamentDisabled
    : semanticColors?.base?.ornamentPrimary;

  return `
    color: ${selected ? selectedColor : "transparent"};
  `;
};

const selectionIconOptions = {
  shouldForwardProp: (prop: string) =>
    prop !== "selected" && prop !== "disabled",
};

export const StyledCheckIcon = styled(CheckIcon, selectionIconOptions)`
  ${selectionIconStyles}
`;

export const StyledMinusIcon = styled(MinusIcon, selectionIconOptions)`
  ${selectionIconStyles}
`;

export const DotIcon = styled("svg")`
  ${(props: StyledIconProps) => {
    const { selected, disabled } = props;
    const semanticColors = getSemanticColors(props);

    const selectedColor = disabled
      ? semanticColors?.base?.ornamentDisabled
      : semanticColors?.base?.ornamentPrimary;

    return `
      color: ${selected ? selectedColor : "transparent"};
    `;
  }}
`;
