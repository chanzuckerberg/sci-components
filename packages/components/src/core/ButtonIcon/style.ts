import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface ButtonIconExtraProps extends CommonThemeProps {
  disabled?: boolean;
  sdsSize?: "small" | "medium" | "large";
  sdsType?: "primary" | "secondary" | "tertiary";
}

const isDisabled = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.ornamentDisabled};

    svg {
      color: ${semanticColors?.base?.ornamentDisabled};
    }
  `;
};

const primary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.accent?.ornament};

    svg {
      color: ${semanticColors?.accent?.ornament};
    }

    &:hover {
      background: ${semanticColors?.base?.fillInteraction};
      color: ${semanticColors?.accent?.ornamentHover};

      svg {
        color: ${semanticColors?.accent?.ornamentHover};
      }
    }

    &:active {
      background: ${semanticColors?.base?.fillPressed};
      color: ${semanticColors?.accent?.ornamentPressed};

      svg {
        color: ${semanticColors?.accent?.ornamentPressed};
      }
    }
  `;
};

const secondary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.ornamentSecondary};

    svg {
      color: ${semanticColors?.base?.ornamentSecondary};
    }

    &:hover {
      background: ${semanticColors?.base?.fillInteraction};
      color: ${semanticColors?.accent?.ornamentHover};

      svg {
        color: ${semanticColors?.accent?.ornamentHover};
      }
    }

    &:active {
      background: ${semanticColors?.base?.fillPressed};
      color: ${semanticColors?.accent?.ornamentPressed};

      svg {
        color: ${semanticColors?.accent?.ornamentPressed};
      }
    }
  `;
};

const tertiary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.ornamentSecondary};

    svg {
      color: ${semanticColors?.base?.ornamentSecondary};
    }

    &:hover {
      background: none;
      color: ${semanticColors?.base?.ornamentSecondaryInteraction};

      svg {
        color: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }
    }

    &:active {
      background: none;
      color: ${semanticColors?.base?.ornamentSecondaryInteraction};

      svg {
        color: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }
    }
  `;
};

const small = (props: ButtonIconExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);
  const spaces = getSpaces(props);

  return css`
    .MuiSvgIcon-root {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      ${sdsType !== "tertiary" ? `margin: ${spaces?.xs}px;` : ""}
    }
  `;
};

const medium = (props: ButtonIconExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);
  const spaces = getSpaces(props);

  return css`
    ${sdsType !== "tertiary"
      ? `margin: 0 ${spaces?.xxs}px ${spaces?.xxs}px 0;`
      : ""}

    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height}px;
      width: ${iconSizes?.l.width}px;
      ${sdsType !== "tertiary" ? `margin: ${spaces?.xs}px;` : ""}
    }
  `;
};

const large = (props: ButtonIconExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);
  const spaces = getSpaces(props);

  return css`
    ${sdsType !== "tertiary"
      ? `margin: 0 ${spaces?.s}px ${spaces?.s}px 0;`
      : ""}

    .MuiSvgIcon-root {
      height: ${iconSizes?.xl.height}px;
      width: ${iconSizes?.xl.height}px;
      ${sdsType !== "tertiary" ? `margin: ${spaces?.xxs}px;` : ""}
    }
  `;
};

const doNotForwardProps = [
  "on",
  "sdsSize",
  "sdsType",
  "sdsStyle",
  "sdsIcon",
  "sdsIconProps",
  "customTheme",
];

export const StyledButtonIcon = styled(IconButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  padding: 0;
  ${focusVisibleA11yStyle}

  ${(props: ButtonIconExtraProps) => {
    const { disabled, sdsSize = "medium", sdsType = "primary" } = props;

    return css`
      ${sdsType === "primary" && primary(props)}
      ${sdsType === "secondary" && secondary(props)}
      ${sdsType === "tertiary" && tertiary(props)}
      ${disabled && isDisabled(props)}
      ${sdsSize === "small" && small(props)}
      ${sdsSize === "medium" && medium(props)}
      ${sdsSize === "large" && large(props)}
    `;
  }}
`;
