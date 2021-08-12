import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { IconButton } from "@material-ui/core";
import { getColors, getSpacings, Props } from "../styles";

export interface ExtraProps extends Props {
  active?: boolean;
  color?: "primary" | "secondary";
  disabled?: boolean;
  size?: "small" | "medium";
}

const isActive = (props: ExtraProps): SerializedStyles => {
  const { color } = props;
  const colors = getColors(props);

  return css`
    color: ${color === "primary" ? colors?.primary[600] : colors?.primary[500]};

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

const small = (): SerializedStyles => {
  return css`
    &:hover {
      background: none;
    }

    .MuiSvgIcon-root {
      height: 14px;
      width: 14px;
    }
  `;
};

const medium = (props: ExtraProps): SerializedStyles => {
  const { color } = props;
  const spacings = getSpacings(props);

  return css`
    padding: ${color === "primary" ? spacings?.xxs : 0}px;

    .MuiSvgIcon-root {
      height: 32px;
      width: 32px;
    }
  `;
};

const doNotForwardProps = ["active", "secondary"];

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ExtraProps) => {
    const { active, color, disabled, size } = props;

    return css`
      ${color === "primary" && primary(props)}
      ${color === "secondary" && secondary(props)}
      ${active && isActive(props)}
      ${disabled && isDisabled(props)}
      ${size === "small" && small()}
      ${size === "medium" && medium(props)}
    `;
  }}
`;
