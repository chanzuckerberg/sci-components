import { css, SerializedStyles } from "@emotion/react";
import { ButtonProps } from "@mui/material";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBody,
  getBorders,
  getCorners,
  getFontWeights,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = [
  "intent",
  "state",
  "sdsType",
  "isMinimal",
  "shouldTruncateMinimalDetails",
  "shouldPutAColonAfterLabel",
  "value",
  "sdsStyle",
];

export interface InputDropdownProps
  extends CommonThemeProps,
    Omit<ButtonProps, (typeof doNotForwardProps)[number]> {
  children?: ReactNode;
  disabled?: boolean;
  intent?: "default" | "negative" | "notice";
  label: ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  state?: "default" | "open";
  sdsStyle?: "minimal" | "square" | "rounded";
  sdsType?: "label" | "value";
  multiple?: boolean;
  details?: ReactNode;
  counter?: ReactNode;
  value?: ReactNode;
  shouldTruncateMinimalDetails?: boolean;
  shouldPutAColonAfterLabel?: boolean;
  // (masoudmanson): This is a temporary fix for the issue where the style prop
  // is not correctly passed to the underlying Button component when asserting as
  // a React.ComponentType<InputDropdownProps>. This is a workaround until a more
  // permanent solution is implemented.
  style?: React.CSSProperties;
}

const labelFontBodyS = fontBody("s", "regular");
const labelFontBodyXs = fontBody("xs", "regular");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  /**
   * (masoudmanson)
   * The top/bottom padding is set to 1px less than the actual value to account for the border.
   */
  const padding = `${(spaces?.xs ?? 6) - 1}px ${spaces?.xs}px`;

  return css`
    ${labelStyle(props)}

    border: ${borders?.base?.default};
    background-color: ${semanticColors?.base?.surfacePrimary};
    cursor: pointer;
    padding: ${padding};
    justify-content: start;

    &.MuiButton-text {
      &:hover {
        color: ${semanticColors?.base?.textPrimary};
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
      fill: ${semanticColors?.base?.iconPrimary};
    }

    &:hover {
      background-color: ${semanticColors?.base?.surfacePrimary};
      border-color: ${semanticColors?.base?.borderHover};
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.iconPrimaryHover};
      }

      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    &:active {
      border: ${borders?.base?.pressed};
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.iconPrimaryPressed};
      }
    }

    &:focus {
      outline-offset: -1px;
    }
  `;
};

const minimal = (props: InputDropdownProps): SerializedStyles => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${labelStyle(props)}
    ${focusVisibleA11yStyle(props)}

    /* this is needed to left align the label text */
    align-items: flex-start;
    border: none;
    flex-direction: column;
    padding: ${spaces?.xs}px ${spaces?.s}px;
    background-color: transparent;

    /* Nesting to increase CSS specificity for style override */
    &.MuiButton-text {
      .styled-label {
        margin: 0;
      }
    }

    span {
      color: ${semanticColors?.base?.textSecondary};
    }

    path {
      fill: ${semanticColors?.base?.iconPrimary};
    }

    &:hover {
      background-color: ${semanticColors?.base?.fillHover};
      border: none;
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.iconPrimaryHover};
      }

      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    &:active {
      background-color: ${semanticColors?.base?.fillHover};
      border: none;
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
  const { sdsStyle } = props;
  const semanticColors = getSemanticColors(props);

  return css`
    & .styled-label {
      color: ${semanticColors?.base?.textPrimary};
    }

    &.MuiButton-text {
      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    ${sdsStyle === "minimal"
      ? `
        
        background-color: ${semanticColors?.base?.fillHover}47;
        border: none;
        color: ${semanticColors?.base?.textPrimary};

        path {
          fill: ${semanticColors?.base?.iconPrimaryHover};
        }

        .styled-label {
          color: ${semanticColors?.base?.textPrimary};
        }
      `
      : ""}
  `;
};

