import { Check } from "@mui/icons-material";
import { MenuItem, menuItemClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps } from "../styles";
import { fontBody } from "../styles/common/mixins/fonts";
import {
  getColors,
  getFontWeights,
  getIconSizes,
  getPalette,
  getSpaces,
} from "../styles/common/selectors/theme";

const fontBodyXs = fontBody("xs");

export const StyledMenuItem = styled(MenuItem)`
  ${(props) => {
    const { selected } = props;
    const colors = getColors(props);
    const fontWeights = getFontWeights(props);
    const spacings = getSpaces(props);

    const primary = colors?.primary[400];

    return `
      padding: ${spacings?.xs}px ${spacings?.s}px !important;
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
          background-color: ${colors?.gray[100]};

          &[aria-selected="true"] {
            background-color: ${colors?.gray[100]};
          }
        }
      }

      &.MuiMenuItem-root .MuiSvgIcon-root {
        align-self: flex-start;
        margin-top: 3px;
        margin-bottom: -3px;
      }

      &.MuiMenuItem-root .Mui-disabled {
        opacity: 1 !important;
      }

      &.MuiAutocomplete-option[aria-selected="true"] {
        &:hover {
          background-color: ${colors?.gray[100]} !important;
        }

        svg.check-icon {
          color: ${selected ? primary : colors?.gray[500]};
        }
      }

      &.MuiAutocomplete-option[aria-disabled="true"] {
        opacity: 1;
      }

      &.MuiListItem-root .MuiSvgIcon-root {
        align-self: flex-start;
        margin-top: 3px;
      }

      &.MuiListItem-root .MuiSvgIcon-root {
        align-self: flex-start;
        margin-top: 3px;
      }

      &:hover {
        background-color: ${colors?.gray[100]};
        svg.check-icon {
          color: ${selected ? primary : colors?.gray[500]};
        }
      }

      &.Mui-selected.MuiListItem-root.MuiListItem-button {
        background-color: white;
        &:hover {
          background-color: ${colors?.gray[100]};
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

  const colors = getColors(props);

  return `
    color: ${colors?.gray[300]};
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
    const palette = getPalette(props);

    return `
      color: ${palette?.text?.primary};
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
    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      margin-right: ${spacings?.xs}px;

      .MuiSvgIcon-root {
        ${disabled ? `color: ${colors?.gray[300]};` : null}
      }
    `;
  }}
`;

interface ColumnWrapperProps {
  disabled?: boolean;
}

export const ColumnWrapper = styled("span")<ColumnWrapperProps>`
  ${fontBodyXs}

  text-align: right;
  color: black;
  margin-left: 10px;

  ${disabledStyles}
`;

export const DemoWrapper = styled("div")`
  width: 250px;
`;

interface StyledCheckType {
  selected?: boolean;
  disabled?: boolean;
}

export const StyledCheck = styled(Check, {
  shouldForwardProp: (prop) => prop !== "selected",
})<StyledCheckType>`
  ${(props) => {
    const { selected, disabled } = props;
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);
    const spacings = getSpaces(props);
    const selectedColor = disabled ? colors?.gray[300] : colors?.primary[400];
    return `
      color: ${selected ? selectedColor : "transparent"};
      margin-right: ${spacings?.m}px;
      margin-top: ${spacings?.xxxs}px;
      padding: 0;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &.MuiCheckbox-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    `;
  }}
`;
