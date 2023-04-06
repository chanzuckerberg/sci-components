import { DialogTitle, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as DialogTitleExtraProps,
  fontBodyXs,
  fontHeaderXl,
  getColors,
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

  color: black;
`;

export const Subtitle = styled(Typography)`
  ${fontBodyXs}

  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;
