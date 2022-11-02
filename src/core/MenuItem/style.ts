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
      padding: ${spacings?.xs}px ${spacings?.s}px;
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
      }
  
      &.MuiAutocomplete-option[aria-selected="true"] {
        background-color: white;

        &:hover {
          background-color: ${colors?.gray[100]};
        }

        svg.MuiSvgIcon-root {
          color: ${selected ? primary : colors?.gray[500]};
        }
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
        svg.MuiSvgIcon-root {
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
        svg.MuiSvgIcon-root {
          color: ${primary};
        }

        &:active {
          svg.MuiSvgIcon-root {
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
  align-items: center;
  width: 100%;
`;

interface DisabledType extends CommonThemeProps {
  disabled?: boolean;
}

const disabledStyles = (props: DisabledType) => {
  const { disabled } = props;
  if (!disabled) return ``;

  const palette = getPalette(props);

  return `
  color: ${palette?.text?.disabled};
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
    `;
  }}

  ${disabledStyles}
`;

interface ColumnWrapperProps {
  disabled?: boolean;
}

export const ColumnWrapper = styled("span")<ColumnWrapperProps>`
  ${fontBodyXs}

  ${(props) => {
    const palette = getPalette(props);

    return `
    color: ${palette?.text?.secondary};
    `;
  }}

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
