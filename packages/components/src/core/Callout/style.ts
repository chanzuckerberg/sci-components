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
import { CalloutIntentType } from "src/core/Callout";

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
    const semanticColors = getSemanticColors(props);

    const iconColor = semanticColors?.[intent]?.ornament ?? "black";
    const backgroundColor =
      semanticColors?.[intent]?.surfaceSecondary ?? "white";

    return `
      position: relative;
      width: 360px;
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
        padding: 0;
        margin-right: ${spaces?.m}px;

        .${alertTitleClasses.root} {
          margin: 0;
        }
      }

      .${alertClasses.action} {
        position: absolute;
        right: ${spaces?.m}px;
        top: ${spaces?.m}px;
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
