import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyS,
  fontBodyXxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface CellBasicExtraProps extends CommonThemeProps {
  horizontalAlign?: "left" | "right";
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
  "primaryTextComponentSlotBottom",
  "primaryTextComponentSlotRight",
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
  ${fontBodyS}
  ${focusVisibleA11yStyle}

  ${(props: CellBasicExtraProps) => {
    const { horizontalAlign = "left", verticalAlign = "top" } = props;

    const spaces = getSpaces(props);

    return `
        padding: ${spaces?.l}px ${spaces?.m}px;
        text-align: ${horizontalAlign};
        vertical-align: ${verticalAlignCSSMap[verticalAlign]};
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
    const spaces = getSpaces(props);

    return `
      padding-right: ${spaces?.l}px;
      display: flex;
      flex-direction: column;
      justify-content: ${verticalAlignToFlexMap[iconVerticalAlign]};
    `;
  }}
`;

export const PrimaryTextWrapper = styled("div")`
  ${(props: CellBasicExtraProps) => {
    const { horizontalAlign } = props;

    return `
      display: flex;
      justify-content: ${horizontalAlign === "left" ? "flex-start" : "flex-end"};
    `;
  }}
`;

export const PrimaryText = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}

  ${(props: CellBasicExtraProps) => {
    const { primaryTextWrapLineCount = 3 } = props;

    return `
      display: block;
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

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      display: block;
      color: ${semanticColors?.base?.textSecondary};
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

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      display: block;
      color: ${semanticColors?.base?.textSecondary};
      padding-top: ${spaces?.s}px;

      ${
        props.shouldTextWrap
          ? ShouldWrap(tertiaryTextWrapLineCount)
          : ShouldTruncate()
      }
    `;
  }}
`;

export const PrimaryTextComponentSlotBottomWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.xxs}px;
    `;
  }}
`;

export const PrimaryTextComponentSlotRightWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-left: ${spaces?.xs}px;
    `;
  }}
`;
