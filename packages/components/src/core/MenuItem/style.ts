import { Check, Remove } from "@mui/icons-material";
import { MenuItem, menuItemClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyXs } from "src/core/styles/common/mixins/fonts";
import {
  CommonThemeProps,
  getColors,
  getFontWeights,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export const StyledMenuItem = styled(MenuItem)`
  ${(props) => {
    const { selected } = props;
    const colors = getColors(props);
    const fontWeights = getFontWeights(props);
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

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
          background-color: ${semanticComponentColors?.base?.fillHover};

          &[aria-selected="true"] {
            background-color: ${semanticComponentColors?.base?.fillHover};
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
          background-color: ${semanticComponentColors?.base?.fillHover} !important;
        }

        svg.check-icon {
          color: ${selected ? primary : semanticComponentColors?.base?.icon};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &:hover {
        background-color: ${semanticComponentColors?.base?.fillHover};
        svg.check-icon {
          color: ${selected ? primary : semanticComponentColors?.base?.icon};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: white;
        &:hover {
          background-color: ${semanticComponentColors?.base?.fillHover};
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

  const semanticComponentColors = getSemanticComponentColors(props);

  return `
    color: ${semanticComponentColors?.base?.iconDisabled};
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
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.primary};
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
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      margin-right: ${spaces?.xs}px;
      margin-top: ${spaces?.xxxs}px;
      height: ${iconSizes?.s.height}px;

      .MuiSvgIcon-root {
        ${disabled ? `color: ${semanticComponentColors?.base?.iconDisabled};` : null}
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
    const semanticTextColors = getSemanticTextColors(props);

    return `
      text-align: right;
      color: ${semanticTextColors?.base?.primary};
      margin-left: 10px;
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
    const semanticComponentColors = getSemanticComponentColors(props);

    const selectedColor = disabled
      ? semanticComponentColors?.base?.iconDisabled
      : semanticComponentColors?.accent?.icon;

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

    const semanticComponentColors = getSemanticComponentColors(props);
    const iconSizes = getIconSizes(props);

    const selectedColor = disabled
      ? semanticComponentColors?.base?.iconDisabled
      : semanticComponentColors?.accent?.icon;

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
