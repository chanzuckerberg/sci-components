import { css } from "@emotion/react";
import { AccordionSummary, accordionSummaryClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontHeaderS,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export const StyledAccordionHeader = styled(AccordionSummary)`
  ${fontHeaderS}
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

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

      .${accordionSummaryClasses.expandIconWrapper} {
        margin-left: ${spaces?.m}px;
        align-self: center;
        svg {
          color: ${semanticComponentColors?.base?.icon};
        }
      }
    `;
  }}
`;

export const StyledSubtitle = styled("p")`
  ${fontBodyXxs}

  ${(props: CommonThemeProps) => {
    const semanticTextColors = getSemanticTextColors(props);

    return css`
      color: ${semanticTextColors?.base?.secondary};
      margin: 0;
    `;
  }}
`;
