import { Button, buttonClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { css, SerializedStyles } from "@emotion/react";
import {
  CommonThemeProps,
  fontBodySemiboldXs,
  fontCapsXxxs,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
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
  const semanticTextColors = getSemanticTextColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  const hasIcon = !!startIcon || !!endIcon;

  // (masoudmanson): The padding depends on the presence of an icon.
  // If the component has either a startIcon or endIcon, the padding will be spaces?.m pixels.
  // If the component doesn't have any icon at all, the padding will be spaces?.l pixels.
  const padding = hasIcon
    ? `${spaces?.xxs}px ${spaces?.m}px`
    : `${spaces?.xs}px ${spaces?.m}px`;

  const contentColor =
    variant === "outlined"
      ? semanticTextColors?.action?.default
      : semanticTextColors?.base?.onFill;

  return css`
    border: none;
    box-shadow: inset 0 0 0 1px ${semanticComponentColors?.accent?.border};
    padding: ${padding};
    color: ${contentColor};

    svg {
      color: ${contentColor};
    }

    &:hover {
      color: ${semanticTextColors?.base?.onFill};
      background-color: ${semanticComponentColors?.accent?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px
        ${semanticComponentColors?.accent?.borderHover};

      svg {
        color: ${semanticComponentColors?.base?.fill};
      }
    }

    &:active {
      color: ${semanticTextColors?.base?.onFill};
      background-color: ${semanticComponentColors?.accent?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px
        ${semanticComponentColors?.accent?.fillPressed};

      svg {
        color: ${semanticComponentColors?.base?.fill};
      }
    }

    &:disabled {
      color: ${semanticTextColors?.base?.onFillDisabled};
      background-color: ${semanticComponentColors?.base?.fillDisabled};
      border: none;
      box-shadow: ${shadows?.none};

      svg {
        color: ${semanticComponentColors?.base?.onFillDisabled};
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
  const semanticTextColors = getSemanticTextColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  const contentColor =
    variant === "outlined"
      ? semanticComponentColors?.negative?.icon
      : semanticTextColors?.base?.onFill;

  const backgroundColor =
    variant === "outlined"
      ? "transparent"
      : semanticComponentColors?.negative?.fill;

  return css`
    border: none;
    box-shadow: inset 0 0 0 1px ${semanticComponentColors?.negative?.border};
    color: ${contentColor};
    background-color: ${backgroundColor};

    svg {
      color: ${contentColor};
    }

    &:hover {
      color: ${semanticTextColors?.base?.onFill};
      background-color: ${semanticComponentColors?.negative?.fillHover};
      border: none;
      box-shadow: inset 0 0 0 1px
        ${semanticComponentColors?.negative?.fillHover};

      svg {
        color: ${semanticComponentColors?.base?.fill};
      }
    }

    &:active {
      color: ${semanticTextColors?.base?.onFill};
      background-color: ${semanticComponentColors?.negative?.fillPressed};
      border: none;
      box-shadow: inset 0 0 0 1px
        ${semanticComponentColors?.negative?.fillPressed};

      svg {
        color: ${semanticComponentColors?.base?.fill};
      }
    }

    &:disabled {
      color: ${semanticTextColors?.base?.onFillDisabled};
      background-color: ${semanticComponentColors?.base?.fillDisabled};
      border: none;
      box-shadow: ${shadows?.none};

      svg {
        color: ${semanticComponentColors?.base?.onFillDisabled};
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
  const semanticTextColors = getSemanticTextColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    ${focusVisibleA11yStyle()}
    ${fontCapsXxxs(props)}

    min-width: unset;
    padding: ${spaces?.xxs}px 0;

    &:hover,
    &:focus-visible {
      background-color: transparent;
      color: ${semanticComponentColors?.accent?.fillHover};

      svg {
        color: ${semanticComponentColors?.accent?.fillHover};
      }
    }
    &:active {
      color: ${semanticComponentColors?.accent?.fillPressed};

      svg {
        color: ${semanticComponentColors?.accent?.fillPressed};
      }
    }
    &:disabled {
      color: ${semanticTextColors?.base?.onFillDisabled};

      svg {
        color: ${semanticTextColors?.base?.onFillDisabled};
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
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticTextColors?.action?.default};
  `;
};

const SecondaryMinimalButton = (props: ButtonExtraProps): SerializedStyles => {
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticTextColors?.base?.primary};
  `;
};

const DestructiveMinimalButton = (
  props: ButtonExtraProps
): SerializedStyles => {
  const semanticTextColors = getSemanticTextColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    ${Minimal(props)}
    color: ${semanticComponentColors?.negative?.fill};

    &:hover,
    &:focus-visible {
      background-color: transparent;
      color: ${semanticComponentColors?.negative?.fillHover};

      svg {
        color: ${semanticComponentColors?.negative?.fillHover};
      }
    }
    &:active {
      color: ${semanticComponentColors?.negative?.fillPressed};

      svg {
        color: ${semanticComponentColors?.negative?.fillPressed};
      }
    }
    &:disabled {
      color: ${semanticTextColors?.base?.onFillDisabled};

      svg {
        color: ${semanticTextColors?.base?.onFillDisabled};
      }
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
      ${sdsType === "destructive" && DestructiveMinimalButton(props)}
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
