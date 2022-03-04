import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "../Button";
import {
  CommonThemeProps,
  fontBody,
  fontHeaderS,
  getBorders,
  getColors,
  getCorners,
  getPalette,
  getSpaces,
} from "../styles";

export interface InputDropdownProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open?: boolean;
  sdsStage: "default" | "userInput";
  sdsStyle?: "minimal" | "square" | "rounded";
  sdsType?: "singleSelect" | "multiSelect";
  details?: string;
  counter?: number;
}

const labelFontBodyXs = fontBody("xs");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);
  const spacings = getSpaces(props);
  const borders = getBorders(props);

  return css`
    border: ${borders?.gray[400]};
    color: ${colors?.gray[500]};
    cursor: pointer;
    padding: ${spacings?.xs}px;

    .MuiButton-label {
      display: flex;
      align-items: center;
      margin: 0 ${spacings?.xs}px;

      > span {
        margin-right: ${spacings?.xs}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    path {
      fill: ${colors?.gray[500]};
    }

    &:hover {
      background-color: unset;
      border: ${borders?.gray[500]};
      color: ${palette?.text?.primary};

      path {
        fill: ${colors?.gray[600]};
      }
    }

    &:active {
      border: ${borders?.primary[400]};
      color: ${palette?.text?.primary};

      path {
        fill: ${colors?.primary[400]};
      }
    }

    &:focus {
      outline: ${borders?.primary[400]};
      outline-offset: -1px;
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
  `;
};

const rounded = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.l}px;
    height: 34px;
    min-width: 90px;

    .MuiButton-label {
      justify-content: space-between;
    }
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  return css`
    path {
      fill: ${colors?.primary[400]};
    }
  `;
};

const warning = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const yellow = colors?.warning[400];
  return css`
    border-color: ${yellow};

    &:hover {
      border-color: ${yellow};
    }

    &:active {
      border-color: ${yellow};
    }
  `;
};

const error = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const red = colors?.error[400];
  return css`
    border-color: ${red};

    &:hover {
      border-color: ${red};
    }

    &:active {
      border-color: ${red};
    }
  `;
};

const isDisabled = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const gray = colors?.gray[300];

  return css`
    cursor: default;
    border-color: ${gray};

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
      ${sdsStyle === "rounded" && rounded(props)}
      ${open && userInput(props)}
      ${sdsStage === "userInput" && userInput(props)}
      ${intent === "warning" && warning(props)}
      ${intent === "error" && error(props)}
      ${disabled && isDisabled(props)}
    `;
  }}
`;

export const StyledDetail = styled("span")`
  ${labelFontBodyXs};
  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;

interface detailsAndCounter extends CommonThemeProps {
  details?: string;
  counter?: string;
}

export const StyledLabel = styled("span")`
  ${labelFontBodyXs};
  ${(props: detailsAndCounter) => {
    const { details, counter } = props;
    const palette = getPalette(props);
    const labelColor = details || counter ? palette?.text?.primary : "";

    return `
      color: ${labelColor};
    `;
  }}
`;

export const StyledCounter = styled("span")`
  ${labelFontBodyXs};
  ${(props) => {
    const colors = getColors(props);
    const corners = getCorners(props);
    const spacings = getSpaces(props);

    return `
    background-color: ${colors?.gray[200]};
    color: ${colors?.primary[400]};
    border-radius: ${corners?.l}px;
    padding: 1px ${spacings?.xs}px;
  `;
  }}
`;
