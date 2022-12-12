import {
  FormControlLabel as RawFormControlLabel,
  Radio as RawRadio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
  getColors,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../styles";

export interface RadioExtraProps extends CommonThemeProps {
  caption?: string;
}

export const StyledFormControlLabel = styled(RawFormControlLabel)`
  ${(props: RadioExtraProps) => {
    const { caption } = props;
    const content = caption === undefined ? "" : caption;
    const typography = getTypography(props);
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      position: relative;
      z-index: 0;
      padding-bottom: ${caption === undefined ? 0 : spaces?.xl}px;
      
      &:after {
        ${fontBodyXxs}
        font-size: 12px;
        left: 34px;
        position: absolute;
        top: 30px;
        z-index: -1;
        content: "${content}";
        font-family: ${typography?.fontFamily};
        color: ${colors?.gray[500]}; 
        
      }
    `;
  }}
`;

export const StyledRadioButton = styled(RawRadio)`
  ${(props) => {
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);
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

      .MuiSvgIcon-root {
        height: ${iconSizes?.input.height}px;
        width: ${iconSizes?.input.width}px;
      }
    `;
  }}
`;
