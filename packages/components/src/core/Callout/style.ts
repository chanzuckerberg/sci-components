import {
  Alert,
  AlertProps,
  alertClasses,
  alertTitleClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  getCorners,
  getIconSizes,
  getPalette,
  getSemanticColors,
  getSpaces,
  getTypography,
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
    const typography = getTypography(props);
    const semanticColors = getSemanticColors(props);

    const iconColor = semanticColors?.[intent]?.icon ?? "black";
    const backgroundColor = semanticColors?.[intent]?.surfacePrimary ?? "white";

    // when a title is present Mui's default styling has vertical margin,
    // but for an expandable callout that is collapsed, we do not want
    // any bottom margin
    const titleBottomMargin = props.collapsed ? "margin-bottom: 0;" : "";

    // (masoudmanson): The Callout Icon should be vertically centered with the Callout
    // Title. The padding-top of the Callout Message is calculated based on the difference
    // between the height of the Icon and the line-height of the Callout Title.
    const alertMessagePaddingTop = Math.abs(
      ((iconSizes?.l.height ?? 0) -
        parseInt(
          String(typography?.styles?.body?.regular?.xs?.lineHeight ?? "0")
        )) /
        2
    );

    return `
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
        padding: ${alertMessagePaddingTop}px 0 0;
        margin-right: ${spaces?.m}px;

        .${alertTitleClasses.root} {
          margin-top: 0;
          ${titleBottomMargin}
        }
      }

      .${alertClasses.action} {
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
