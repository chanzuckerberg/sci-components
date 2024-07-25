import { Check, Remove } from "@mui/icons-material";
import { MenuItem, menuItemClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyXs } from "src/core/styles/common/mixins/fonts";
import {
  CommonThemeProps,
  getColors,
  getFontWeights,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export const StyledMenuItem = styled(MenuItem)`
  ${(props) => {
    const { selected } = props;
    const colors = getColors(props);
    const fontWeights = getFontWeights(props);
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const primary = colors?.blue[400];

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
          color: ${selected ? primary : semanticColors?.base?.iconPrimary};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${semanticColors?.base?.fillHover};
        svg.check-icon {
          color: ${selected ? primary : semanticColors?.base?.iconPrimary};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: white;
        &:hover {
          background-color: ${semanticColors?.base?.fillHover};
        }
        .primary-text {
          font-weight: ${fontWeights?.semibold};
        }
      }

      &:active {
        svg.check-icon {
          color: ${primary};
        }

        &:active {
          svg.check-icon {
            color: ${primary};
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
    color: ${semanticColors?.base?.iconDisabled};
    cursor: default;
  `;
};

interface TextWrapperProps {
  disabled?: boolean;
  selected: boolean;
}

export const TextWrapper = styled("span")<TextWrapperProps>`
  ${fontBodyXs}

  ${(props) => {
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
        ${disabled ? `color: ${semanticColors?.base?.iconDisabled};` : null}
      }
    `;
  }}
`;

interface ColumnWrapperProps {
  disabled?: boolean;
}

export const ColumnWrapper = styled("span")<ColumnWrapperProps>`
  ${fontBodyXs}

  ${(props) => {
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

interface StyledIconType {
  selected?: boolean;
  disabled?: boolean;
}

export const StyledIconWrapper = styled("span")`
  ${(props) => {
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);

    return `
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
      ? semanticColors?.base?.iconDisabled
      : semanticColors?.accent?.icon;

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
      ? semanticColors?.base?.iconDisabled
      : semanticColors?.accent?.icon;

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
