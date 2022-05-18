import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { Chip } from "@material-ui/core";
import {
  CommonThemeProps,
  fontBodyXs,
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
      ${fontBodyXs(props)}
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
      padding: ${spacings?.xxs}px ${spacings?.s}px ${spacings?.xxs}px
        ${spacings?.xs}px;

      &:after {
        border-radius: ${corners?.l}px;
      }
    `;
  } else {
    return css`
      border-radius: ${corners?.l}px;
      padding: ${spacings?.xxs}px ${spacings?.s}px;
      &:after {
        border-radius: ${corners?.l}px;
      }
    `;
  }
};

const square = (props: ExtraProps): SerializedStyles => {
  const corners = getCorners(props);
  const spacings = getSpaces(props);

  return css`
    border-radius: ${corners?.m}px;
    padding: ${spacings?.xxs}px ${spacings?.xs}px;

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

  let cssFilters: {
    activeFilter?: string;
    hoverFilter?: string;
  } = {
    activeFilter: "brightness(1) saturate(1)",
    hoverFilter: "brightness(1) saturate(1)",
  };

  if (colors.length >= 2) {
    cssFilters = {
      activeFilter: "brightness(0.7) saturate(1.3)",
      hoverFilter: "brightness(0.85) saturate(1.15)",
    };
  }

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
    position: relative;

    .MuiChip-label {
      color: ${typeColors.label};
    }

    svg {
      fill: ${typeColors.iconColor};
    }

    &:hover {
      background-color: ${typeColors.backgroundHover};
      &:after {
        backdrop-filter: ${cssFilters.hoverFilter};
      }
    }

    &:active,
    &:focus {
      background-color: ${typeColors.backgroundClicked};
      &:after {
        backdrop-filter: ${cssFilters.activeFilter};
      }
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

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background-color: transparent;
    z-index: 0;
  }

  .MuiChip-label,
  svg {
    z-index: 1;
  }

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
