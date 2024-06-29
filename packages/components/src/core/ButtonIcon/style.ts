import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  getIconSizes,
  getSemanticComponentColors,
  getSpaces,
} from "src/core/styles";

export interface ButtonIconExtraProps extends CommonThemeProps {
  disabled?: boolean;
  sdsSize?: "small" | "medium" | "large";
  sdsType?: "primary" | "secondary" | "tertiary";
}

const isDisabled = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    color: ${semanticComponentColors?.base?.fillDisabled};

    svg {
      color: ${semanticComponentColors?.base?.fillDisabled};
    }
  `;
};

const primary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    color: ${semanticComponentColors?.accent?.fill};

    svg {
      color: ${semanticComponentColors?.accent?.fill};
    }

    &:hover {
      background: ${semanticComponentColors?.base?.fillHover};
      color: ${semanticComponentColors?.accent?.fillHover};

      svg {
        color: ${semanticComponentColors?.accent?.fillHover};
      }
    }

    &:active {
      background: ${semanticComponentColors?.base?.fillPressed};
      color: ${semanticComponentColors?.accent?.fillPressed};

      svg {
        color: ${semanticComponentColors?.accent?.fillPressed};
      }
    }
  `;
};

const secondary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    color: ${semanticComponentColors?.base?.icon};

    svg {
      color: ${semanticComponentColors?.base?.icon};
    }

    &:hover {
      background: ${semanticComponentColors?.base?.fillHover};
      color: ${semanticComponentColors?.accent?.fillHover};

      svg {
        color: ${semanticComponentColors?.accent?.fillHover};
      }
    }

    &:active {
      background: ${semanticComponentColors?.base?.fillPressed};
      color: ${semanticComponentColors?.accent?.fillPressed};

      svg {
        color: ${semanticComponentColors?.accent?.fillPressed};
      }
    }
  `;
};

const tertiary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    color: ${semanticComponentColors?.base?.icon};

    svg {
      color: ${semanticComponentColors?.base?.icon};
    }

    &:hover {
      background: none;
      color: ${semanticComponentColors?.base?.iconHover};

      svg {
        color: ${semanticComponentColors?.base?.iconHover};
      }
    }

    &:active {
      background: none;
      color: ${semanticComponentColors?.base?.iconPressed};

      svg {
        color: ${semanticComponentColors?.base?.iconPressed};
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
  "sdsIcon",
  "sdsIconProps",
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
