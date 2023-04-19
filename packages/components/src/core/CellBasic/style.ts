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
  iconVerticalAlign?: "top" | "center" | "bottom";
  shouldTextWrap?: boolean;
  primaryTextWrapLineCount?: number;
  secondaryTextWrapLineCount?: number;
  tertiaryTextWrapLineCount?: number;
}

const doNotForwardProps = [
  "icon",
  "iconVerticalAlign",
  "horizontalAlign",
  "verticalAlign",
  "primaryText",
  "secondaryText",
  "tertiaryText",
  "shouldTextWrap",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "primaryTextWrapLineCount",
  "secondaryTextWrapLineCount",
  "tertiaryTextWrapLineCount",
];

const verticalAlignCSSMap = {
  bottom: "bottom",
  center: "middle",
  top: "top",
};

const verticalAlignToFlexMap = {
  bottom: "flex-end",
  center: "center",
  top: "flex-start",
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
        vertical-align: ${verticalAlignCSSMap[verticalAlign]};
        width: 96px;
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

export const StyledCellContent = styled("div")`
  display: flex;
`;

export const StyledCellContentWrapper = styled("div")`
  width: 100%;
`;

export const StyledCellIconWrapper = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellBasicExtraProps) => {
    const { iconVerticalAlign = "top" } = props;
    const spacings = getSpaces(props);

    return `
      padding-right: ${spacings?.l}px;
      display: flex;
      flex-direction: column;
      justify-content: ${verticalAlignToFlexMap[iconVerticalAlign]};
    `;
  }}
`;

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

export const TertiaryText = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}

  ${(props: CellBasicExtraProps) => {
    const { tertiaryTextWrapLineCount = 1 } = props;

    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      display: block;
      color: ${colors?.gray[500]};
      padding-top: ${spaces?.s}px;

      ${
        props.shouldTextWrap
          ? ShouldWrap(tertiaryTextWrapLineCount)
          : ShouldTruncate()
      }
    `;
  }}
`;
