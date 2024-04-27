import { Button, buttonClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
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

const sdsPropNames = [
  "isAllCaps",
  "isRounded",
  "sdsStyle",
  "sdsType",
  "sdsSize",
];

const ButtonBase = styled(Button, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  ${fontBodySemiboldXs}
  ${focusVisibleA11yStyle}
  ${(props) => {
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

    return `
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
        box-shadow: inset 0 0 0 1px ${semanticComponentColors?.accent?.borderHover};

        svg {
          color: ${semanticComponentColors?.base?.fill};
        }
      }

      &:active {
        color: ${semanticTextColors?.base?.onFill};
        background-color: ${semanticComponentColors?.accent?.fillPressed};
        border: none;
        box-shadow: inset 0 0 0 1px ${semanticComponentColors?.accent?.fillPressed};

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
  }}
`;

export const RoundedButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  ${(props) => {
    const corners = getCorners(props);

    return `
      border-radius: ${corners?.l}px;
    `;
  }}
`;

export const SquareButton = ButtonBase;

interface IsAllCaps extends CommonThemeProps {
  isAllCaps?: boolean;
}

const MinimalButton = styled(Button, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
})`
  ${focusVisibleA11yStyle}

  ${(props: IsAllCaps) => {
    const spaces = getSpaces(props);

    return `
      padding: ${spaces?.xxs}px 0;
    `;
  }}

  ${(props: IsAllCaps) => {
    if (props?.isAllCaps) {
      return fontCapsXxxs;
    }
    return ``;
  }}
  &:hover, &:focus-visible {
    background-color: transparent;
  }
`;

const minimal = (props: CommonThemeProps) => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticTextColors = getSemanticTextColors(props);
  const semanticComponentColors = getSemanticComponentColors(props);

  return `
    min-width: unset;
    &:hover, &:focus-visible {
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

export const PrimaryMinimalButton = styled(MinimalButton)`
  ${minimal}
`;

export const SecondaryMinimalButton = styled(MinimalButton)`
  ${minimal}
  ${(props: CommonThemeProps) => {
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.primary};
    `;
  }}
`;

// Legacy support for backwards-compatible props
interface IsRounded extends CommonThemeProps {
  isRounded?: boolean;
}
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => !sdsPropNames.includes(prop as string),
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
