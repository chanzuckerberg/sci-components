/* eslint-disable sonarjs/cognitive-complexity */
import styled from "@emotion/styled";
import { CommonThemeProps, getSemanticColors } from "../styles";
import { ButtonToggleProps } from ".";
import Button from "../Button";
import { css, SerializedStyles } from "@emotion/react";

/**
 * (masoudmanson): Since StyledButtonToggle is built on top of Button,
 * we only need to exclude the `sdsStage` prop from being forwarded,
 * as it is not a valid prop for Button.
 * All other props should be passed down to Button; otherwise,
 * the component won’t function as expected.
 */
const doNotForwardProps = ["sdsStage"];

interface ButtonToggleExtraProps extends ButtonToggleProps, CommonThemeProps {}

const StageOnStyles = (props: ButtonToggleExtraProps): SerializedStyles => {
  const { sdsType, sdsStyle, backgroundOnHover, backgroundAppearance } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    sdsType === "primary"
      ? backgroundAppearance === "dark"
        ? semanticColors?.accent?.foregroundOnDark
        : semanticColors?.accent?.foreground
      : backgroundAppearance === "dark"
        ? semanticColors?.base?.textPrimaryOnDark
        : semanticColors?.base?.textPrimary;

  const backgroundColor =
    sdsStyle === "outline" && sdsType === "primary"
      ? backgroundAppearance === "dark"
        ? semanticColors?.accent?.surfaceSecondaryOnDark
        : semanticColors?.accent?.surfaceSecondary
      : backgroundAppearance === "dark"
        ? semanticColors?.base?.fillPrimaryInteractionOnDark
        : semanticColors?.base?.fillPrimaryInteraction;

  const ornamentColor =
    sdsStyle === "outline"
      ? sdsType === "primary"
        ? backgroundAppearance === "dark"
          ? semanticColors?.accent?.foregroundOnDark
          : semanticColors?.accent?.foreground
        : backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentPrimaryOnDark
          : semanticColors?.base?.ornamentPrimary
      : sdsType === "primary"
        ? backgroundAppearance === "dark"
          ? semanticColors?.accent?.foregroundOnDark
          : semanticColors?.accent?.foreground
        : backgroundAppearance === "dark"
          ? semanticColors?.base?.ornamentSecondaryInteractionOnDark
          : semanticColors?.base?.ornamentSecondaryInteraction;

  // For secondary variants, Button uses ::before for hover effects
  // So we need to apply the "on" state background to ::before as well
  const isSecondary = sdsType === "secondary";

  if (isSecondary) {
    return css`
      color: ${contentColor};

      svg {
        color: ${ornamentColor};
      }

      /* Apply "on" state background via ::before to match Button's hover pattern */
      &::before {
        background-color: ${sdsStyle === "minimal" && !backgroundOnHover
          ? "transparent"
          : backgroundColor};
      }
    `;
  }

  return css`
    background-color: ${sdsStyle === "minimal" && !backgroundOnHover
      ? "transparent"
      : backgroundColor};
    color: ${contentColor};

    svg {
      color: ${ornamentColor};
    }
  `;
};

export const StyledButtonToggle = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonToggleExtraProps) => {
    const { sdsStage } = props;

    if (sdsStage === "on") {
      return StageOnStyles(props);
    }

    return null;
  }}
`;