const isOpen = (props: InputDropdownProps): SerializedStyles => {
  const { sdsStyle } = props;
  const borders = getBorders(props);
  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiButton-text {
      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    ${sdsStyle === "minimal"
      ? `
        & > span, 
        &:hover > span { 
          color: ${semanticColors?.base?.textPrimary}; 
        }

        color: ${semanticColors?.base?.textPrimary}; 
      `
      : ""}

    path {
      fill: ${semanticColors?.accent?.iconOpen};
    }

    border: ${sdsStyle === "minimal" ? borders?.none : borders?.accent?.open};
    background-color: ${sdsStyle === "minimal"
      ? semanticColors?.base?.fillHover + "47"
      : "transparent"};

    &:hover {
      path {
        fill: ${semanticColors?.base?.iconPrimaryHover};
      }

      border-color: ${borders?.accent?.hover};
    }
  `;
};

const notice = (props: InputDropdownProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    border: ${borders?.notice?.default};

    &:hover {
      border: ${borders?.base?.hover};
    }

    &:active {
      border: ${borders?.base?.pressed};
    }
  `;
};

const negative = (props: InputDropdownProps): SerializedStyles => {
  const borders = getBorders(props);

  return css`
    border: ${borders?.negative?.default};

    &:hover {
      border: ${borders?.base?.hover};
    }

    &:active {
      border: ${borders?.base?.pressed};
    }
  `;
};

const isDisabled = (props: InputDropdownProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    cursor: default;
    border-color: ${semanticColors?.base?.borderDisabled};

    span {
      color: ${semanticColors?.base?.textDisabled};
    }

    &.MuiButton-text {
      .styled-label {
        color: ${semanticColors?.base?.textDisabled};
      }
    }

    path {
      fill: ${semanticColors?.base?.iconDisabled};
    }
  `;
};

/**
 * (masoudmanson): `Button as React.ComponentType<InputDropdownProps>` is a
 * temporary fix for the issue where the props are not correctly passed to
 * the underlying Button component. This is a workaround until a more permanent
 * solution is implemented. As a result of this fix, the style prop is not
 * passed to the underlying Button component. So we have added the style prop
 * to the InputDropdownProps interface.
 */
export const StyledInputDropdown = styled(
  Button as React.ComponentType<InputDropdownProps>,
  {
    shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
  }
)`
  ${labelFontBodyXs}
  ${focusVisibleA11yStyle}
  outline-offset: 1px !important;

  /* (thuang): in Minimal it's a different value */
  align-items: center;
  /* (thuang): in Minimal it's a different value */
  flex-direction: row;

  justify-content: space-between;

  ${(props: InputDropdownProps) => {
    const { disabled, intent, state, value, sdsStyle } = props;

    return css`
      ${inputDropdownStyles(props)}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "square" && square(props)}
      ${sdsStyle === "rounded" && rounded(props)}
      ${value && userInput(props)}
      ${intent === "notice" && sdsStyle !== "minimal" && notice(props)}
      ${intent === "negative" && sdsStyle !== "minimal" && negative(props)}
      ${state === "open" && isOpen(props)}
      ${disabled && isDisabled(props)}
    `;
  }}
`;

export const StyledDetail = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
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
    const semanticColors = getSemanticColors(props);

    const labelColor =
      details || counter !== undefined
        ? semanticColors?.base?.textPrimary
        : semanticColors?.base?.textSecondary;

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
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surfaceTertiary};
      color: ${semanticColors?.accent?.textAction};
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

  ${(props: MinimalDetailsProps) => {
    const { shouldTruncateMinimalDetails } = props;
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};

      ${
        shouldTruncateMinimalDetails &&
        `overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;`
      }
    `;
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
  const semanticColors = getSemanticColors(props);
  const labelColor =
    props.sdsType === "value"
      ? semanticColors?.base?.textPrimary
      : semanticColors?.base?.textSecondary;

  return css`
    &.MuiButton-text {
      .styled-label {
        color: ${labelColor};
      }
    }
  `;
}
