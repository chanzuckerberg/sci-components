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

/**
 * Utility to select the appropriate color based on background appearance.
 * Returns the dark variant when backgroundAppearance is "dark", otherwise returns the light variant.
 */
const getAppearanceColor = (
  lightColor: string | undefined,
  darkColor: string | undefined,
  backgroundAppearance: "dark" | "matchBackground"
): string | undefined => {
  return backgroundAppearance === "dark" ? darkColor : lightColor;
};

const StageOnStyles = (props: ButtonToggleExtraProps): SerializedStyles => {
  const {
    sdsType,
    sdsStyle,
    backgroundOnHover,
    backgroundAppearance = "matchBackground",
  } = props;
  const semanticColors = getSemanticColors(props);

  const contentColor =
    sdsType === "primary"
      ? getAppearanceColor(
          semanticColors?.accent?.foreground,
          semanticColors?.accent?.foregroundOnDark,
          backgroundAppearance
        )
      : getAppearanceColor(
          semanticColors?.base?.textPrimary,
          semanticColors?.base?.textPrimaryOnDark,
          backgroundAppearance
        );

  const backgroundColor =
    sdsStyle === "outline" && sdsType === "primary"
      ? getAppearanceColor(
          semanticColors?.accent?.surfaceSecondary,
          semanticColors?.accent?.surfaceSecondaryOnDark,
          backgroundAppearance
        )
      : getAppearanceColor(
          semanticColors?.base?.fillPrimaryInteraction,
          semanticColors?.base?.fillPrimaryInteractionOnDark,
          backgroundAppearance
        );

  const ornamentColor =
    sdsStyle === "outline"
      ? sdsType === "primary"
        ? getAppearanceColor(
            semanticColors?.accent?.foreground,
            semanticColors?.accent?.foregroundOnDark,
            backgroundAppearance
          )
        : getAppearanceColor(
            semanticColors?.base?.ornamentPrimary,
            semanticColors?.base?.ornamentPrimaryOnDark,
            backgroundAppearance
          )
      : sdsType === "primary"
        ? getAppearanceColor(
            semanticColors?.accent?.foreground,
            semanticColors?.accent?.foregroundOnDark,
            backgroundAppearance
          )
        : getAppearanceColor(
            semanticColors?.base?.ornamentSecondaryInteraction,
            semanticColors?.base?.ornamentSecondaryInteractionOnDark,
            backgroundAppearance
          );

  // For secondary variants, Button uses ::before for hover effects
  // So we need to apply the "on" state background to ::before as well
  const isSecondary = sdsType === "secondary";

  if (isSecondary) {
    /**
     * Specificity boost via Emotion's `&&&&` technique.
     *
     * Each `&` repeats the component's generated class, producing a selector
     * like `.css-abc123.css-abc123.css-abc123.css-abc123` — specificity (0,4,0).
     *
     * This is needed because ButtonGroup styles its children with
     * `&& .MuiButtonGroup-grouped` which has specificity (0,3,0).
     * Without the boost, the sdsStage="on" styles would always lose
     * the cascade to the ButtonGroup's parent-level overrides.
     */
    return css`
      &&&& {
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
      }
    `;
  }

  return css`
    &&&& {
      background-color: ${sdsStyle === "minimal" && !backgroundOnHover
        ? "transparent"
        : backgroundColor};
      color: ${contentColor};

      svg {
        color: ${ornamentColor};
      }
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
