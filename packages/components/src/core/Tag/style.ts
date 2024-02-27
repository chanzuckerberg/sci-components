import { css, SerializedStyles } from "@emotion/react";
import { Chip, darken } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxxs,
  fontHeaderXs,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
  SemanticComponentColors,
} from "../styles";

export type SdsTagColorType =
  | "accent"
  | "info"
  | "positive"
  | "notice"
  | "negative"
  | "neutral"
  | "beta"
  | [string, string]
  | [string, string, string];
export interface ExtraTagProps extends CommonThemeProps {
  hover?: boolean;
  sdsType?: "primary" | "secondary";
  sdsStyle?: "square" | "rounded";
  tagColor?: SdsTagColorType;
  icon?: JSX.Element;
}

const withoutIcon = (props: ExtraTagProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

  return css`
    height: unset;
    margin: 0 ${spaces?.xxs}px ${spaces?.xs}px 0;

    .MuiChip-label {
      ${fontBodyXxxs(props)}
      padding: 0;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: white;
      margin: 0 0 0 ${spaces?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const withIcon = (props: ExtraTagProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const iconSizes = getIconSizes(props);

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
      padding-right: ${spaces?.xxs}px;
      margin: 0 0 0 -${spaces?.xxxs}px;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: white;
      margin: 0 0 0 ${spaces?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const rounded = (props: ExtraTagProps): SerializedStyles => {
  const corners = getCorners(props);
  const spaces = getSpaces(props);

  const { icon } = props;

  return css`
    border-radius: ${corners?.l}px;
    padding: ${icon
      ? `${spaces?.xxs}px ${spaces?.s}px ${spaces?.xxs}px ${spaces?.xs}px`
      : `${spaces?.xxxs}px ${spaces?.s}px`};

    &:after {
      border-radius: ${corners?.l}px;
    }
  `;
};

const square = (props: ExtraTagProps): SerializedStyles => {
  const corners = getCorners(props);
  const spaces = getSpaces(props);

  const { icon } = props;

  return css`
    border-radius: ${corners?.m}px;
    padding: ${icon
      ? `${spaces?.xxs}px ${spaces?.s}px`
      : `${spaces?.xxxs}px ${spaces?.xs}px`};

    &:after {
      border-radius: ${corners?.m}px;
    }
  `;
};

const withHover = (props: ExtraTagProps): SerializedStyles => {
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    &:hover {
      cursor: pointer;
    }

    &:hover,
    &:focus-visible {
      color: ${semanticTextColors?.base?.onFill};
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
  semanticColors: SemanticComponentColors | null
) {
  if (intent) {
    return {
      background:
        colors.length >= 2 ? colors[1] : semanticColors?.[intent].fill,
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : semanticColors?.[intent].fillPressed,
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : semanticColors?.[intent].fillHover,
      iconColor: colors.length > 2 ? colors[2] : "white",
      label: colors.length ? colors[0] : "white",
    };
  } else {
    return {
      background: semanticColors?.neutral.fill,
      backgroundClicked: semanticColors?.neutral.fillPressed,
      backgroundHover: semanticColors?.neutral.fillHover,
      iconColor: "white",
      label: "white",
    };
  }
}

function generateSecondaryTagColors(
  intent: Extract<SdsTagColorType, string> | null,
  colors: string[],
  semanticColors: SemanticComponentColors | null
) {
  if (intent) {
    return {
      background:
        colors.length >= 2 ? colors[1] : semanticColors?.[intent].surface,
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : semanticColors?.[intent].fillPressed,
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : semanticColors?.[intent].fillHover,
      iconColor: colors.length > 2 ? colors[2] : semanticColors?.[intent].icon,
      label: colors.length ? colors[0] : semanticColors?.[intent].fillPressed,
    };
  } else {
    return {
      background: semanticColors?.neutral.surface,
      backgroundClicked: semanticColors?.neutral.fillPressed,
      backgroundHover: semanticColors?.neutral.fillHover,
      iconColor: semanticColors?.neutral.icon,
      label: semanticColors?.neutral.fillPressed,
    };
  }
}

function createTypeCss(
  props: ExtraTagProps,
  type: NonNullable<ExtraTagProps["sdsType"]>
): SerializedStyles | undefined {
  const semanticColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  const intent = typeof props.tagColor === "string" ? props.tagColor : null;
  const colors = Array.isArray(props.tagColor) ? [...props.tagColor] : [];

  const typeToColors = {
    primary: generatePrimaryTagColors(intent, colors, semanticColors),
    secondary: generateSecondaryTagColors(intent, colors, semanticColors),
  };

  const typeColors = typeToColors[type];

  return css`
    background-color: ${typeColors.background};
    position: relative;

    .MuiChip-label {
      color: ${typeColors.label};
    }

    svg {
      fill: ${typeColors.iconColor};
    }

    &:hover,
    &:active,
    &:focus {
      .MuiChip-label {
        color: ${semanticTextColors?.base?.onFill};
      }

      svg {
        fill: ${semanticTextColors?.base?.onFill};
      }
    }

    &:hover {
      background-color: ${typeColors.backgroundHover};
    }

    &:active {
      background-color: ${typeColors.backgroundClicked};
    }

    &:focus {
      background-color: ${typeColors.background};
    }

    &:focus:hover {
      background-color: ${typeColors.backgroundHover};
    }

    &:focus:active {
      background-color: ${typeColors.backgroundClicked};
    }
  `;
}

const typeToCss = {
  primary,
  secondary,
};

const doNotForwardProps = ["sdsType", "sdsStyle", "tagColor", "hover"];

export const StyledTag = styled(Chip, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  border: none;

  ${(props: ExtraTagProps) => {
    const { hover = true, sdsType, sdsStyle, icon } = props;

    const isRounded = sdsStyle === "rounded";
    const type = sdsType || "primary";

    return css`
      ${icon ? withIcon(props) : withoutIcon(props)}
      ${typeToCss[type](props)}
      ${isRounded ? rounded(props) : square(props)}
      ${hover ? withHover(props) : `pointer-events: none;`}
    `;
  }}
`;
