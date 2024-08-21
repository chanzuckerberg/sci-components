import { DialogTitle, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as DialogTitleExtraProps,
  fontBodyS,
  fontBodyXs,
  fontHeaderXl,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export type { DialogTitleExtraProps };

export const StyledDialogTitle = styled(DialogTitle)`
  padding: 0;
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.xl || 0}px;
    `;
  }}
`;

export const Title = styled(Typography)`
  ${fontHeaderXl}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const Subtitle = styled(Typography)`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

export const Overline = styled(Typography)`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      padding-bottom: ${spaces?.xxxs}px;
    `;
  }}
`;
