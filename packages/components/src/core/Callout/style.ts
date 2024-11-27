import {
  Alert,
  AlertProps,
  alertClasses,
  alertTitleClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  getCorners,
  getIconSizes,
  getPalette,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { CalloutIntentType, CalloutSdsStyleType } from "src/core/Callout";

interface CalloutExtraProps extends CommonThemeProps {
  collapsed?: boolean;
  intent?: CalloutIntentType;
  sdsStyle?: CalloutSdsStyleType;
}

type CalloutProps = Omit<AlertProps, "severity"> & CalloutExtraProps;

const doNotForwardProps = ["calloutTitle", "collapsed", "severity", "sdsStyle"];

export const StyledCallout = styled(Alert, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXs}

  ${(props: CalloutProps) => {
    const { intent = "info", sdsStyle } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const palette = getPalette(props);
    const semanticColors = getSemanticColors(props);

    const iconColor = semanticColors?.[intent]?.ornament ?? "black";
    const backgroundColor =
      semanticColors?.[intent]?.surfaceSecondary ?? "white";

    return `
      margin: ${spaces?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${palette?.text?.primary};
      padding: ${spaces?.m}px;
      background-color: ${backgroundColor};

      .${alertClasses.icon} {
        height: ${iconSizes?.l.height}px;
        width: ${iconSizes?.l.width}px;
        margin-right: ${spaces?.s}px;
        padding: 0;

        path {
          fill: ${iconColor};
        }
      }

      .${alertClasses.message} {
        width: 100%;
        padding: 0;
        margin: 0;

        .${alertTitleClasses.root} {
          margin: 0;
        }
      }

      .${alertClasses.action} {
        display: ${sdsStyle === "persistent" ? "none" : "block"};
        margin: 0 0 0 ${spaces?.s}px;
        padding: 0;
        align-items: flex-start;

        > button {
          padding: 0;
        }
      }
    `;
  }}
`;
