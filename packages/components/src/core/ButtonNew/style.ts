/* eslint-disable sonarjs/cognitive-complexity */
import { Button, buttonClasses } from "@mui/material";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import {
  CommonThemeProps,
  fontBodyMediumS,
  fontBodyMediumXxxs,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getShadows,
  getSpaces,
  fontBodyMediumXs,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { ButtonNewProps } from "./ButtonNew.types";

const doNotForwardProps = ["sdsType", "sdsSize"];

type ButtonExtraProps = ButtonNewProps & CommonThemeProps;

const ButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const {
    variant,
    startIcon,
    endIcon,
    size,
    backgroundOnHover = true,
    children,
  } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  const hasIcon = !!startIcon || !!endIcon;
  const onlyIcon = hasIcon && !children;

  // (masoudmanson): The padding depends on the presence of a label.
  // If the component only has either a startIcon or endIcon, the padding will be spaces?.s pixels.
  // If the component has a label, whether it has an icon or not, the padding will be spaces?.m pixels.
  const padding =
    size === "large"
      ? onlyIcon
        ? `0 ${spaces?.s}px`
        : `0 ${spaces?.m}px`
      : size === "medium"
        ? `0 ${spaces?.s}px`
        : onlyIcon
          ? `0 7px`
          : `0 ${spaces?.s}px`;

  const buttonHeight = backgroundOnHover
    ? size === "large"
      ? "32px"
      : size === "medium"
        ? "28px"
        : "24px"
    : size === "large"
      ? "24px"
      : size === "medium"
        ? "24px"
        : "16px";

  const contentColor =
    variant === "contained"
      ? semanticColors?.base?.textOnFill
      : semanticColors?.accent?.foreground;

  const ornamentColor =
    variant === "contained"
      ? semanticColors?.base?.ornamentOnFill
      : semanticColors?.accent?.foreground;

  const backgroundColor =
    variant === "contained"
      ? semanticColors?.accent?.fillPrimary
      : "transparent";

  const disabledBackgroundColor =
    variant === "contained"
      ? semanticColors?.base?.fillDisabled
      : "transparent";

  const disabledBorder =
    variant === "contained"
      ? "none"
      : `inset 0 0 0 1px ${semanticColors?.base?.borderPrimaryDisabled}`;

  const boxshadow =
    variant === "contained" || variant === "text"
      ? "none"
      : `inset 0 0 0 1px ${semanticColors?.accent?.foreground}`;

  const iconSize =
    size === "large"
      ? iconSizes?.s?.width
      : size === "medium"
        ? iconSizes?.xs?.width
        : iconSizes?.xxs?.width;

  const gap =
    size === "large" ? spaces?.s : size === "medium" ? spaces?.xs : spaces?.xxs;

  return css`
    ${size === "small" ? fontBodyMediumXxxs(props) : fontBodyMediumS(props)}
    height: ${buttonHeight};
    background-color: ${backgroundColor};
    border: none;
    border-radius: ${corners?.l}px;
    box-shadow: ${boxshadow};
    padding: ${padding};
    color: ${contentColor};
    white-space: nowrap;
    min-width: fit-content;
    gap: ${gap}px;

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      color: ${variant === "contained"
        ? semanticColors?.base?.textPrimaryInverse
        : semanticColors?.accent?.foregroundInteraction};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillInteraction
        : semanticColors?.accent?.surfaceSecondary};
      border: none;
      box-shadow: inset 0 0 0 1px
        ${semanticColors?.accent?.foregroundInteraction};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : semanticColors?.accent?.foregroundInteraction};
      }
    }

    &:active {
      color: ${variant === "contained"
        ? semanticColors?.base?.textPrimaryInverse
        : semanticColors?.accent?.foregroundPressed};
      background-color: ${variant === "contained"
        ? semanticColors?.accent?.fillPressed
        : semanticColors?.accent?.surfaceSecondary};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillPressed};

      svg {
        color: ${variant === "contained"
          ? semanticColors?.base?.ornamentPrimaryInverse
          : semanticColors?.accent?.foregroundPressed};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${disabledBackgroundColor};
      box-shadow: ${disabledBorder};
      border: none;

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }
    }

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
      height: ${iconSize}px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        max-width: ${iconSize}px;
        max-height: ${iconSize}px;
      }
    }

    .${buttonClasses.startIcon} {
      margin-right: 0;
      margin-left: 0;
    }

    .${buttonClasses.endIcon} {
      margin-left: 0;
      margin-right: 0;
    }
  `;
};

