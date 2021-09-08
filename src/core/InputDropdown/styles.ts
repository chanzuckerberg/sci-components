import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "../Button";
import {
  fontHeaderS,
  getColors,
  getIconSizes,
  getPalette,
  getSpacings,
  Props,
} from "../styles";

export interface InputDropdownProps extends Props {
  disabled?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  sdsStyle?: "minimal" | "square" | "rounded";
}

const isDisabled = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    span {
      color: ${colors?.gray[300]};
    }
    path {
      fill: ${colors?.gray[300]};
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const iconSizes = getIconSizes(props);
  const palette = getPalette(props);
  const spacings = getSpacings(props);

  return css`
    .MuiButton-label {
      display: flex;
      align-items: center;
    }

    path {
      fill: ${colors?.gray[500]};
    }

    svg {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }

    span {
      ${fontHeaderS(props)}
      color: ${colors?.gray[500]};
      margin-right: ${spacings?.xs}px;
    }

    &:hover {
      background-color: unset;
      span {
        color: ${colors?.gray[600]};
      }
      path {
        fill: ${colors?.gray[600]};
      }
    }

    &:active {
      span {
        color: ${palette?.text?.primary};
      }
      path {
        fill: ${palette?.text?.primary};
      }
    }
  `;
};
const doNotForwardProps = ["sdsStyle"];

export const StyledInputDropdown = styled(Button, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: InputDropdownProps) => {
    const { disabled, sdsStyle } = props;

    return css`
      ${sdsStyle === "minimal" && minimal(props)}
      ${disabled && isDisabled(props)}
    `;
  }}
`;
