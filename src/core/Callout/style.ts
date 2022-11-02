import { Alert, AlertProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBody,
  getColors,
  getCorners,
  getIconSizes,
  getPalette,
  getSpaces,
} from "../styles";

interface CalloutExtraProps extends CommonThemeProps {
  collapsed?: boolean;
}

type CalloutProps = AlertProps & CalloutExtraProps;

const fontBodyXs = fontBody("xs");

const doNotForwardProps = ["calloutTitle", "collapsed"];

export const StyledCallout = styled(Alert, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXs}
  ${(props: CalloutProps) => {
    const colors = getColors(props);
    const palette = getPalette(props);
    const spacings = getSpaces(props);
    const { severity = "success" } = props;
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const iconColor = (colors && colors[severity][400]) || "black";
    const calloutColor = (colors && colors[severity][100]) || "white";
    const backgroundColor = colors && colors[severity][100];

    // when a title is present Mui's default styling has vertical margin,
    // but for an expandable callout that is collapsed, we do not want
    // any buttom margin
    const titleBottomMargin = props.collapsed ? "margin-bottom: 0;" : "";

    return `
      background-color: ${backgroundColor};
      width: 360px;
      margin: ${spacings?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${palette?.text?.primary};
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

        .MuiAlertTitle-root{
          margin-top: 0;
          ${titleBottomMargin}
        }
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
