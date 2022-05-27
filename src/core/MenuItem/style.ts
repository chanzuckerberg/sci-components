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
  && {
    min-height: 30px;

    ${(props) => {
      const { selected } = props;
      const colors = getColors(props);
      const fontWeights = getFontWeights(props);
      const spacings = getSpaces(props);

      const primary = colors?.primary[400];

      return `
        padding: ${spacings?.xs}px ${spacings?.s}px;
        opacity: 1;
       
        .primary-text {
          font-weight: ${
            selected ? fontWeights?.semibold : fontWeights?.regular
          };
        }

        &.MuiButtonBase-root {
          background-color: transparent;

          &:hover, &.${menuItemClasses.focusVisible} {
            background-color: ${colors?.gray[100]};

            &[aria-selected="true"] {
              background-color: ${colors?.gray[100]};
            }
          }

          &[aria-selected="true"] {
            background-color: initial;
          }
        }

        &:hover, &.${menuItemClasses.focusVisible} {
          svg {
            color: ${selected ? primary : colors?.gray[500]};
          }
        }

        &:active {
          svg {
            color: ${primary};
          }

          .primary-text {
            font-weight: ${fontWeights?.semibold};
          }
        }
    `;
    }}
  }
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
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
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

    return `
      color: ${
        selected
          ? disabled
            ? colors?.gray[300]
            : colors?.primary[400]
          : "transparent"
      };
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
