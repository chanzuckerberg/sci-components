import { Button, buttonClasses } from "@mui/material";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import {
  CommonThemeProps,
  fontBodySemiboldXs,
  fontCapsXxxs,
  fontCapsXxs,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getShadows,
  getSpaces,
  fontBodySemiboldXxs,
  fontBody,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { ButtonProps } from ".";

const doNotForwardProps = [
  "isAllCaps",
  "isRounded",
  "sdsStyle",
  "sdsType",
  "sdsSize",
  "hasInvertedStyle",
  "customTheme",
];

type ButtonExtraProps = ButtonProps & CommonThemeProps;

// Rounded + Square Button Styles

const ButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const { variant, startIcon, endIcon, isAllCaps } = props;
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  const hasIcon = !!startIcon || !!endIcon;

  // (masoudmanson): The padding depends on the presence of an icon.
  // If the component has either a startIcon or endIcon, the padding will be spaces?.m pixels.
  // If the component doesn't have any icon at all, the padding will be spaces?.l pixels.
  const padding = hasIcon
    ? `${spaces?.xxs}px ${spaces?.m}px`
    : `${spaces?.xs}px ${spaces?.m}px`;

  const contentColor =
    variant === "outlined"
      ? semanticColors?.accent?.textAction
      : semanticColors?.base?.textOnFill;

  const ornamentColor =
    variant === "outlined"
      ? semanticColors?.accent?.ornament
      : semanticColors?.base?.ornamentOnFill;

  const backgroundColor =
    variant === "outlined"
      ? "transparent"
      : semanticColors?.accent?.fillPrimary;

  const disabledBackgroundColor =
    variant === "outlined" ? "transparent" : semanticColors?.base?.fillDisabled;

  const disabledBorder =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.base?.borderPrimaryDisabled}`
      : "none";

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.accent?.border}`
      : "none";

  fontBody("xs", "semibold");

  return css`
    background-color: ${backgroundColor};
    border: none;
    box-shadow: ${boxshadow};
    padding: ${padding};
    color: ${contentColor};
    line-height: ${isAllCaps ? "20px" : "unset"};
    white-space: nowrap;
    min-width: 120px;

    svg {
      color: ${ornamentColor};
    }

    &:hover {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.accent?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.borderHover};

      svg {
        color: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:active {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.accent?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillPressed};

      svg {
        color: ${semanticColors?.base?.ornamentPrimaryInverse};
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
      height: ${iconSizes?.l?.width}px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        max-width: ${iconSizes?.l?.width}px;
        max-height: ${iconSizes?.l?.width}px;
      }
    }

    .${buttonClasses.startIcon} {
      margin-right: ${spaces?.s}px;
      margin-left: 0;
    }

    .${buttonClasses.endIcon} {
      margin-left: ${spaces?.s}px;
      margin-right: 0;
    }
  `;
};

const Rounded = (props: ButtonExtraProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.l}px;
  `;
};

const DestructiveButton = (props: ButtonExtraProps): SerializedStyles => {
  const { variant } = props;
  const shadows = getShadows(props);
  const semanticColors = getSemanticColors(props);

  const contentColor =
    variant === "outlined"
      ? semanticColors?.negative?.text
      : semanticColors?.base?.textOnFill;

  const ornamentColor =
    variant === "outlined"
      ? semanticColors?.negative?.ornament
      : semanticColors?.base?.ornamentOnFill;

  const backgroundColor =
    variant === "outlined"
      ? "transparent"
      : semanticColors?.negative?.fillPrimary;

  const boxshadow =
    variant === "outlined"
      ? `inset 0 0 0 1px ${semanticColors?.negative?.border}`
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
      background-color: ${semanticColors?.negative?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.fillHover};

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
    const { sdsStyle, sdsType, isAllCaps } = props;

    return css`
      ${isAllCaps ? fontCapsXxs(props) : fontBodySemiboldXs(props)}

      ${ButtonStyles(props)}
      ${sdsStyle === "rounded" && Rounded(props)}
      ${sdsType === "destructive" && DestructiveButton(props)}
    `;
  }}
`;

// Minimal Button Styles

const Minimal = (props: ButtonExtraProps): SerializedStyles => {
  const { isAllCaps } = props;

  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${focusVisibleA11yStyle(props)}
    ${isAllCaps ? fontCapsXxxs(props) : fontBodySemiboldXxs(props)}

    min-width: fit-content;
    padding: ${isAllCaps ? spaces?.s : 7}px ${spaces?.s}px;

    &:hover,
    &:focus-visible {
      color: ${semanticColors?.accent?.textActionHover};

      svg {
        color: ${semanticColors?.accent?.ornamentHover};
      }
    }

    &:hover {
      background-color: ${semanticColors?.base?.fillHover};
    }

    &:active {
      color: ${semanticColors?.accent?.textActionPressed};
      background-color: ${semanticColors?.base?.fillHover};

      svg {
        color: ${semanticColors?.accent?.ornamentPressed};
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
      margin-right: ${spaces?.xxs}px;
      margin-left: 0;
    }

    .${buttonClasses.endIcon} {
      margin-left: ${spaces?.xxs}px;
      margin-right: 0;
    }
  `;
};

const PrimaryMinimalButton = (props: ButtonExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticColors?.accent?.textAction};

    svg {
      color: ${semanticColors?.accent?.ornament};
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

// Legacy support for backwards-compatible props
interface IsRounded extends CommonThemeProps {
  isRounded?: boolean;
}

export const StyledButtonLegacy = styled(Button, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${focusVisibleA11yStyle}
  ${(props: IsRounded) => {
    if (!props.isRounded) return ``;

    const corners = getCorners(props);
    const spaces = getSpaces(props);

    return `
      border-radius: ${corners?.l}px;
      padding: ${spaces?.xs}px ${spaces?.m}px;
    `;
  }}
`;
