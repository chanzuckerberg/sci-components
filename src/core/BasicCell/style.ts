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
}

const doNotForwardProps = [
  "textPosition",
  "primaryText",
  "secondaryText",
  "shouldTextWrap",
  "shouldShowTooltipOnHover",
  "tooltipProps",
];

export const StyledTableData = styled("td", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: BasicCellExtraProps) => {
    const spacings = getSpaces(props);
    const typography = getTypography(props);

    return `
        font-family: ${typography?.fontFamily};
        padding: ${spacings?.l}px ${spacings?.s}px;
        text-align: ${props.textPosition};
        min-width: 96px;
        overflow: hidden;
        border: dashed 1px #ddd;
        max-width: 100px;
    `;
  }}
`;

const ShouldNotWrap = () => {
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
    return `
        display: block;
        line-height: 20px;
        ${props.shouldTextWrap ? null : ShouldNotWrap()}
    `;
  }}
`;

export const SecondaryText = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}

  ${(props: BasicCellExtraProps) => {
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      display: block;
      color: ${colors?.gray[600]};
      padding-top: ${spaces?.xxxs}px;

      ${props.shouldTextWrap ? null : ShouldNotWrap()}
    `;
  }}
`;
