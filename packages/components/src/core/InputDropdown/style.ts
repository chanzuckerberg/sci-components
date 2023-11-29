import { css, SerializedStyles } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import Button from "../Button";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBody,
  getBorders,
  getColors,
  getCorners,
  getFontWeights,
  getPalette,
  getSpaces,
} from "../styles";

export interface InputDropdownProps extends CommonThemeProps {
  disabled?: boolean;
  intent?: "default" | "error" | "warning";
  label: ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  state?: "default" | "open";
  sdsStage: "default" | "userInput";
  sdsStyle?: "minimal" | "square" | "rounded";
  sdsType?: "label" | "value";
  multiple?: boolean;
  details?: ReactNode;
  counter?: ReactNode;
  value?: ReactNode;
  shouldTruncateMinimalDetails?: boolean;
  shouldPutAColonAfterLabel?: boolean;
}

const labelFontBodyS = fontBody("s");
const labelFontBodyXs = fontBody("xs");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);
  const spacings = getSpaces(props);
  const borders = getBorders(props);

  return css`
    ${labelStyle(props)}

    border: ${borders?.gray[400]};
    color: ${palette?.text?.primary};
    cursor: pointer;
    padding: ${spacings?.xs}px;
    justify-content: start;

    &.MuiButton-text {
      &:hover {
        color: #000;
      }

      .styled-label {
        margin-left: ${spacings?.s}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      svg {
        margin-right: ${spacings?.s}px;
        margin-left: ${spacings?.l}px;
      }
    }

    path {
      fill: ${colors?.gray[500]};
    }

    &:hover {
      background-color: unset;
      border-color: black;
      color: ${palette?.text?.primary};

      path {
        fill: black;
      }

      .styled-label {
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
  const spacings = getSpaces(props);
  const palette = getPalette(props);

  return css`
    ${labelStyle(props)}
    ${focusVisibleA11yStyle()}

    /* this is needed to left align the label text */
    align-items: flex-start;
    border: none;
    flex-direction: column;
    padding: ${spacings?.xs}px ${spacings?.s}px;

    /* Nesting to increase CSS specificity for style override */
    &.MuiButton-text {
      .styled-label {
        margin: 0;
      }
    }

    span {
      color: ${colors?.gray[500]};
    }

    path {
      fill: ${colors?.gray[500]};
    }

    &:hover {
      background-color: ${colors?.gray[100]};
      border: none;
      color: ${palette?.text?.primary};

      path {
        fill: black;
      }

      .styled-label {
        color: #000;
      }
    }

    &:active {
      background-color: ${colors?.gray[100]};
      border: none;
    }

    &:focus {
      outline: none;
    }

    &.MuiButton-root.MuiButton-text > span {
      ${labelFontBodyS(props)}
      margin-left: 0;
    }

    &.MuiButton-root.MuiButton-text svg {
      margin-left: ${spacings?.xs}px;
      margin-right: 0;
    }
  `;
};

const square = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.m}px;
    height: 34px;
    min-width: 90px;
  `;
};

const rounded = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.l}px;
    height: 34px;
    min-width: 90px;
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const palette = getPalette(props);

  return css`
    & .styled-label {
      color: ${palette?.text?.primary};
    }

    &.MuiButton-text {
      .styled-label {
        color: ${palette?.text?.primary};
      }
    }
  `;
};

const isOpen = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const palette = getPalette(props);

  return css`
    ${props.sdsStyle === "minimal"
      ? `& > span, &:hover > span { color: ${palette?.text?.primary}; }`
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

    &.MuiButton-text {
      .styled-label {
        color: ${colors?.gray[300]};
      }
    }

    path {
      fill: ${colors?.gray[300]};
    }
  `;
};

const doNotForwardProps = [
  "intent",
  "state",
  "sdsStage",
  "sdsType",
  "isMinimal",
  "shouldTruncateMinimalDetails",
  "shouldPutAColonAfterLabel",
];

export const StyledInputDropdown = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyXs}

  /* (thuang): in Minimal it's a different value */
  align-items: center;
  /* (thuang): in Minimal it's a different value */
  flex-direction: row;

  justify-content: space-between;

  ${(props: InputDropdownProps) => {
    const { disabled, intent, state, sdsStage, sdsStyle } = props;

    return css`
      ${inputDropdownStyles(props)}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "square" && square(props)}
      ${sdsStyle === "rounded" && rounded(props)}
      ${state === "open" && isOpen(props)}
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
  ${(props: CommonThemeProps) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${colors?.gray[500]};
      margin-left: ${spaces?.xs}px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
  }}
`;

interface DetailsAndCounter extends CommonThemeProps {
  details?: InputDropdownProps["details"];
  counter?: InputDropdownProps["counter"];
  sdsType: InputDropdownProps["sdsType"];
}

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: DetailsAndCounter) => {
    const { details, counter, sdsType } = props;

    const colors = getColors(props);
    const palette = getPalette(props);
    const fontWeights = getFontWeights(props);

    const labelColor =
      details || counter !== undefined
        ? palette?.text?.primary
        : colors?.gray[500];

    return `
      color: ${labelColor};

      font-weight: ${
        sdsType === "label" ? fontWeights?.semibold : fontWeights?.regular
      };
    `;
  }}
`;

export const StyledCounter = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const colors = getColors(props);
    const corners = getCorners(props);
    const spacings = getSpaces(props);

    return `
      background-color: ${colors?.gray[200]};
      color: ${colors?.primary[400]};
      border-radius: ${corners?.l}px;
      padding: 0 ${spacings?.xs}px;
      margin-left: ${spacings?.xs}px;
    `;
  }}
`;

interface MinimalDetailsProps extends CommonThemeProps {
  shouldTruncateMinimalDetails: InputDropdownProps["shouldTruncateMinimalDetails"];
}

export const MinimalDetails = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${labelFontBodyS}
  text-align: left;
  width: 100%;

  ${({ shouldTruncateMinimalDetails }: MinimalDetailsProps) => {
    if (shouldTruncateMinimalDetails) {
      return `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    }
  }}
`;

export const LabelWrapper = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${({ isMinimal }: { isMinimal: boolean }) => {
    return `
      align-items: ${isMinimal ? "center" : undefined};
      display: ${isMinimal ? "inline-flex" : "contents"};
      justify-content: ${isMinimal ? "space-between" : undefined};
      width: 100%;
    `;
  }}
`;

export const IconWrapper = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

function labelStyle(props: InputDropdownProps): SerializedStyles {
  const colors = getColors(props);
  const palette = getPalette(props);
  const labelColor =
    props.sdsType === "value" ? palette?.text?.primary : colors?.gray[500];

  return css`
    &.MuiButton-text {
      .styled-label {
        color: ${labelColor};
      }
    }
  `;
}
