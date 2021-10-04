import styled from "@emotion/styled";
import { Alert } from "@material-ui/lab";
import { getColors, getShadows, getSpacings } from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

export const StyledAlert = styled(Alert)`
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);
    const shadows = getShadows(props);
    const { severity = "primary" } = props;
    const borderColor = (colors && colors[severity][400]) || "black";

    return `
      margin: ${spacings?.m}px 0;
      border-radius: ${spacings?.default};
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
