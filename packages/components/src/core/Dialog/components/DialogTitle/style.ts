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

export interface DialogTitleExtraProps extends CommonThemeProps {
  sdsSize: "xs" | "s" | "m" | "l";
}

export const StyledDialogTitle = styled(DialogTitle)`
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

export const Title = styled(Typography)`
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

export const Subtitle = styled(Typography)`
  ${(props: DialogTitleExtraProps) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return [
      isSmall ? fontBodyXxs(props) : fontBodyXs(props),
      `
        color: ${semanticColors?.base?.textSecondary};
        padding-top: ${sdsSize === "l" ? spaces?.l : 0}px;
      `,
    ];
  }}
`;

export const Overline = styled(Typography)`
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
