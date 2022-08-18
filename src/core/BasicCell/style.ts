import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodyXxs,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

export interface BasicCellExtraProps extends CommonThemeProps {
  textPosition?: "left" | "center" | "right";
  shouldTextWrap?: boolean;
  primaryTextWrapLineCount?: number;
  secondaryTextWrapLineCount?: number;
}

const doNotForwardProps = [
  "textPosition",
  "primaryText",
  "secondaryText",
  "shouldTextWrap",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "primaryTextWrapLineCount",
  "secondaryTextWrapLineCount",
];

export const StyledTableData = styled("td", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: BasicCellExtraProps) => {
    const { textPosition = "left" } = props;

    const spacings = getSpaces(props);
    const typography = getTypography(props);

    return `
        font-family: ${typography?.fontFamily};
        padding: ${spacings?.l}px ${spacings?.s}px;
        text-align: ${textPosition};
        min-width: 96px;
        max-width: 100%;
        display: block;
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

  ${(props: BasicCellExtraProps) => {
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

  ${(props: BasicCellExtraProps) => {
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
