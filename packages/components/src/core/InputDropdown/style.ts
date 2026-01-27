import { css, SerializedStyles } from "@emotion/react";
import { ButtonProps } from "@mui/material";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Button from "@mui/material/Button";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBody,
  getCorners,
  getFontWeights,
  getSemanticColors,
  getSpaces,
  SDSPalette,
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
  "multiple",
];

type IntentType = "negative" | "notice" | "positive";

const intentToColor = {
  default: "accent",
  negative: "negative",
  notice: "notice",
  positive: "positive",
};

export interface InputDropdownProps
  extends CommonThemeProps,
    Omit<ButtonProps, (typeof doNotForwardProps)[number]> {
  children?: ReactNode;
  disabled?: boolean;
  intent?: "default" | IntentType;
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
  width?: string;
  className?: string;
  // (masoudmanson): This is a temporary fix for the issue where the style prop
  // is not correctly passed to the underlying Button component when asserting as
  // a React.ComponentType<InputDropdownProps>. This is a workaround until a more
  // permanent solution is implemented.
  style?: React.CSSProperties;
}

const labelFontBodyS = fontBody("s", "regular");
const labelFontBodyXs = fontBody("xs", "regular");

const inputDropdownStyles = (props: InputDropdownProps): SerializedStyles => {
  const { width = "auto" } = props;

  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${labelStyle(props)}

    border: none;
    box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderPrimary};
    cursor: pointer;
    padding: ${spaces?.xs}px ${spaces?.m}px;
    justify-content: start;
    width: ${/^\d+$/.test(width) ? `${width}px` : width};
    min-width: 90px !important;

    &.MuiButton-text {
      &:hover {
        color: ${semanticColors?.base?.textPrimary};
      }

      .styled-label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      ${IconWrapper} {
        margin-left: ${spaces?.m}px;
      }
    }

    path {
      fill: ${semanticColors?.base?.ornamentSecondary};
    }

    &:hover {
      background-color: ${semanticColors?.base?.fillPrimaryInteraction};
      box-shadow: inset 0 0 0 1px
        ${semanticColors?.base?.borderPrimaryInteraction};
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }

      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    &:active {
      background-color: transparent;
      box-shadow: inset 0 0 0 1px ${semanticColors?.accent?.foreground};
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }
    }

    &:focus {
      background-color: transparent;
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
    border: none !important;
    flex-direction: column;
    padding: ${spaces?.xxs}px ${spaces?.s}px;
    box-shadow: none !important;
    background-color: transparent;
    min-width: auto;

    span {
      color: ${semanticColors?.base?.textSecondary};
    }

    /* Nesting to increase CSS specificity for style override */
    &.MuiButton-text {
      .styled-label {
        margin: 0;
      }

      & > span {
        ${labelFontBodyS(props)}
        margin-left: 0;
      }

      ${IconWrapper} {
        margin-left: ${spaces?.xs}px;
        margin-right: 0;
      }
    }

    path {
      fill: ${semanticColors?.base?.ornamentSecondary};
    }

    &:hover {
      background-color: ${semanticColors?.base?.fillPrimaryInteraction};
      border: none;
      color: ${semanticColors?.base?.textPrimary};

      path {
        fill: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }

      .styled-label {
        color: ${semanticColors?.base?.textPrimary};
      }
    }

    &:active {
      background-color: ${semanticColors?.base?.fillPrimaryInteraction};
      border: none;
    }
  `;
};

const square = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.l}px;
    min-width: auto;
    background-color: transparent;
  `;
};

const rounded = (props: InputDropdownProps): SerializedStyles => {
  const corners = getCorners(props);

  return css`
    border-radius: ${corners?.rounded}px;
    min-width: auto;
    background-color: transparent;
  `;
};

const userInput = (props: InputDropdownProps): SerializedStyles => {
  const { sdsStyle = "square" } = props;
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
        border: none;
        color: ${semanticColors?.base?.textPrimary};

        .styled-label {
          color: ${semanticColors?.base?.textPrimary};
        }
      `
      : ""}
  `;
};

const isOpen = (props: InputDropdownProps): SerializedStyles => {
  const { sdsStyle = "square", intent = "default" } = props;

  const semanticColors = getSemanticColors(props);

  const inputColor = intentToColor[intent] as keyof Pick<
    SDSPalette,
    "negative" | "notice" | "positive" | "accent"
  >;

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
      fill: ${semanticColors?.base?.ornamentSecondaryInteraction};
    }

    box-shadow: ${sdsStyle === "minimal"
      ? "none"
      : `inset 0 0 0 1px ${semanticColors?.[inputColor]?.border}`};

    background-color: ${sdsStyle === "minimal"
      ? semanticColors?.base?.fillPrimaryInteraction
      : "transparent"};

    &:hover {
      path {
        fill: ${semanticColors?.base?.ornamentSecondaryInteraction};
      }

      border-color: ${semanticColors?.base?.borderPrimaryInteraction};
    }
  `;
};

const applyIntentColor = (
  props: InputDropdownProps,
  intent: IntentType
): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    box-shadow: inset 0 0 0 1px ${semanticColors?.[intent]?.border};

    &:hover {
      box-shadow: inset 0 0 0 1px
        ${semanticColors?.base?.borderPrimaryInteraction};
    }

    &:active {
      box-shadow: inset 0 0 0 1px
        ${semanticColors?.base?.borderPrimaryInteraction};
    }
  `;
};

const isDisabled = (props: InputDropdownProps): SerializedStyles => {
  const semanticColors = getSemanticColors(props);

  return css`
    cursor: default;
    box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderPrimaryDisabled};

    span {
      color: ${semanticColors?.base?.textDisabled};
    }

    &.MuiButton-text {
      .styled-label,
      ${MinimalDetails}, ${StyledDetail} {
        color: ${semanticColors?.base?.textDisabled};
      }

      ${StyledCounter} {
        background-color: ${semanticColors?.base?.backgroundTertiary};
        color: ${semanticColors?.base?.textDisabled};
      }
    }

    path {
      fill: ${semanticColors?.base?.ornamentDisabled};
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
    const { disabled, intent, state, value, sdsStyle = "square" } = props;

    return css`
      ${inputDropdownStyles(props)}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "square" && square(props)}
      ${sdsStyle === "rounded" && rounded(props)}
      ${value && userInput(props)}
      ${intent === "notice" &&
      sdsStyle !== "minimal" &&
      applyIntentColor(props, "notice")}
      ${intent === "negative" &&
      sdsStyle !== "minimal" &&
      applyIntentColor(props, "negative")}
      ${intent === "positive" &&
      sdsStyle !== "minimal" &&
      applyIntentColor(props, "positive")}
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
      background-color: ${semanticColors?.base?.backgroundTertiary};
      color: ${semanticColors?.accent?.foreground};
      border-radius: ${corners?.rounded}px;
      padding: 0 ${spaces?.xxs}px;
      margin-left: ${spaces?.xs}px;
      height: 18px;
      min-width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
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
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  & > div {
    align-items: center;
    display: inline-flex;
    justify-content: start;
    width: 100%;
    overflow: hidden;
  }
`;

export const IconWrapper = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-self: end;
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
