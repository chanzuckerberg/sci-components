import { css, SerializedStyles } from "@emotion/react";
import { styled } from "@mui/material/styles";
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
  counter?: string;
}

const labelFontBodyS = fontBody("s");
const labelFontBodyXs = fontBody("xs");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);
  const spacings = getSpaces(props);
  const borders = getBorders(props);

  return css`
    border: ${borders?.gray[400]};
    color: ${palette?.text?.secondary};
    cursor: pointer;
    padding: ${spacings?.xs}px;

    &.MuiButton-text {
      justify-content: flex-start;

      &:hover {
        color: #000;
      }

      > span {
        margin-right: ${spacings?.xs}px;
        margin-left: ${spacings?.xs}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      svg {
        margin-left: auto;
        margin-right: ${spacings?.xs}px;
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

      > span {
        color: #000;
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
      outline-offset: -1px;
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);

  return css`
    border: none;
    padding: 0;

    & .MuiButton-label {
      margin: 0;
    }

    span {
      color: ${palette?.text?.secondary};
    }

    path {
      fill: ${colors?.gray[500]};
    }

    &:hover {
      color: ${colors?.gray[600]};
      border: none;

      span {
        color: ${colors?.gray[600]};
      }

      path {
        fill: ${colors?.gray[600]};
      }
    }

    &:active {
      color: ${palette?.text?.primary};
      border: none;

      span {
        color: #000;
      }

      path {
        fill: ${colors?.primary[400]};
      }
    }

    &:focus {
      outline: none;
    }

    &.MuiButton-root.MuiButton-text > span {
      ${fontHeaderS(props)}
      margin-left: 0;
    }

    &.MuiButton-root.MuiButton-text svg {
      margin-left: auto;
      margin-right: 0;
    }
  `;
};

const square = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.m}px;
    min-width: 90px;
  `;
};

const rounded = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);
  const palette = getPalette(props);
  const labelColor = props.disabled
    ? palette?.text?.disabled
    : palette?.text?.primary;

  return css`
    border-radius: ${corners?.l}px;
    min-width: 90px;

    &.MuiButton-text {
      > span:first-of-type {
        font-weight: 600;
        color: ${labelColor};
      }
    }
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);

  return css`
    ${props.sdsStyle === "minimal"
      ? "& > span, &:hover > span { color: black; }"
      : ""}

    path {
      fill: ${colors?.primary[400]};
    }

    border-color: ${colors?.primary[400]};

    &:hover {
      path {
        fill: ${colors?.primary[400]};
      }

      border-color: ${colors?.primary[400]};
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

const doNotForwardProps = ["intent", "open", "sdsStage"];

export const StyledInputDropdown = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyS}
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

export const StyledDetail = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyXs}
  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;

interface DetailsAndCounter extends CommonThemeProps {
  details?: string;
  counter?: string;
}

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyXs}
  ${(props: DetailsAndCounter) => {
    const { details, counter } = props;
    const colors = getColors(props);
    const palette = getPalette(props);
    const labelColor =
      details || counter !== undefined
        ? palette?.text?.primary
        : colors?.gray[500];
    return `
      color: ${labelColor};
    `;
  }}
`;

export const StyledCounter = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyXs}
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
