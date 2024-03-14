import { Alert, AlertProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors, getColors, getShadows, getSpaces } from "../styles";
import { defaultTheme } from "src/core/styles/common/defaultTheme";

export const StyledAlert = styled(Alert)`
  ${(props) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);
    const shadows = getShadows(props);
    const { severity = "success" } = props;

    const borderColor =
      (colors && severityToColor(severity, colors)[400]) || "black";
    const alertColor =
      (colors && severityToColor(severity, colors)[100]) || "white";
    const iconColor =
      (colors && severityToColor(severity, colors)[400]) || "black";
    const backgroundColor = colors && severityToColor(severity, colors)[100];

    return `
      background-color: ${backgroundColor};
      margin: ${spaces?.m}px 0;
      color: ${defaultTheme.palette.text.primary};
      padding: ${spaces?.l}px ${spaces?.l}px
        ${spaces?.l}px 9px;
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

function severityToColor(
  alertSeverity: AlertProps["severity"],
  colors: Colors
) {
  switch (alertSeverity) {
    case "error":
      return colors?.red;
    case "warning":
      return colors?.yellow;
    case "info":
      return colors?.blue;
    case "success":
      return colors?.green;
    default:
      return colors?.green;
  }
}
