import { css } from "@emotion/react";
import { AccordionDetails } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps, fontBodyS, getSpaces } from "src/core/styles";

export const StyledAccordionDetails = styled(AccordionDetails)`
  ${fontBodyS}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return css`
      padding: ${spaces?.m}px;
      padding-top: ${spaces?.xxs}px;
    `;
  }}
`;
