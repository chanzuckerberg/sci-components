import { css } from "@emotion/react";
import { AccordionSummary, accordionSummaryClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodySemiboldL,
  fontBodyXxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = ["chevronSize", "hasInvertedStyle"];

export const StyledAccordionHeader = styled(AccordionSummary, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop),
})`
  ${fontBodySemiboldL}
  ${(props: CommonThemeProps & { chevronSize: "xs" | "s" }) => {
    const { chevronSize } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return css`
      padding: ${spaces?.m}px;
      align-items: flex-start;
      box-sizing: border-box;

      .${accordionSummaryClasses.content} {
        margin: 0;
        flex-direction: column;
        padding-right: ${spaces?.s}px;

        &.${accordionSummaryClasses.expanded} {
          margin: 0;
        }
      }

      & .${accordionSummaryClasses.expandIconWrapper} {
        margin-top: ${chevronSize === "xs"
          ? spaces?.xs
          : spaces?.xxs}px !important;

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
