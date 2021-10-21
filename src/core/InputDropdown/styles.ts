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
  intent?: "default" | "error" | "warning";
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open?: boolean;
  sdsStage: "default" | "userInput";
  sdsStyle?: "minimal" | "square" | "rounded";
}

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const iconSizes = getIconSizes(props);
  const palette = getPalette(props);
  const spacings = getSpacings(props);

  return css`
    border: 1px solid ${colors?.gray[400]};
    color: ${colors?.gray[500]};
    cursor: pointer;

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
      border-color: ${colors?.gray[500]};
      color: ${palette?.text?.primary};

      path {
        fill: ${colors?.gray[600]};
      }
    }

    &:active {
      border-color: ${colors?.primary[400]};
      color: ${palette?.text?.primary};

      path {
        fill: ${colors?.primary[400]};
      }
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);

  return css`
    border: none;

    span {
      ${fontHeaderS(props)}
    }

    &:hover {
      color: ${colors?.gray[600]};
    }

    &:active {
      color: ${palette?.text?.primary};
    }
  `;
};

const square = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.m}px;
    height: 34px;
    min-width: 90px;

    .MuiButton-label {
      justify-content: space-between;
    }

    span {
      ${fontBodyXs(props)}
    }
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);
  return css`
    span {
      color: ${palette?.text?.primary};
    }
    path {
      fill: ${colors?.gray[500]};
    }
  `;
};

const warning = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  return css`
    border-color: ${colors?.warning[400]};
  `;
};

const error = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  return css`
    border-color: ${colors?.error[400]};
  `;
};

const isDisabled = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    cursor: default;

    span {
      color: ${colors?.gray[300]};
    }

    path {
      fill: ${colors?.gray[300]};
    }
  `;
};

const doNotForwardProps = ["intent", "open", "sdsStage", "sdsStyle"];

export const StyledInputDropdown = styled(Button, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: InputDropdownProps) => {
    const { disabled, intent, open, sdsStage, sdsStyle } = props;

    return css`
      ${inputDropdownStyles(props)}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "square" && square(props)}
      ${open && userInput(props)}
      ${sdsStage === "userInput" && userInput(props)}
      ${intent === "warning" && warning(props)}
      ${intent === "error" && error(props)}
      ${disabled && isDisabled(props)}
    `;
  }}
`;
