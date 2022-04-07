import { DialogTitle, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as ExtraProps,
  fontBodyXs,
  fontHeaderXl,
  getColors,
  getSpaces,
} from "src/core/styles";

export type { ExtraProps };

export const StyledDialogTitle = styled(DialogTitle)`
  padding: 0;
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.xl || 0}px;
    `;
  }}
`;

/**
 * Recommends adding props: variant="h6"
 */
export const Title = styled(Typography)`
  ${fontHeaderXl}

  color: black;
`;

/**
 * Recommends adding props: variant="h6"
 */
export const Subtitle = styled(Typography)`
  ${fontBodyXs}

  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;
