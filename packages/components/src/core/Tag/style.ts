import { css, SerializedStyles } from "@emotion/react";
import { Chip, darken } from "@mui/material";
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
      margin: 0 ${spaces?.xxs}px 0 -${spaces?.xxxs}px;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: ${semanticColors?.base?.iconPrimaryInverse};
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
      margin: 0 ${spaces?.xxs}px 0 -${spaces?.xxxs}px;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: ${semanticColors?.base?.iconPrimaryInverse};
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

  return css`
    border-radius: ${corners?.l}px;
    padding: ${topBottomPadding}px ${spaces?.s}px;

    &:after {
      border-radius: ${corners?.l}px;
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
    padding: ${topBottomPadding}px ${spaces?.s}px;

    &:after {
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
  if (intent || colors.length) {
    intent = intent || "neutral";

    return {
      background:
        colors.length >= 2 ? colors[1] : semanticColors?.[intent].fillPrimary,
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : semanticColors?.[intent].fillPressed,
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : semanticColors?.[intent].fillHover,
      iconColor:
        colors.length > 2
          ? colors[2]
          : semanticColors?.base?.iconPrimaryInverse,
      label: colors.length
        ? colors[0]
        : semanticColors?.base?.textPrimaryInverse,
    };
  } else {
    return {
      background: semanticColors?.neutral.fillPrimary,
      backgroundClicked: semanticColors?.neutral.fillPressed,
      backgroundHover: semanticColors?.neutral.fillHover,
      iconColor: semanticColors?.base?.iconPrimaryInverse,
      label: semanticColors?.base?.textPrimaryInverse,
    };
  }
}

function generateSecondaryTagColors(
  intent: Extract<SdsTagColorType, string> | null,
  colors: string[],
  semanticColors: SDSPalette | null
) {
  if (intent || colors.length) {
    intent = intent || "neutral";

    return {
      background:
        colors.length >= 2 ? colors[1] : semanticColors?.[intent].fillSecondary,
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : semanticColors?.[intent].fillPressed,
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : semanticColors?.[intent].fillHover,
      iconColor:
        colors.length > 2 ? colors[2] : semanticColors?.[intent].ornament,
      label: colors.length ? colors[0] : semanticColors?.[intent].text,
    };
  } else {
    return {
      background: semanticColors?.neutral.surfacePrimary,
      backgroundClicked: semanticColors?.neutral.fillPressed,
      backgroundHover: semanticColors?.neutral.fillHover,
      iconColor: semanticColors?.neutral.ornament,
      label: semanticColors?.neutral.fillPressed,
    };
  }
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
      .MuiChip-label {
        color: ${semanticColors?.base?.textPrimaryInverse};
      }

      svg {
        fill: ${semanticColors?.base?.iconPrimaryInverse};
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
    }x
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
