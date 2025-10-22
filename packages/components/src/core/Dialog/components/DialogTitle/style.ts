import { DialogTitle, Typography } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodyXs,
  fontBodyXxs,
  fontHeaderL,
  fontHeaderXl,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { DialogExtraProps } from "../..";

export interface DialogTitleExtraProps extends CommonThemeProps {
  sdsSize?: DialogExtraProps["sdsSize"];
}

const doNotForwardProps = ["sdsSize"];

export const StyledDialogTitle = styled(DialogTitle, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  padding: 0;
  ${(props: DialogTitleExtraProps) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    const spaces = getSpaces(props);

    return `
      margin-bottom: ${isSmall ? spaces?.l : spaces?.xl}px;
    `;
  }}
`;

export const Title = styled(Typography, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: DialogTitleExtraProps) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    const semanticColors = getSemanticColors(props);

    return [
      isSmall ? fontHeaderL(props) : fontHeaderXl(props),
      `color: ${semanticColors?.base?.textPrimary};`,
    ];
  }}
`;

export const Subtitle = styled(Typography, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: DialogTitleExtraProps) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    const semanticColors = getSemanticColors(props);

    return [
      isSmall ? fontBodyXxs(props) : fontBodyXs(props),
      `
        color: ${semanticColors?.base?.textSecondary};
        padding-top: 0px;
      `,
    ];
  }}
`;

export const Overline = styled(Typography, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: DialogTitleExtraProps) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return [
      isSmall ? fontBodyXs(props) : fontBodyS(props),
      `
        color: ${semanticColors?.base?.textSecondary};
        padding-bottom: ${spaces?.xxxs}px;
      `,
    ];
  }}
`;
