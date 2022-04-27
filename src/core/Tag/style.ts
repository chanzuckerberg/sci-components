import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { Chip } from "@material-ui/core";
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
    height: 20px;

    &:hover {
      cursor: pointer;
    }

    .MuiChip-label {
      ${fontBodyXxxs(props)}
      padding: ${spacings?.xxxs}px 0;
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
    height: 30px;

    &:hover {
      cursor: pointer;
    }

    .MuiChip-label {
      ${fontBodyXs(props)}
      padding: 0;
    }

    .MuiChip-icon,
    & > div > svg {
      height: ${iconSizes?.l.height};
      width: ${iconSizes?.l.width};
      padding-right: ${spacings?.xxs}px;
      margin: 0 0 0 -${spacings?.xxxs}px;
      font-size: ${iconSizes?.l.height}px;
    }

    &:focus-visible > svg,
    &:hover > div > svg {
      fill: white;
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

  if (icon) {
    return css`
      border-radius: ${corners?.l}px;
      padding: ${spacings?.xs}px ${spacings?.s}px ${spacings?.xs}px
        ${spacings?.xs}px;
    `;
  } else {
    return css`
      border-radius: ${corners?.l}px;
      padding: ${spacings?.xs}px ${spacings?.s}px;
    `;
  }
};

const square = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const spacings = getSpaces(props);

  return css`
    border-radius: ${corners?.m}px;
    padding: ${spacings?.xxs}px ${spacings?.s}px;
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
        colors.length >= 2 ? colors[1] : themeColors?.[intent][600],
      backgroundHover:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][500],
      iconColor: colors.length > 2 ? colors[2] : "white",
      label: colors.length ? colors[0] : "white",
    },
    secondary: {
      background: colors.length >= 2 ? colors[1] : themeColors?.[intent][200],
      backgroundClicked:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][600],
      backgroundHover:
        colors.length >= 2 ? colors[1] : themeColors?.[intent][500],
      iconColor: colors.length > 2 ? colors[2] : themeColors?.[intent][400],
      label: colors.length ? colors[0] : themeColors?.[intent][600],
    },
  };

  const typeColors = typeToColors[type];

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
    const type = sdsType || "primary";

    return css`
      ${!!icon ? withIcon(props) : withoutIcon(props)}
      ${typeToCss[type](props)}
      ${isRounded ? rounded(props) : square(props)}
    `;
  }}
`;
