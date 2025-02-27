import { styled } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontCapsXxxs,
  fontHeaderM,
  fontHeaderXl,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = [
  "visualElement",
  "sdsType",
  "imagePosition",
  "imagePadding",
  "overlineText",
  "titleText",
  "subtitleText",
  "metadataText",
  "contentBlock",
];

export const StyledTitleWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;

export const StyledOverlineText = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontCapsXxxs}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;

export const StyledTitleText = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeaderXl}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      margin: 0;
    `;
  }}
`;

export const StyledSubtitleText = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontHeaderM}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      margin: 0;
    `;
  }}
`;

export const StyledMetadataText = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXxs}
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: ${spaces?.s}px 0 0 0;
    `;
  }}
`;
