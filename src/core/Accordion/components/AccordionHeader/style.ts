import { css } from "@emotion/react";
import { AccordionSummary } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
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
      min-height: 40px;
      align-items: flex-start;
      box-sizing: border-box;

      &.Mui-expanded {
        min-height: 40px;
      }

      .MuiAccordionSummary-content {
        margin: 0;
        flex-direction: column;

        &.Mui-expanded {
          margin: 0;
        }
      }

      .MuiAccordionSummary-expandIcon {
        padding: 0px;
        margin-right: 0;
        margin-left: ${spaces?.m}px;
        svg {
          color: ${colors?.gray[500]};
        }
      }
    `;
  }}
`;

export const StyledSubtitle = styled("p")`
  ${fontBodyXxs}

  ${(props: CommonThemeProps) => {
    const colors = getColors(props);

    return css`
      color: ${colors?.gray[500]};
      margin: 0;
    `;
  }}
`;
