import { Check, Remove } from "@mui/icons-material";
import { MenuItem, menuItemClasses, MenuItemProps } from "@mui/material";
import styled from "@emotion/styled";
import { fontBodyXs } from "src/core/styles/common/mixins/fonts";
import {
  CommonThemeProps,
  getFontWeights,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface MenuItemExtraProps extends CommonThemeProps, MenuItemProps {}

export const StyledMenuItem = styled(MenuItem)`
  ${(props: MenuItemExtraProps) => {
    const { selected } = props;
    const fontWeights = getFontWeights(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      padding: ${spaces?.xs}px ${spaces?.s}px !important;
      min-height: unset;
      opacity: 1;

      &.MuiAutocomplete-option {
        min-height: unset;
      }
      
      .primary-text {
        font-weight: ${selected ? fontWeights?.semibold : fontWeights?.regular};
      }

      &.MuiButtonBase-root {
        background-color: transparent;
        opacity: 1;

        &:hover, &.${menuItemClasses.focusVisible} {
          background-color: ${semanticColors?.base?.fillHover};

          &[aria-selected="true"] {
            background-color: ${semanticColors?.base?.fillHover};
          }
        }
      }

      &.${menuItemClasses.root} .MuiSvgIcon-root {
        align-self: flex-start;
      }

      &.${menuItemClasses.root} .${menuItemClasses.disabled} {
        opacity: 1 !important;
      }

      &.MuiAutocomplete-option[aria-selected="true"] {
        &:hover {
          background-color: ${semanticColors?.base?.fillHover} !important;
        }

        svg.check-icon {
          color: ${selected ? semanticColors?.accent?.ornamentSelected : semanticColors?.base?.ornamentSecondary};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${semanticColors?.base?.fillHover};
        svg.check-icon {
          color: ${selected ? semanticColors?.accent?.ornamentHover : semanticColors?.base?.ornamentSecondary};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: ${semanticColors?.base?.surface};
        &:hover {
          background-color: ${semanticColors?.base?.fillHover};
        }
        .primary-text {
          font-weight: ${fontWeights?.semibold};
        }
      }

      &:active {
        svg.check-icon {
          color: ${semanticColors?.accent?.ornamentPressed};
        }

        &:active {
          svg.check-icon {
            color: ${semanticColors?.accent?.ornamentPressed};
          }

          .primary-text {
            font-weight: ${fontWeights?.semibold};
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

    return `
      margin-right: ${spaces?.xs}px;
      margin-top: ${spaces?.xxxs}px;
      height: ${iconSizes?.s.height}px;

      .MuiSvgIcon-root {
        ${disabled ? `color: ${semanticColors?.base?.ornamentDisabled};` : null};
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
      margin-right: ${spaces?.m}px;
      margin-top: ${spaces?.xxxs}px;
      height: ${iconSizes?.s.height}px;
    `;
  }}
`;

export const StyledCheck = styled(Check, {
  shouldForwardProp: (prop) => prop !== "selected",
})<StyledIconType>`
  ${(props) => {
    const { selected, disabled } = props;

    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    const selectedColor = disabled
      ? semanticColors?.base?.ornamentDisabled
      : semanticColors?.accent?.ornamentSelected;

    return `
      color: ${selected ? selectedColor : "transparent"};
      padding: 0;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &.MuiCheckbox-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    `;
  }}
`;

export const StyledMinus = styled(Remove, {
  shouldForwardProp: (prop) => prop !== "selected",
})<StyledIconType>`
  ${(props) => {
    const { selected, disabled } = props;

    const semanticColors = getSemanticColors(props);
    const iconSizes = getIconSizes(props);

    const selectedColor = disabled
      ? semanticColors?.base?.ornamentDisabled
      : semanticColors?.accent?.ornamentSelected;

    return `
      color: ${selected ? selectedColor : "transparent"};
      padding: 0;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &.MuiCheckbox-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    `;
  }}
`;
