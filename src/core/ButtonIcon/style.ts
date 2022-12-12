import { css, SerializedStyles } from "@emotion/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { CommonThemeProps, getColors, getIconSizes } from "../styles";

export interface ButtonIconSizeToTypes {
  small: "primary" | "secondary" | "tertiary";
  medium: "tertiary";
  large: "primary" | "secondary" | "tertiary";
}
export interface ButtonIconExtraProps<
  ButtonIconSize extends keyof ButtonIconSizeToTypes
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
      color: ${
        sdsType === "primary" ? colors?.primary[600] : colors?.primary[400]
      };

      &:hover {
        color: ${colors?.primary[600]};
      }
    `}
  `;
};

const isDisabled = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[300]};
  `;
};

const primary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const colors = getColors(props);
  const { sdsSize } = props;

  return css`
    color: ${colors?.primary[400]};

    &:hover {
      background: ${colors?.gray[200]};
      color: ${sdsSize === "small" ? colors?.gray[600] : colors?.primary[400]};
    }

    &:active {
      color: ${colors?.primary[600]};
    }
  `;
};

const secondary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      background: none;
      color: ${colors?.primary[400]};
    }
  `;
};

const tertiary = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      background: none;
      color: black;
    }

    &:active {
      color: black;
    }
  `;
};

const small = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const iconSizes = getIconSizes(props);

  return css`
    &:hover {
      background: none;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }
  `;
};

const medium = <ButtonIconSize extends keyof ButtonIconSizeToTypes>(
  props: ButtonIconExtraProps<ButtonIconSize>
): SerializedStyles => {
  const { sdsType } = props;
  const iconSizes = getIconSizes(props);

  if (sdsType === "primary" || sdsType === "secondary") {
    showWarningIfFirstOccurence(SDSWarningTypes.ButtonIconMediumSize);
  }

  return css`
    &:hover {
      background: none;
    }

    .MuiSvgIcon-root {
      height: ${iconSizes?.l.height}px;
      width: ${iconSizes?.l.width}px;
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
      ${sdsType === "primary" ? `padding: 5px;` : ""}
    }
  `;
};

const doNotForwardProps = ["on", "sdsSize", "sdsType", "sdsIcon"];

export const StyledButtonIcon = styled(IconButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  padding: 0;

  ${<ButtonIconSize extends keyof ButtonIconSizeToTypes>(
    props: ButtonIconExtraProps<ButtonIconSize>
  ) => {
    const { on, disabled, sdsSize, sdsType } = props;

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
