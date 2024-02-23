import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBody,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getShadows,
  getSpaces,
} from "../styles";
import { defaultTheme } from "../styles/common/defaultTheme";
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

    const spacings = getSpaces(props);
    const shadows = getShadows(props);
    const corners = getCorners(props);
    const iconSizes = getIconSizes(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    const borderColor = semanticComponentColors?.[intent]?.border ?? "black";
    const iconColor = semanticComponentColors?.[intent]?.icon ?? "black";
    const backgroundColor =
      semanticComponentColors?.[intent]?.surface ?? "white";

    return `
      background-color: ${backgroundColor};
      max-width: 480px;
      min-width: 280px;
      box-sizing: border-box;
      margin: ${spacings?.m}px 0;
      border-radius: ${corners?.m}px;
      color: ${defaultTheme.palette.text.primary};
      padding: ${spacings?.l}px;
      align-items: flex-start;
      border-left: 5px solid;
      box-shadow: ${shadows?.s};
      border-color: ${borderColor};

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
        padding: ${spacings?.xxxs}px 0px 0px;
        margin-right: ${spacings?.m}px;
        width: 100%;

        > * {
          margin: ${spacings?.m}px 0px;

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
        margin-top: ${spacings?.xxs}px;

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
