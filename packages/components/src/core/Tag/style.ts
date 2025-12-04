import { css, SerializedStyles } from "@emotion/react";
import { alpha, Chip, darken } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXs,
  fontBodyXxxs,
  fontHeaderXs,
  getCorners,
  getIconSizes,
  getSemanticColors,
  getSpaces,
  SDSPalette,
} from "src/core/styles";

export type SdsTagColorType =
  | "info"
  | "positive"
  | "notice"
  | "negative"
  | "neutral"
  | "beta"
  | [string, string]
  | [string, string, string];

interface ExtraSmallTagProps extends CommonThemeProps {
  hover?: boolean;
  sdsType?: "primary" | "secondary";
  sdsStyle?: "square" | "rounded";
  sdsSize?: "s";
  tagColor?: SdsTagColorType;
  icon?: JSX.Element;
}
interface ExtraLargeTagProps extends CommonThemeProps {
  hover?: boolean;
  sdsType?: "primary" | "secondary";
  sdsStyle?: "square" | "rounded";
  sdsSize?: "l";
  tagColor?: SdsTagColorType;
  icon: JSX.Element;
}
export type ExtraTagProps = ExtraSmallTagProps | ExtraLargeTagProps;

const tagSizeS = (props: ExtraTagProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  return css`
    height: unset;
    margin: 0 ${spaces?.xxs}px ${spaces?.xs}px 0;

    .MuiChip-label {
      ${fontBodyXxxs(props)}
      padding: 0;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.xs.height}px;
      width: ${iconSizes?.xs.width}px;
      margin: 0 ${spaces?.xxs}px 0 0;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: ${semanticColors?.base?.ornamentPrimaryInverse};
      margin: 0 0 0 ${spaces?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const tagSizeL = (props: ExtraTagProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);
  const semanticColors = getSemanticColors(props);

  return css`
    height: unset;
    margin: 0 ${spaces?.xxs}px ${spaces?.xs}px 0;

    .MuiChip-label {
      ${fontBodyXs(props)}
      padding: 0;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height}px;
      width: ${iconSizes?.l.width}px;
      margin: 0 ${spaces?.xxs}px 0 0px;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: ${semanticColors?.base?.ornamentPrimaryInverse};
      margin: 0 0 0 ${spaces?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const rounded = (props: ExtraTagProps): SerializedStyles => {
  const corners = getCorners(props);
  const spaces = getSpaces(props);

  const { sdsSize = "s", icon } = props;

  const topBottomPadding =
    sdsSize === "s" ? spaces?.xxxs : icon ? spaces?.xxs : spaces?.xs;
  const rightPadding = sdsSize === "l" && icon ? spaces?.s : spaces?.xs;

  return css`
    border-radius: ${corners?.rounded}px;
    padding: ${topBottomPadding}px ${rightPadding}px ${topBottomPadding}px
      ${spaces?.xs}px;

    &:after {
      content: "";
      border-radius: ${corners?.rounded}px;
    }
  `;
};

const square = (props: ExtraTagProps): SerializedStyles => {
  const corners = getCorners(props);
  const spaces = getSpaces(props);

  const { sdsSize = "s", icon } = props;

  const topBottomPadding =
    sdsSize === "s" ? spaces?.xxxs : icon ? spaces?.xxs : spaces?.xs;

  return css`
    border-radius: ${corners?.m}px;
    padding: ${topBottomPadding}px ${spaces?.xs}px;

    &:after {
      content: "";
      border-radius: ${corners?.m}px;
    }
  `;
};

const withHover = (props: ExtraTagProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    &:hover {
      cursor: pointer;
    }

    &:hover,
    &:focus-visible {
      color: ${semanticColors?.base?.textPrimaryInverse};
    }
  `;
};

const primary = (props: ExtraTagProps): SerializedStyles | undefined => {
  return createTypeCss(props, "primary");
};

const secondary = (props: ExtraTagProps): SerializedStyles | undefined => {
  return createTypeCss(props, "secondary");
};

function generatePrimaryTagColors(
  intent: Extract<SdsTagColorType, string> | null,
  colors: string[],
  semanticColors: SDSPalette | null
) {
  const effectiveIntent = intent || "neutral";
  const intentColors = semanticColors?.[effectiveIntent];
  const hasCustomColors = colors.length >= 2;

  return {
    background: hasCustomColors ? colors[1] : intentColors?.fillPrimary,
    backgroundClicked: hasCustomColors
      ? darken(colors[1], 0.3)
      : intentColors?.fillPressed,
    backgroundHover: hasCustomColors
      ? darken(colors[1], 0.15)
      : intentColors?.fillHover,
    iconColor: hasCustomColors
      ? colors[2]
      : semanticColors?.base?.ornamentOnFill,
    label: colors.length > 0 ? colors[0] : semanticColors?.base?.textOnFill,
    borderColor: alpha(semanticColors?.neutral.border || "#000", 0.6),
  };
}

function generateSecondaryTagColors(
  intent: Extract<SdsTagColorType, string> | null,
  colors: string[],
  semanticColors: SDSPalette | null
) {
  const effectiveIntent = intent || "neutral";
  const intentColors = semanticColors?.[effectiveIntent];
  const hasCustomColors = colors.length >= 2;

  return {
    background: hasCustomColors ? colors[1] : intentColors?.fillSecondary,
    backgroundClicked: hasCustomColors
      ? darken(colors[1], 0.3)
      : intentColors?.fillPressed,
    backgroundHover: hasCustomColors
      ? darken(colors[1], 0.15)
      : intentColors?.fillHover,
    iconColor: hasCustomColors ? colors[2] : intentColors?.ornament,
    label: colors.length > 0 ? colors[0] : intentColors?.text,
    borderColor: hasCustomColors
      ? alpha(colors[1], 0.6)
      : alpha(intentColors?.border || "#000", 0.6),
  };
}

function createTypeCss(
  props: ExtraTagProps,
  type: NonNullable<ExtraTagProps["sdsType"]>
): SerializedStyles | undefined {
  const semanticColors = getSemanticColors(props);

  const intent = typeof props.tagColor === "string" ? props.tagColor : null;
  const colors = Array.isArray(props.tagColor) ? [...props.tagColor] : [];

  const typeToColors = {
    primary: generatePrimaryTagColors(intent, colors, semanticColors),
    secondary: generateSecondaryTagColors(intent, colors, semanticColors),
  };

  const typeColors = typeToColors[type];

  return css`
    ${focusVisibleA11yStyle(props)}

    ${type === "secondary" &&
    css`
      box-shadow: 0 0 0 1px ${typeColors.borderColor};
    `}
    background-color: ${typeColors.background};
    position: relative;

    .MuiChip-label {
      color: ${typeColors.label};
    }

    svg {
      fill: ${typeColors.iconColor};
    }

    &:hover,
    &:active {
      box-shadow: none;
      .MuiChip-label {
        color: ${semanticColors?.base?.textPrimaryInverse};
      }

      svg {
        fill: ${semanticColors?.base?.ornamentPrimaryInverse};
      }
    }

    &:hover {
      background-color: ${typeColors.backgroundHover};
    }

    &:active {
      background-color: ${typeColors.backgroundClicked};
    }

    &.Mui-focusVisible {
      background-color: ${typeColors.backgroundHover};
    }
  `;
}

const typeToCss = {
  primary,
  secondary,
};

const doNotForwardProps = [
  "sdsType",
  "sdsStyle",
  "sdsSize",
  "tagColor",
  "hover",
];

export const StyledTag = styled(Chip, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  border: none;

  ${(props: ExtraTagProps) => {
    const { hover = true, sdsType, sdsStyle, sdsSize = "s" } = props;

    const isRounded = sdsStyle === "rounded";
    const type = sdsType || "primary";

    return css`
      ${sdsSize === "l" ? tagSizeL(props) : tagSizeS(props)}
      ${typeToCss[type](props)}
      ${isRounded ? rounded(props) : square(props)}
      ${hover ? withHover(props) : `pointer-events: none;`}
    `;
  }}
`;
