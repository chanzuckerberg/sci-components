import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  getColors,
  getIconSizes,
  getSemanticComponentColors,
} from "src/core/styles";

export interface ButtonIconSizeToTypes {
  small: "primary" | "secondary" | "tertiary";
  medium: "tertiary";
  large: "primary" | "secondary" | "tertiary";
}
export interface ButtonIconExtraProps<
  ButtonIconSize extends keyof ButtonIconSizeToTypes,
> extends CommonThemeProps {
  on?: boolean;
  disabled?: boolean;
  sdsSize?: ButtonIconSize;
  sdsType?: ButtonIconSizeToTypes[ButtonIconSize];
}

const isOn = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const { sdsType } = props;
  const colors = getColors(props);

  return css`
    ${sdsType !== "tertiary" &&
    `
      color: ${sdsType === "primary" ? colors?.blue[600] : colors?.blue[400]};

      &:hover {
        color: ${colors?.blue[600]};
      }
    `}
  `;
};

const isDisabled = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return css`
    color: ${semanticComponentColors?.base?.fillDisabled};

    svg {
      color: ${semanticComponentColors?.base?.fillDisabled};
    }
  `;
};

const primary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
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

const secondary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
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

const tertiary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
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

const small = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);

  return css`
    .MuiSvgIcon-root {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
      ${sdsType !== "tertiary" ? `margin: 6px;` : ""}
    }
  `;
};

const medium = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);

  return css`
    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height}px;
      width: ${iconSizes?.l.width}px;
      ${sdsType !== "tertiary" ? `margin: 6px;` : ""}
    }
  `;
};

const large = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);

  return css`
    .MuiSvgIcon-root {
      height: ${iconSizes?.xl.height}px;
      width: ${iconSizes?.xl.height}px;
      ${sdsType !== "tertiary" ? `margin: 5px;` : ""}
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

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconExtraProps<ButtonIconSize>
  ) => {
    const { on, disabled, sdsSize = "medium", sdsType = "primary" } = props;

    return css`
      ${sdsType === "primary" && primary(props)}
      ${sdsType === "secondary" && secondary(props)}
      ${sdsType === "tertiary" && tertiary(props)}
      ${on && isOn(props)}
      ${disabled && isDisabled(props)}
      ${sdsSize === "small" && small(props)}
      ${sdsSize === "medium" && medium(props)}
      ${sdsSize === "large" && large(props)}
    `;
  }}
`;
