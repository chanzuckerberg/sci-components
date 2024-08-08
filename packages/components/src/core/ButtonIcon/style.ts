import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
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
    color: ${semanticColors?.base?.iconDisabled};

    svg {
      color: ${semanticColors?.base?.iconDisabled};
    }
  `;
};

const primary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.accent?.textAction};

    svg {
      color: ${semanticColors?.accent?.icon};
    }

    &:hover {
      /* the number 47 is the opacity of the color, which is equal to 28% */
      background: ${semanticColors?.base?.fillHover}47;
      color: ${semanticColors?.accent?.textActionHover};

      svg {
        color: ${semanticColors?.accent?.iconHover};
      }
    }

    &:active {
      /* the number 47 is the opacity of the color, which is equal to 28% */
      background: ${semanticColors?.base?.fillPressed}47;
      color: ${semanticColors?.accent?.textActionPressed};

      svg {
        color: ${semanticColors?.accent?.iconPressed};
      }
    }
  `;
};

const secondary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.iconPrimary};

    svg {
      color: ${semanticColors?.base?.iconPrimary};
    }

    &:hover {
      /* the number 47 is the opacity of the color, which is equal to 28% */
      background: ${semanticColors?.base?.fillHover}47;
      color: ${semanticColors?.accent?.iconHover};

      svg {
        color: ${semanticColors?.accent?.iconHover};
      }
    }

    &:active {
      /* the number 47 is the opacity of the color, which is equal to 28% */
      background: ${semanticColors?.base?.fillPressed}47;
      color: ${semanticColors?.accent?.iconPressed};

      svg {
        color: ${semanticColors?.accent?.iconPressed};
      }
    }
  `;
};

const tertiary = (props: ButtonIconExtraProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    color: ${semanticColors?.base?.iconPrimary};

    svg {
      color: ${semanticColors?.base?.iconPrimary};
    }

    &:hover {
      background: none;
      color: ${semanticColors?.base?.iconPrimaryHover};

      svg {
        color: ${semanticColors?.base?.iconPrimaryHover};
      }
    }

    &:active {
      background: none;
      color: ${semanticColors?.base?.iconPrimaryPressed};

      svg {
        color: ${semanticColors?.base?.iconPrimaryPressed};
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
