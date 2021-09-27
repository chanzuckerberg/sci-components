import styled from "@emotion/styled";
import { Alert } from "@material-ui/lab";
import Button from "../Button";
import {
  fontBody,
  fontCaps,
  getColors,
  getCorners,
  getIconSizes,
  getShadows,
  getSpacings,
} from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";

const fontBodyXs = fontBody("xs");
const fontCapsXxxs = fontCaps("xxxs");

export const StyledNotification = styled(Alert)`
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
      padding: ${spacings?.l}px ${spacings?.xl}px;
      align-items: flex-start;

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

        > *:not(button) {
          margin: ${spacings?.m}px 0px;
        }
      }

      .MuiAlert-action {
        margin-right: 0;
        padding: 0;
        align-items: flex-start;

          .MuiIconButton-label {
            color: ${colors?.gray[500]};
          } 
        }
      } 
    `;
  }}
`;

export const StyledButton = styled(Button)`
  ${fontCapsXxxs};
  padding: 0;

  ${(props) => {
    const colors = getColors(props);

    return `
    &:hover {
      color: ${colors?.primary[500]};
      background: none;
    }

    &:active {
      color: ${colors?.primary[600]};
    }
    `;
  }};
`;
