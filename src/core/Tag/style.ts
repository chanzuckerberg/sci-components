import { css, SerializedStyles } from "@emotion/react";
import { Chip, darken } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxxs,
  fontHeaderXs,
  getColors,
  getCorners,
  getIconSizes,
  getSpaces,
} from "../styles";

export interface ExtraProps extends CommonThemeProps {
  sdsType?: "primary" | "secondary";
  sdsStyle?: "square" | "rounded";
  tagColor?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "gray"
    | "beta"
    | [string, string]
    | [string, string, string];
  icon?: JSX.Element;
}

const withoutIcon = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);
  const iconSizes = getIconSizes(props);

  return css`
    height: unset;

    &:hover {
      cursor: pointer;
    }

    .MuiChip-label {
      ${fontBodyXxxs(props)}
      padding: 0;
      line-height: unset;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: white;
      margin: 0 0 0 ${spacings?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &:hover,
      &:focus-visible {
        color: white;
      }
    }
  `;
};

const withIcon = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);
  const iconSizes = getIconSizes(props);

  return css`
    height: unset;

    &:hover {
      cursor: pointer;
    }

    .MuiChip-label {
      ${fontBodyXs(props)}
      padding: 0;
      line-height: unset;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height};
      width: ${iconSizes?.l.width};
      padding-right: ${spacings?.xxs}px;
      margin: 0 0 0 -${spacings?.xxxs}px;
    }

    .MuiChip-deleteIcon {
      ${fontHeaderXs(props)}
      color: white;
      margin: 0 0 0 ${spacings?.xxs}px;
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      &:hover,
      &:focus-visible {
        color: white;
      }
    }
  `;
};

const rounded = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const spacings = getSpaces(props);

  const { icon } = props;

  return css`
    border-radius: ${corners?.l}px;
    padding: ${icon
      ? `${spacings?.xxs}px ${spacings?.s}px ${spacings?.xxs}px ${spacings?.xs}px`
      : `${spacings?.xxxs}px ${spacings?.s}px`};

    &:after {
      border-radius: ${corners?.l}px;
    }
  `;
};

const square = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const spacings = getSpaces(props);

  const { icon } = props;

  return css`
    border-radius: ${corners?.m}px;
    padding: ${icon
      ? `${spacings?.xxs}px ${spacings?.s}px`
      : `${spacings?.xxxs}px ${spacings?.xs}px`};

    &:after {
      border-radius: ${corners?.m}px;
    }
  `;
};

const primary = (props: ExtraProps): SerializedStyles | undefined => {
  return createTypeCss(props, "primary");
};

const secondary = (props: ExtraProps): SerializedStyles | undefined => {
  return createTypeCss(props, "secondary");
};

function createTypeCss(
  props: ExtraProps,
  type: NonNullable<ExtraProps["sdsType"]>
): SerializedStyles | undefined {
  const themeColors = getColors(props);
  const intent =
    typeof props.tagColor === "string" ? props.tagColor : "primary";
  const colors = Array.isArray(props.tagColor) ? [...props.tagColor] : [];

  const typeToColors = {
    primary: {
      background: colors.length >= 2 ? colors[1] : themeColors?.[intent][400],
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : themeColors?.[intent][600],
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : themeColors?.[intent][500],
      iconColor: colors.length > 2 ? colors[2] : "white",
      label: colors.length ? colors[0] : "white",
    },
    secondary: {
      background: colors.length >= 2 ? colors[1] : themeColors?.[intent][200],
      backgroundClicked:
        colors.length >= 2
          ? darken(colors[1], 0.3)
          : themeColors?.[intent][600],
      backgroundHover:
        colors.length >= 2
          ? darken(colors[1], 0.15)
          : themeColors?.[intent][500],
      iconColor: colors.length > 2 ? colors[2] : themeColors?.[intent][400],
      label: colors.length ? colors[0] : themeColors?.[intent][600],
    },
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
        color: white;
      }

      svg {
        fill: white;
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

const doNotForwardProps = ["sdsType", "sdsStyle", "tagColor"];

export const StyledTag = styled(Chip, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  border: none;

  ${(props: ExtraProps) => {
    const { sdsType, sdsStyle, icon } = props;

    const isRounded = sdsStyle === "rounded";
    const type = sdsType || "primary";

    return css`
      ${icon ? withIcon(props) : withoutIcon(props)}
      ${typeToCss[type](props)}
      ${isRounded ? rounded(props) : square(props)}
    `;
  }}
`;
