import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "../Button";
import {
  fontBodyXs,
  fontHeaderS,
  getColors,
  getCorners,
  getIconSizes,
  getPalette,
  getSpacings,
  Props,
} from "../styles";

export interface InputDropdownProps extends Props {
  disabled?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open?: boolean;
  sdsStyle?: "minimal" | "square" | "rounded";
}

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const iconSizes = getIconSizes(props);
  const palette = getPalette(props);
  const spacings = getSpacings(props);

  return css`
    color: ${colors?.gray[500]};

    .MuiButton-label {
      display: flex;
      align-items: center;
      margin: 0 ${spacings?.xs}px;

      span {
        margin-right: ${spacings?.xs}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    path {
      fill: currentColor;
    }

    svg {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;
    }

    &:hover {
      background-color: unset;
      color: ${colors?.gray[600]};
    }

    &:active {
      color: ${palette?.text?.primary};
      path {
        fill: ${colors?.primary[400]};
      }
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  return css`
    span {
      ${fontHeaderS(props)}
    }
  `;
};

const square = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);
  return css`
    border: 1px solid currentColor;
    border-radius: ${corners?.m}px;

    .MuiButton-label {
      justify-content: space-between;
    }

    span {
      ${fontBodyXs(props)}
    }
  `;
};

const isOpen = (props: InputDropdownProps): SerializedStyles => {
  const palette = getPalette(props);
  return css`
    span {
      color: ${palette?.text?.primary};
    }
    path {
      fill: ${palette?.text?.primary};
    }
  `;
};

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

const doNotForwardProps = ["sdsStyle"];

export const StyledInputDropdown = styled(Button, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: InputDropdownProps) => {
    const { disabled, open, sdsStyle } = props;

    return css`
      ${inputDropdownStyles(props)}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "square" && square(props)}
      ${open && isOpen(props)}
      ${disabled && isDisabled(props)}
    `;
  }}
`;
