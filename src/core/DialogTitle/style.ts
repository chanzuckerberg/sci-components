import styled from "@emotion/styled";
import { DialogTitle, Typography } from "@material-ui/core";
import {
  fontBodyXs,
  fontHeaderXl,
  getColors,
  getSpaces,
  Props as ExtraProps,
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
