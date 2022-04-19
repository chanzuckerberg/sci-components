import styled from "@emotion/styled";
import { Alert } from "@material-ui/lab";
import { getColors, getShadows, getSpaces } from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

export const StyledAlert = styled(Alert)`
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);
    const shadows = getShadows(props);
    const { severity = "success" } = props;
    const borderColor = (colors && colors[severity][400]) || "black";
    const backgroundColor = colors && colors[severity][100];

    return `
      background-color: ${backgroundColor};
      margin: ${spacings?.m}px 0;
      color: ${defaultTheme.palette.text.primary};
      padding: ${spacings?.l}px ${spacings?.l}px
        ${spacings?.l}px 9px;
      &.elevated {
        border-left: 5px solid;
        box-shadow: ${shadows?.s};
        border-color: ${borderColor};
      }
    `;
  }}
`;
