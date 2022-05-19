import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AccordionDetails } from "@material-ui/core";
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
