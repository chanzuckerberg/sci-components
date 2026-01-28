import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodySemiboldXxxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { IntentMessageIntent } from "./IntentMessage.types";

interface StyledIntentMessageProps extends CommonThemeProps {
  borderIntent?: IntentMessageIntent;
  hasBorder?: boolean;
}

export const StyledIntentMessage = styled.div<StyledIntentMessageProps>`
  display: flex;
  flex-direction: column;
  ${(props) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const borderThickness = 2;

    const borderColor = props.borderIntent
      ? semanticColors?.[props.borderIntent]?.border
      : "transparent";

    return `
      gap: ${spaces?.s}px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -${(spaces?.xs || 0) + borderThickness}px;
        top: 0;
        bottom: 0;
        width: ${borderThickness}px;
        background-color: ${borderColor};
        display: ${props.hasBorder ? "block" : "none"};
      }
    `;
  }}
`;

export const StyledMessageItem = styled.div<
  CommonThemeProps & { intent: IntentMessageIntent }
>`
  ${fontBodySemiboldXxxs}
  display: flex;
  align-items: start;

  ${(props) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const intentColors = semanticColors?.[props.intent];

    return `
      gap: ${spaces?.xs}px;
      color: ${intentColors?.foreground};

      svg {
        margin-top: ${spaces?.xxxs}px;
        fill: ${intentColors?.foreground};
        path {
          fill: ${intentColors?.foreground};
        }
      }
    `;
  }}
`;
