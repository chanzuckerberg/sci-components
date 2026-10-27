import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { alpha, Chip, emphasize } from "@mui/material";
import { ElementType } from "react";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXs,
  fontBodyXxxxs,
  getColors,
  getCorners,
  getIconSizes,
  getMode,
  getSemanticColors,
  getSpaces,
} from "@components/src/core/styles";

export type SdsTagIntent =
  | "accent"
  | "beta"
  | "info"
  | "negative"
  | "neutral"
  | "notice"
  | "positive";

export type SdsTagColorType =
  | SdsTagIntent
  | [string, string]
  | [string, string, string];

export type SdsTagStyle = "solid" | "outline";

export type SdsTagSize = "small" | "medium";

export const TAG_LABEL_TEXT_CLASS = "SdsTag-labelText";
export const TAG_LINK_ICON_CLASS = "SdsTag-linkIcon";

const TAG_HEIGHTS: Record<SdsTagSize, number> = {
  medium: 24,
  small: 20,
};

const OUTLINE_BORDER_OPACITY = { dark: 0.56, light: 0.28 };

export interface ExtraTagProps extends CommonThemeProps {
  iconOnly?: boolean;
  isInteractive?: boolean;
  sdsStyle?: SdsTagStyle;
  size?: SdsTagSize;
  tagColor?: SdsTagColorType;
}

interface TagRootProps {
  component?: ElementType;
  href?: string;
  rel?: string;
  target?: string;
}

interface TagStateColors {
  background?: string;
  border?: string;
  icon?: string;
  label?: string;
}

interface TagColors {
  disabled: TagStateColors;
  hover: TagStateColors;
  pressed: TagStateColors;
  rest: TagStateColors;
}

/**
 * MUI's color helpers throw on anything they cannot parse, such as a named
 * color or a CSS variable, so a custom color they cannot read is used as given.
 */
function safely(
  transform: (color: string, amount: number) => string,
  color: string,
  amount: number
): string {
  try {
    return transform(color, amount);
  } catch {
    return color;
  }
}

function disabledColors(
  props: ExtraTagProps,
  sdsStyle: SdsTagStyle
): TagStateColors {
  const base = getSemanticColors(props)?.base;

  return {
    background: sdsStyle === "solid" ? base?.fillDisabled : "transparent",
    border: sdsStyle === "outline" ? base?.borderPrimaryDisabled : undefined,
    icon: base?.ornamentDisabled,
    label: base?.textDisabled,
  };
}

function intentColors(
  props: ExtraTagProps,
  intent: SdsTagIntent,
  sdsStyle: SdsTagStyle
): TagColors {
  const semanticColors = getSemanticColors(props);
  const base = semanticColors?.base;
  const palette = semanticColors?.[intent];
  const disabled = disabledColors(props, sdsStyle);

  if (sdsStyle === "solid") {
    const onInteraction = {
      icon: base?.ornamentPrimaryInverse,
      label: base?.textPrimaryInverse,
    };

    return {
      disabled,
      hover: { background: palette?.fillInteraction, ...onInteraction },
      pressed: { background: palette?.fillPressed, ...onInteraction },
      rest: {
        background: palette?.fillPrimary,
        icon: base?.ornamentOnFill,
        label: base?.textOnFill,
      },
    };
  }

  const background =
    intent === "accent"
      ? semanticColors?.accent?.surfaceSecondary
      : semanticColors?.[intent]?.fillSecondary;

  // Accent's foreground sits a step lighter than its border in light mode.
  const borderBase =
    intent === "accent" ? getColors(props)?.indigo[600] : palette?.foreground;

  const opacity = OUTLINE_BORDER_OPACITY[getMode(props)];

  const stateOf = (color?: string) => ({
    background,
    border: color,
    icon: color,
    label: color,
  });

  return {
    disabled,
    hover: stateOf(palette?.foregroundInteraction),
    pressed: stateOf(palette?.foregroundPressed),
    rest: {
      ...stateOf(palette?.foreground),
      border: borderBase ? safely(alpha, borderBase, opacity) : undefined,
    },
  };
}

