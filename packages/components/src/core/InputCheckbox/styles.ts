import {
  Checkbox as RawCheckbox,
  FormControlLabel as RawFormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyXxs } from "../styles";
import { focusVisibleA11yStyle } from "../styles/common/mixins/a11y";
import {
  CommonThemeProps,
  getColors,
  getCorners,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../styles/common/selectors/theme";

export interface CheckboxExtraProps extends CommonThemeProps {
  caption?: string;
}

export const StyledFormControlLabel = styled(RawFormControlLabel)`
  position: relative;
  z-index: 0;

  &:after {
    ${fontBodyXxs}
    left:34px;
    position: absolute;
    top: 30px;
    z-index: -1;

    ${(props: CheckboxExtraProps) => {
      const { caption } = props;
      const content = caption !== undefined ? caption : "";
      const typography = getTypography(props);
      const colors = getColors(props);
      return `
        content: "${content}";
        font-family: ${typography?.fontFamily};
        color: ${colors?.gray[500]};
      `;
    }}
  }
`;

export const StyledCheckbox = styled(RawCheckbox)`
  ${(props) => {
    const colors = getColors(props);
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);
    return `
      color: ${colors?.gray[400]};
      &:hover {
        color: ${colors?.gray[500]};
        background-color: transparent;
      }
      &.Mui-disabled {
        color: ${colors?.gray[300]};
      }
      &.Mui-checked {
        color: ${colors?.primary[400]};
        &:hover {
          color: ${colors?.primary[500]};
          background-color: transparent;
        }
        &.Mui-disabled {
          color: ${colors?.primary[300]}
        }
      }

      &.MuiCheckbox-root {
        ${focusVisibleA11yStyle()}
        border-radius: ${corners?.s}px;        
        padding: ${spaces?.xxs}px;
        margin: 3px;
      }

      .MuiSvgIcon-root {
        height: ${iconSizes?.input.height}px;
        width: ${iconSizes?.input.width}px;
      }
    `;
  }}
`;
