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

const sdsPropNames = ["isAllCaps", "isRounded", "sdsStyle", "sdsType"];

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

    // (masoudmanson): The padding for the contained variant depends on the presence of an icon.
    // If the component has either a startIcon or endIcon, the padding will be different.
    // If the component doesn't have any icon at all, the padding will be different.
    const containedPadding = hasIcon
      ? `${spaces?.xxs}px ${spaces?.m}px`
      : `${spaces?.xs}px ${spaces?.l}px`;

    // (thuang): outline variant has border 1px, so padding needs to be smaller
    const outlinedPadding = hasIcon
      ? `${(spaces?.xxs || 0) - 1}px ${(spaces?.m || 0) - 1}px`
      : `${(spaces?.xs || 0) - 1}px ${(spaces?.m || 0) - 1}px`;

    const padding = variant === "outlined" ? outlinedPadding : containedPadding;

    const outlineBorder =
      variant === "outlined"
        ? `border-color: ${semanticComponentColors?.accent?.border};`
        : "";

    return `
      ${outlineBorder}
      padding: ${padding};
      min-width: 120px;
      box-shadow: ${shadows?.none};

      &:hover {
        color: ${semanticTextColors?.base?.onFill};
        background-color: ${semanticComponentColors?.accent?.fillHover};
        box-shadow: ${shadows?.none};
      }

      &:active {
        color: ${semanticTextColors?.base?.onFill};
        background-color: ${semanticComponentColors?.accent?.fillPressed};
        box-shadow: ${shadows?.none};
      }

      &:disabled {
        color: ${semanticTextColors?.base?.onFillDisabled};
        background-color: ${semanticComponentColors?.base?.fillDisabled};
        border-color: ${semanticComponentColors?.base?.borderDisabled};
      }

      .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
        width: ${iconSizes?.l?.width}px;
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
        margin-right: ${spaces?.m}px;
        margin-left: 0;
      }

      .${buttonClasses.endIcon} {
        margin-left: ${spaces?.m}px;
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
    &:hover, &:focus-visible {
      color: ${semanticComponentColors?.accent?.fillHover};
    }
    &:active {
      color: ${semanticComponentColors?.accent?.fillPressed};
    }
    &:disabled {      
      color: ${semanticTextColors?.base?.onFillDisabled};
    }

    .${buttonClasses.startIcon}, .${buttonClasses.endIcon} {
      width: ${iconSizes?.s?.width}px;
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
    }

    .${buttonClasses.endIcon} {
      margin-left: ${spaces?.xxs}px;
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
      padding: ${spaces?.xs}px ${spaces?.l}px;
      min-width: 120px;
    `;
  }}
`;
