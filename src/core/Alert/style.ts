import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getColors, getShadows, getSpaces } from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

export const StyledAlert = styled(Alert)`
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);
    const shadows = getShadows(props);
    const { severity = "primary" } = props;
    const borderColor = (colors && colors[severity][400]) || "black";
    const alertColor = (colors && colors[severity][100]) || "white";
    const iconColor = (colors && colors[severity][400]) || "black";
    return `
      margin: ${spacings?.m}px 0;
      border-radius: ${spacings?.default};
      color: ${defaultTheme.palette.text.primary};
      padding: ${spacings?.l}px ${spacings?.l}px
        ${spacings?.l}px 9px;
      background-color: ${alertColor};
      &.elevated {
        border-left: 5px solid;
        box-shadow: ${shadows?.s};
        border-color: ${borderColor};
      }
      .MuiAlert-icon {
        path {
          fill: ${iconColor};
        }
      }
    `;
  }}
`;
