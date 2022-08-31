import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodyXxs,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

export interface CellBasicExtraProps extends CommonThemeProps {
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
  shouldTextWrap?: boolean;
  primaryTextWrapLineCount?: number;
  secondaryTextWrapLineCount?: number;
}

const doNotForwardProps = [
  "horizontalAlign",
  "verticalAlign",
  "primaryText",
  "secondaryText",
  "shouldTextWrap",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "primaryTextWrapLineCount",
  "secondaryTextWrapLineCount",
];

const FLEX_START = "flex-start";
const FLEX_END = "flex-end";

const horizontalPositionMapping = {
  center: "center",
  left: FLEX_START,
  right: FLEX_END,
};

const verticalPositionMapping = {
  bottom: "end",
  center: "center",
  top: "start",
};

export const StyledTableData = styled("td", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellBasicExtraProps) => {
    const { horizontalAlign = "left", verticalAlign = "top" } = props;

    const spacings = getSpaces(props);
    const typography = getTypography(props);

    return `
        font-family: ${typography?.fontFamily};
        padding: ${spacings?.l}px ${spacings?.s}px;
        text-align: ${horizontalAlign};
        min-width: 96px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: ${
          horizontalAlign
            ? horizontalPositionMapping[horizontalAlign]
            : FLEX_START
        };
        justify-content: ${
          verticalAlign ? verticalPositionMapping[verticalAlign] : FLEX_START
        };
        overflow: hidden;
    `;
  }}
`;

const ShouldWrap = (lineCount: number) => {
  return `
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${lineCount};
    -webkit-box-orient: vertical; 
  `;
};

const ShouldTruncate = () => {
  return `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `;
};

export const PrimaryText = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}

  ${(props: CellBasicExtraProps) => {
    const { primaryTextWrapLineCount = 3 } = props;

    return `
      display: block;
      line-height: 20px;
      ${
        props.shouldTextWrap
          ? ShouldWrap(primaryTextWrapLineCount)
          : ShouldTruncate()
      }
    `;
  }}
`;

export const SecondaryText = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}

  ${(props: CellBasicExtraProps) => {
    const { secondaryTextWrapLineCount = 1 } = props;

    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      display: block;
      color: ${colors?.gray[600]};
      padding-top: ${spaces?.xxxs}px;

      ${
        props.shouldTextWrap
          ? ShouldWrap(secondaryTextWrapLineCount)
          : ShouldTruncate()
      }
    `;
  }}
`;
