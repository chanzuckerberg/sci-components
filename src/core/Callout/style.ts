import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  fontBody,
  getColors,
  getCorners,
  getIconSizes,
  getSpaces,
} from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

const fontBodyXs = fontBody("xs");

export const StyledCallout = styled(Alert)`
  ${fontBodyXs}
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);
    const { severity = "success" } = props;
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const iconColor = (colors && colors[severity][400]) || "black";
    const calloutColor = (colors && colors[severity][100]) || "white";
    const backgroundColor = colors && colors[severity][100];

    return `
      background-color: ${backgroundColor};
      width: 360px;
      margin: ${spacings?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${defaultTheme.palette.text.primary};
      padding: ${spacings?.m}px;
      background-color: ${calloutColor};

      .MuiAlert-icon {
        height: ${iconSizes?.l.height}px;
        width: ${iconSizes?.l.width}px;
        margin-right: ${spacings?.m}px;
        padding: 0;
        path {
          fill: ${iconColor};
        }
      }

      .MuiAlert-message {
        padding: 0;
        margin-right: ${spacings?.m}px;
      }

      .MuiAlert-action {
        margin-right: 0;
        padding: 0;
        align-items: flex-start;
        margin-top: ${spacings?.xxs}px;

        > button {
          padding: 0;
        }
      }
    `;
  }}
`;