function customColors(
  props: ExtraTagProps,
  [label, background, icon = label]:
    | [string, string]
    | [string, string, string],
  sdsStyle: SdsTagStyle
): TagColors {
  const disabled = disabledColors(props, sdsStyle);

  if (sdsStyle === "solid") {
    const rest = { background, icon, label };

    return {
      disabled,
      hover: { ...rest, background: safely(emphasize, background, 0.15) },
      pressed: { ...rest, background: safely(emphasize, background, 0.3) },
      rest,
    };
  }

  const opacity = OUTLINE_BORDER_OPACITY[getMode(props)];
  const rest = {
    background,
    border: safely(alpha, label, opacity),
    icon,
    label,
  };

  return {
    disabled,
    hover: { ...rest, border: label },
    pressed: {
      ...rest,
      background: safely(emphasize, background, 0.15),
      border: label,
    },
    rest,
  };
}

function stateColors({
  background,
  border,
  icon,
  label,
}: TagStateColors): SerializedStyles {
  return css`
    background-color: ${background};
    box-shadow: ${border ? `inset 0 0 0 1px ${border}` : "none"};
    color: ${label};

    .MuiChip-label {
      color: ${label};
    }

    .MuiChip-icon,
    .MuiChip-deleteIcon,
    .${TAG_LINK_ICON_CLASS} {
      color: ${icon};
      fill: ${icon};
    }
  `;
}

function interactiveStyles(
  props: ExtraTagProps,
  colors: TagColors
): SerializedStyles {
  return css`
    cursor: pointer;

    ${focusVisibleA11yStyle(props)}

    &:hover,
    &.Mui-focusVisible {
      ${stateColors(colors.hover)}
    }

    &:active {
      ${stateColors(colors.pressed)}
    }
  `;
}

function sizeStyles(props: ExtraTagProps): SerializedStyles {
  const { iconOnly = false, size = "medium" } = props;

  const spaces = getSpaces(props);
  const corners = getCorners(props);
  const iconSizes = getIconSizes(props);

  const height = TAG_HEIGHTS[size];
  const iconSize = size === "small" ? iconSizes?.xxs : iconSizes?.xs;

  return css`
    ${size === "small" ? fontBodyXxxxs(props) : fontBodyXs(props)}

    gap: ${spaces?.xxs}px;
    height: ${height}px;

    ${iconOnly
      ? css`
          border-radius: ${corners?.m}px;
          padding: 0;
          width: ${height}px;
        `
      : css`
          border-radius: ${corners?.rounded}px;
          padding: 0 ${spaces?.s}px;
        `}

    .MuiChip-icon,
    .MuiChip-deleteIcon,
    .${TAG_LINK_ICON_CLASS} {
      flex-shrink: 0;
      height: ${iconSize?.height}px;
      margin: 0;
      width: ${iconSize?.width}px;
    }

    .MuiChip-label {
      align-items: center;
      display: flex;
      gap: ${spaces?.xxs}px;
      min-width: 0;
      overflow: hidden;
      padding: 0;
    }

    .${TAG_LABEL_TEXT_CLASS} {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ${iconOnly &&
    css`
      .MuiChip-label {
        border: 0;
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        position: absolute;
        width: 1px;
      }
    `}
  `;
}

const doNotForwardProps = ["iconOnly", "isInteractive", "sdsStyle", "tagColor"];

export const StyledTag = styled(Chip, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<ExtraTagProps & TagRootProps>`
  border: none;
  box-sizing: border-box;
  max-width: 100%;
  position: relative;

  ${(props: ExtraTagProps) => {
    const {
      isInteractive = false,
      sdsStyle = "solid",
      tagColor = "neutral",
    } = props;

    const colors = Array.isArray(tagColor)
      ? customColors(props, tagColor, sdsStyle)
      : intentColors(props, tagColor, sdsStyle);

    return css`
      ${sizeStyles(props)}
      ${stateColors(colors.rest)}
      ${isInteractive && interactiveStyles(props, colors)}

      &.Mui-disabled {
        opacity: 1;
        ${stateColors(colors.disabled)}
      }
    `;
  }}
`;
