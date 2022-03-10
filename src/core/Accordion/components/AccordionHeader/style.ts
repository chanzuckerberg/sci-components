import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AccordionSummary } from "@material-ui/core";
import {
  CommonThemeProps,
  fontHeaderS,
  getColors,
  getSpaces,
} from "src/core/styles";

export const StyledAccordionHeader = styled(AccordionSummary)`
  ${fontHeaderS}
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const colors = getColors(props);

    return css`
      padding: ${spaces?.m}px;
      outline: 1px solid aqua;
      min-height: 40px;

      &.Mui-expanded {
        min-height: 40px;
      }

      .MuiAccordionSummary-content,
      .MuiAccordionSummary-content.Mui-expanded {
        margin: 0;
      }

      .MuiAccordionSummary-expandIcon svg {
        color: ${colors?.gray[500]};
      }
    `;
  }};
`;
