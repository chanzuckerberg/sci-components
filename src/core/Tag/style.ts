import { css, SerializedStyles } from "@emotion/react";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxs,
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
  return css`
    height: 20px;

    .MuiChip-label {
      ${fontBodyXxs(props)}
      padding: 0;
    }
  `;
};

const withIcon = (props: ExtraProps): SerializedStyles => {
  const spacings = getSpaces(props);
  const colors = getColors(props);
  const iconSizes = getIconSizes(props);

  return css`
    height: 30px;
    padding: ${spacings?.xxs}px ${spacings?.xs}px ${spacings?.xxs}px
      ${spacings?.s}px;

    .MuiChip-label {
      ${fontBodyXs(props)}
      padding: 0;
    }

    .MuiChip-icon,
    svg {
      height: ${iconSizes?.l.height};
      width: ${iconSizes?.l.width};
      padding-right: ${spacings?.xxs}px;
      margin: 0 0 0 -${spacings?.xxxs}px;
      font-size: ${iconSizes?.l.height}px;
    }

    &:hover > svg,
    &:focus-visible > svg {
      fill: white;
    }

    .MuiChip-deleteIcon {
      color: white;
      padding-right: ${spacings?.xxs}px;
      margin: 0 0 0 -${spacings?.s}px;
      height: ${spacings?.l}px;
      width: ${spacings?.l}px;

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

  return css`
    border-radius: ${corners?.l}px;
    padding: ${spacings?.xs}px ${spacings?.s}px;
  `;
};

const square = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const spacings = getSpaces(props);

  return css`
    border-radius: ${corners?.m}px;
    padding: ${spacings?.xxs}px ${spacings?.xs}px;
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
      backgroundHover:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][500],
      backgroundClicked:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][600],
      label: colors.length ? colors[0] : "white",
      iconColor: colors.length > 2 ? colors[2] : "white",
    },
    secondary: {
      label: colors.length ? colors[0] : themeColors?.[intent][600],
      iconColor: colors.length > 2 ? colors[2] : themeColors?.[intent][400],
      background: colors.length >= 2 ? colors[1] : themeColors?.[intent][200],
      backgroundHover:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][500],
      backgroundClicked:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][600],
    },
  };

  const typeColors = typeToColors[type];

  if (
    !typeToColors[type].backgroundHover ||
    !typeToColors[type].backgroundClicked
  ) {
    console.warn(
      "Some color shades are missing in the theme default colors object!"
    );
  }

  return css`
    background-color: ${typeColors.background};

    .MuiChip-label {
      color: ${typeColors.label};
    }

    svg {
      fill: ${typeColors.iconColor};
    }

    &:hover {
      background-color: ${typeColors.backgroundHover};
    }

    &:active {
      background-color: ${typeColors.backgroundClicked};
    }

    &:hover,
    &:active {
      .MuiChip-label {
        color: white;
      }

      svg {
        fill: white;
      }
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

    return css`
      ${!!icon ? withIcon(props) : withoutIcon(props)}
      ${sdsType && typeToCss[sdsType](props)}
      ${isRounded ? rounded(props) : square(props)}
    `;
  }}
`;