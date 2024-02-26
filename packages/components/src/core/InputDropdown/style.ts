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
  getSemanticComponentColors,
  getSemanticTextColors,
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

const labelFontBodyS = fontBody("s", "regular");
const labelFontBodyXs = fontBody("xs", "regular");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const borders = getBorders(props);
  const semanticTextColors = getSemanticTextColors(props);
  const semanticCommonColors = getSemanticComponentColors(props);

  /**
   * (masoudmanson)
   * The top/bottom padding is set to 1px less than the actual value to account for the border.
   */
  const padding = `${(spaces?.xs ?? 6) - 1}px ${spaces?.xs}px`;

  return css`
    ${labelStyle(props)}

    border: ${borders?.base[400]};
    color: ${semanticTextColors?.base?.primary};
    cursor: pointer;
    padding: ${padding};
    justify-content: start;

    &.MuiButton-text {
      &:hover {
        color: ${semanticTextColors?.base?.primary};
      }

      .styled-label {
        margin-left: ${spaces?.s}px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      svg {
        margin-right: ${spaces?.s}px;
        margin-left: ${spaces?.l}px;
      }
    }

    path {
      fill: ${semanticCommonColors?.base?.icon};
    }

    &:hover {
      background-color: unset;
      border-color: black;
      color: ${semanticTextColors?.base?.primary};

      path {
        fill: ${semanticCommonColors?.base?.iconHover};
      }

      .styled-label {
        color: ${semanticTextColors?.base?.primary};
      }
    }

    &:active {
      border: ${borders?.accent[400]};
      color: ${semanticTextColors?.base?.primary};

      path {
        fill: ${semanticCommonColors?.accent?.icon};
      }
    }

    &:focus {
      outline-offset: -1px;
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const semanticTextColors = getSemanticTextColors(props);
  const semanticCommonColors = getSemanticComponentColors(props);

  return css`
    ${labelStyle(props)}
    ${focusVisibleA11yStyle()}

    /* this is needed to left align the label text */
    align-items: flex-start;
    border: none;
    flex-direction: column;
    padding: ${spaces?.xs}px ${spaces?.s}px;

    /* Nesting to increase CSS specificity for style override */
    &.MuiButton-text {
      .styled-label {
        margin: 0;
      }
    }

    span {
      color: ${semanticTextColors?.base?.secondary};
    }

    path {
      fill: ${semanticCommonColors?.base?.icon};
    }

    &:hover {
      background-color: ${semanticCommonColors?.base?.fillHover};
      border: none;
      color: ${semanticTextColors?.base?.primary};

      path {
        fill: ${semanticCommonColors?.base?.iconHover};
      }

      .styled-label {
        color: ${semanticTextColors?.base?.primary};
      }
    }

    &:active {
      background-color: ${semanticCommonColors?.base?.fillHover};
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
      margin-left: ${spaces?.xs}px;
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

  return css`
    border-radius: ${corners?.l}px;
    min-width: 90px;
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    & .styled-label {
      color: ${semanticTextColors?.base?.primary};
    }

    &.MuiButton-text {
      .styled-label {
        color: ${semanticTextColors?.base?.primary};
      }
    }
  `;
};

const isOpen = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const semanticTextColors = getSemanticTextColors(props);
  const semanticCommonColors = getSemanticComponentColors(props);

  return css`
    ${props.sdsStyle === "minimal"
      ? `& > span, &:hover > span { color: ${semanticTextColors?.base?.primary}; }`
      : ""}

    path {
      fill: ${semanticCommonColors?.accent?.icon};
    }

    border-color: ${colors?.blue[400]};

    &:hover {
      path {
        fill: ${colors?.blue[400]};
      }

      border-color: ${colors?.blue[400]};
    }
  `;
};

const warning = (props: InputDropdownProps): SerializedStyles => {
  const colors = getColors(props);
  const yellow = colors?.yellow[400];

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
  const red = colors?.red[400];

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
  const semanticTextColors = getSemanticTextColors(props);
  const semanticCommonColors = getSemanticComponentColors(props);

  return css`
    cursor: default;
    border-color: ${semanticCommonColors?.base?.borderDisabled};

    span {
      color: ${semanticTextColors?.base?.disabled};
    }

    &.MuiButton-text {
      .styled-label {
        color: ${semanticTextColors?.base?.disabled};
      }
    }

    path {
      fill: ${semanticCommonColors?.base?.fillDisabled};
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
    const spaces = getSpaces(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.secondary};
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

    const fontWeights = getFontWeights(props);
    const semanticTextColors = getSemanticTextColors(props);

    const labelColor =
      details || counter !== undefined
        ? semanticTextColors?.base?.primary
        : semanticTextColors?.base?.secondary;

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
    const corners = getCorners(props);
    const spaces = getSpaces(props);
    const semanticCommonColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      background-color: ${semanticCommonColors?.base?.surfaceTertiary};
      color: ${semanticTextColors?.base?.accent};
      border-radius: ${corners?.l}px;
      padding: 0 ${spaces?.xs}px;
      margin-left: ${spaces?.xs}px;
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
  const semanticTextColors = getSemanticTextColors(props);
  const labelColor =
    props.sdsType === "value"
      ? semanticTextColors?.base?.primary
      : semanticTextColors?.base?.secondary;

  return css`
    &.MuiButton-text {
      .styled-label {
        color: ${labelColor};
      }
    }
  `;
}
