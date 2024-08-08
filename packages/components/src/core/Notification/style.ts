"use client";

import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBody,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getShadows,
  getSpaces,
  getTypography,
} from "src/core/styles";
import { ExposedNotificationProps } from ".";

interface NotificationExtraProps
  extends CommonThemeProps,
    ExposedNotificationProps {}

interface NotificationButtonWrapperProps extends CommonThemeProps {
  buttonPosition?: "left" | "right";
}

const fontBodyXs = fontBody("xs");
const doNotForwardProps = ["slideDirection"];

export const StyledNotification = styled(Alert, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXs}

  ${(props: NotificationExtraProps) => {
    const { intent = "info" } = props;

    const spaces = getSpaces(props);
    const shadows = getShadows(props);
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const semanticComponentColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);
    const typography = getTypography(props);

    const borderColor = semanticComponentColors?.[intent]?.border ?? "black";
    const iconColor = semanticComponentColors?.[intent]?.icon ?? "black";
    const backgroundColor =
      semanticComponentColors?.[intent]?.surface ?? "white";

    // (masoudmanson): The Notification Icon should be vertically centered with the Notification
    // Title. The padding-top of the Notification Title is calculated based on the difference
    // between the height of the Icon and the line-height of the Notification Title.
    const alertMessagePaddingTop = Math.abs(
      ((iconSizes?.l.height ?? 0) -
        parseInt(
          String(typography?.styles?.body?.regular?.xs?.lineHeight ?? "0")
        )) /
        2
    );

    return `
      background-color: ${backgroundColor};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${spaces?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${semanticTextColors?.base?.primary};
      padding: ${spaces?.l}px;
      align-items: flex-start;
      border-left: 5px solid;
      box-shadow: ${shadows?.s};
      border-color: ${borderColor};

      .MuiAlert-icon {
        height: ${iconSizes?.l.height}px;
        width: ${iconSizes?.l.width}px;
        margin-right: ${spaces?.m}px;
        padding: 0;
        path {
          fill: ${iconColor};
        }
      }

      .MuiAlert-message {
        padding: ${alertMessagePaddingTop}px 0px 0px;
        margin-right: ${spaces?.m}px;
        width: 100%;

        > * {
          margin: ${spaces?.m}px 0px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        button {
          display: block;
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
      }
    `;
  }}
`;

export const StyledButtonWrapper = styled("div")`
  ${(props: NotificationButtonWrapperProps) => {
    const { buttonPosition = "right" } = props;

    return `
      display: flex;
      justify-content: ${buttonPosition === "left" ? "flex-start" : "flex-end"};
    `;
  }}
`;