const DestructiveButton = (props: ButtonExtraProps): SerializedStyles => {
  const { variant } = props;
  const shadows = getShadows(props);
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "outlined"
      ? semanticColors?.negative?.foreground
      : semanticColors?.base?.textOnFill;

  const ornamentColor =
    variant === "outlined"
      ? semanticColors?.negative?.foreground
      : semanticColors?.base?.ornamentOnFill;

  const backgroundColor =
    variant === "outlined"
      ? "transparent"
      : semanticColors?.negative?.fillPrimary;

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.negative?.foreground}`
      : "none";

  return css`
    border: none;
    box-shadow: ${boxshadow};
    color: ${contentColor};
    background-color: ${backgroundColor};

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.negative?.fillInteraction};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.fillInteraction};

      svg {
        color: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:active {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.negative?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.fillPressed};

      svg {
        color: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${semanticColors?.base?.fillDisabled};
      border: none;
      box-shadow: ${shadows?.none};

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }
    }
  `;
};

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${focusVisibleA11yStyle}

  ${(props: ButtonExtraProps) => {
    const { sdsType } = props;

    return css`
      ${ButtonStyles(props)}
      ${sdsType === "destructive" && DestructiveButton(props)}
    `;
  }}
`;

// Minimal Button Styles

const Minimal = (props: ButtonExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);
  const corners = getCorners(props);

  return css`
    ${focusVisibleA11yStyle(props)}
    ${fontBodyMediumXs(props)}

    min-width: fit-content;
    padding: 7px ${spaces?.s}px;
    border-radius: ${corners?.l}px;

    &:hover,
    &:focus-visible {
      color: ${semanticColors?.accent?.foregroundInteraction};

      svg {
        color: ${semanticColors?.accent?.foregroundInteraction};
      }
    }

    &:hover {
      background-color: ${semanticColors?.base?.fillPrimaryInteraction};
    }

    &:active {
      color: ${semanticColors?.accent?.foregroundPressed};
      background-color: ${semanticColors?.base?.fillPrimaryInteraction};

      svg {
        color: ${semanticColors?.accent?.foregroundPressed};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
      }
    }

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
      height: ${iconSizes?.s?.width}px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        max-width: ${iconSizes?.s?.width}px;
        max-height: ${iconSizes?.s?.width}px;
      }
    }

    .${buttonClasses.startIcon} {
      margin-right: ${spaces?.xs}px;
      margin-left: 0;
    }

    .${buttonClasses.endIcon} {
      margin-left: ${spaces?.xs}px;
      margin-right: 0;
    }
  `;
};

const PrimaryMinimalButton = (props: ButtonExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticColors?.accent?.foreground};

    svg {
      color: ${semanticColors?.accent?.foreground};
    }
  `;
};

const SecondaryMinimalButton = (props: ButtonExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticColors?.base?.textPrimary};

    svg {
      color: ${semanticColors?.base?.ornamentPrimary};
    }
  `;
};

export const StyledMinimalButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: ButtonExtraProps) => {
    const { sdsType } = props;

    return css`
      ${sdsType === "primary" && PrimaryMinimalButton(props)}
      ${sdsType === "secondary" && SecondaryMinimalButton(props)}
    `;
  }}
`;
