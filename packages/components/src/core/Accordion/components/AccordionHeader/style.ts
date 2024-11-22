import { css } from "@emotion/react";
import { AccordionSummary, accordionSummaryClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export const StyledAccordionHeader = styled(AccordionSummary)`
  ${fontHeaderS}
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      padding: ${spaces?.m}px;
      align-items: flex-start;
      box-sizing: border-box;

      .${accordionSummaryClasses.content} {
        margin: 0;
        flex-direction: column;

        &.${accordionSummaryClasses.expanded} {
          margin: 0;
        }
      }

      & .${accordionSummaryClasses.expandIconWrapper} {
        margin-left: ${spaces?.m}px;
        margin-top: ${spaces?.xxs}px !important;
        align-self: center;

        svg {
          color: ${semanticColors?.base?.ornamentSecondary};
        }
      }

      &:hover {
        & .${accordionSummaryClasses.expandIconWrapper} {
          svg {
            color: ${semanticColors?.base?.ornamentSecondaryHover};
          }
        }
      }
    `;
  }}
`;

export const StyledSubtitle = styled("p")`
  ${fontBodyXxs}

  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return css`
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
    `;
  }}
`;
