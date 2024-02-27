import { Alert, AlertProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  getCorners,
  getIconSizes,
  getPalette,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";
import { CalloutIntentType } from ".";

interface CalloutExtraProps extends CommonThemeProps {
  collapsed?: boolean;
  intent?: CalloutIntentType;
}

type CalloutProps = Omit<AlertProps, "severity"> & CalloutExtraProps;

const doNotForwardProps = ["calloutTitle", "collapsed", "severity"];

export const StyledCallout = styled(Alert, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXs}
  ${(props: CalloutProps) => {
    const { intent = "info" } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const palette = getPalette(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    const iconColor = semanticComponentColors?.[intent]?.icon ?? "black";
    const backgroundColor =
      semanticComponentColors?.[intent]?.surface ?? "white";

    // when a title is present Mui's default styling has vertical margin,
    // but for an expandable callout that is collapsed, we do not want
    // any bottom margin
    const titleBottomMargin = props.collapsed ? "margin-bottom: 0;" : "";

    return `
      width: 360px;
      margin: ${spaces?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${palette?.text?.primary};
      padding: ${spaces?.m}px;
      background-color: ${backgroundColor};

      .MuiAlert-icon {
        height: ${iconSizes?.l.height}px;
        width: ${iconSizes?.l.width}px;
        margin-right: ${spaces?.s}px;
        padding: 0;

        path {
          fill: ${iconColor};
        }
      }

      .MuiAlert-message {
        padding: 0;
        margin-right: ${spaces?.m}px;

        .MuiAlertTitle-root{
          margin-top: 0;
          ${titleBottomMargin}
        }
      }

      .MuiAlert-action {
        margin-right: 0;
        padding: 0;
        align-items: flex-start;
        margin-top: ${spaces?.xxs}px;

        > button {
          padding: 0;
        }
      }
    `;
  }}
`;
