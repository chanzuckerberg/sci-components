import styled from "@emotion/styled";
import { Alert } from "@material-ui/lab";
import {
  fontBody,
  getColors,
  getCorners,
  getIconSizes,
  getShadows,
  getSpacings,
} from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

const fontBodyXs = fontBody("xs");

export const StyledCallout = styled(Alert)`
  ${fontBodyXs}
  ${(props) => {
    const colors = getColors(props);
    const spacings = getSpacings(props);
    const shadows = getShadows(props);
    const { severity = "success" } = props;
    const borderColor = (colors && colors[severity][400]) || "black";
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const iconColor = (colors && colors[severity][400]) || "black";

    return `
      margin: ${spacings?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${defaultTheme.palette.text.primary};
      padding: ${spacings?.m}px;

      &.elevated {
        border-left: 5px solid;
        box-shadow: ${shadows?.s};
        border-color: ${borderColor};
      }

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
      }

      .MuiAlert-action {
        margin-right: 0;

        > *:first-child {
          padding: ${spacings?.xs}px;

          .MuiIconButton-label {
            height: ${iconSizes?.s.height}px;
            width: ${iconSizes?.s.width}px;
            color: ${colors?.gray[500]}
          } 
        }
      } 
    `;
  }}
`;
