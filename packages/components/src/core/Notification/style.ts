import { Alert } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBody,
  getBorders,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
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
    const semanticColors = getSemanticColors(props);
    const borders = getBorders(props);

    const iconColor = semanticColors?.[intent]?.ornament ?? "black";
    const backgroundColor =
      semanticColors?.[intent]?.surfaceSecondary ?? "white";

    return `
      background-color: ${backgroundColor};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${spaces?.m}px 0;
      border-radius: ${corners?.xl}px;
      color: ${semanticColors?.base?.textPrimary};
      padding: ${spaces?.m}px;
      align-items: flex-start;
      border-left: ${borders?.[intent]?.extraThick};
      box-shadow: ${shadows?.s};

      .MuiAlert-icon {
        margin-top: ${spaces?.xxxs}px;
        margin-right: ${spaces?.s}px;
        padding: 0;
        path {
          fill: ${iconColor};
        }
      }

      .MuiAlert-message {
        padding: 0;
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
