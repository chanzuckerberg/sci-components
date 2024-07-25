import { Button, buttonClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { css, SerializedStyles } from "@emotion/react";
import {
  CommonThemeProps,
  fontBodySemiboldXs,
  fontCapsXxxs,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";
import { ButtonProps } from ".";

const doNotForwardProps = [
  "isAllCaps",
  "isRounded",
  "sdsStyle",
  "sdsType",
  "sdsSize",
];

type ButtonExtraProps = ButtonProps & CommonThemeProps;

// Rounded + Square Button Styles

const ButtonStyles = (props: ButtonExtraProps): SerializedStyles => {
  const { variant, startIcon, endIcon } = props;
  const spaces = getSpaces(props);
  const shadows = getShadows(props);
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
      : semanticColors?.base?.textPrimaryInverse;

  return css`
    border: none;
    box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.border};
    padding: ${padding};
    color: ${contentColor};

    svg {
      color: ${contentColor};
    }

    &:hover {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.accent?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.borderHover};

      svg {
        color: ${semanticColors?.base?.fill};
      }
    }

    &:active {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.accent?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.fillPressed};

      svg {
        color: ${semanticColors?.base?.fill};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${semanticColors?.base?.fillDisabled};
      border: none;
      box-shadow: ${shadows?.none};

      svg {
        color: ${semanticColors?.base?.iconPrimaryInverse};
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
      ? semanticColors?.negative?.icon
      : semanticColors?.base?.textPrimaryInverse;

  const backgroundColor =
    variant === "outlined" ? "transparent" : semanticColors?.negative?.fill;

  return css`
    border: none;
    box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.border};
    color: ${contentColor};
    background-color: ${backgroundColor};

    svg {
      color: ${contentColor};
    }

    &:hover {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.negative?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.fillHover};

      svg {
        color: ${semanticColors?.base?.fill};
      }
    }

    &:active {
      color: ${semanticColors?.base?.textPrimaryInverse};
      background-color: ${semanticColors?.negative?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px ${semanticColors?.negative?.fillPressed};

      svg {
        color: ${semanticColors?.base?.fill};
      }
    }

    &:disabled {
      color: ${semanticColors?.base?.textDisabled};
      background-color: ${semanticColors?.base?.fillDisabled};
      border: none;
      box-shadow: ${shadows?.none};

      svg {
        color: ${semanticColors?.base?.iconDisabled};
      }
    }
  `;
};

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodySemiboldXs}
  ${focusVisibleA11yStyle}

  ${(props: ButtonExtraProps) => {
    const { sdsStyle, sdsType } = props;

    return css`
      ${ButtonStyles(props)}
      ${sdsStyle === "rounded" && Rounded(props)}
      ${sdsType === "destructive" && DestructiveButton(props)}
    `;
  }}
`;

// Minimal Button Styles

const Minimal = (props: CommonThemeProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${focusVisibleA11yStyle(props)}
    ${fontCapsXxxs(props)}

    min-width: unset;
    padding: ${spaces?.xxs}px 0;

    &:hover,
    &:focus-visible {
      background-color: transparent;
      color: ${semanticColors?.accent?.fillHover};

      svg {
        color: ${semanticColors?.accent?.fillHover};
      }
    }
    &:active {
      color: ${semanticColors?.accent?.fillPressed};

      svg {
        color: ${semanticColors?.accent?.fillPressed};
      }
    }
    &:disabled {
      color: ${semanticColors?.base?.textDisabled};

      svg {
        color: ${semanticColors?.base?.iconDisabled};
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
  `;
};

const SecondaryMinimalButton = (props: ButtonExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticColors?.base?.textPrimary};
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
