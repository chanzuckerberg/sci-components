import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton } from "@material-ui/core";
import { getColors, getIconSizes, getSpaces, Props } from "../styles";

export interface ExtraProps extends Props {
  active?: boolean;
  disabled?: boolean;
  sdsSize?: "small" | "large";
  sdsType?: "primary" | "secondary";
}

const isActive = (props: ExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const colors = getColors(props);

  return css`
    color: ${sdsType === "primary"
      ? colors?.primary[600]
      : colors?.primary[400]};

    &:hover {
      color: ${colors?.primary[600]};
    }
  `;
};

const isDisabled = (props: ExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[300]};
  `;
};

const primary = (props: ExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.primary[400]};

    &:hover {
      background: ${colors?.gray[300]};
    }

    &:active {
      color: ${colors?.primary[600]};
    }
  `;
};

const secondary = (props: ExtraProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray[500]};

    &:hover {
      background: none;
      color: ${colors?.primary[400]};
    }
  `;
};

const small = (props: ExtraProps): SerializedStyles => {
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

const large = (props: ExtraProps): SerializedStyles => {
  const { sdsType } = props;
  const spacings = getSpaces(props);
  const iconSizes = getIconSizes(props);

  return css`
    padding: ${sdsType === "primary" ? spacings?.xxs : 0}px;

    .MuiSvgIcon-root {
      height: ${iconSizes?.xl.height}px;
      width: ${iconSizes?.xl.height}px;
    }
  `;
};

const doNotForwardProps = ["active", "sdsSize", "sdsType"];

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    const { active, disabled, sdsSize, sdsType } = props;

    return css`
      ${sdsType === "primary" && primary(props)}
      ${sdsType === "secondary" && secondary(props)}
      ${active && isActive(props)}
      ${disabled && isDisabled(props)}
      ${sdsSize === "small" && small(props)}
      ${sdsSize === "large" && large(props)}
    `;
  }}
`;
