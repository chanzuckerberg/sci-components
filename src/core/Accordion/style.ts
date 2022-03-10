import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Accordion } from "@material-ui/core";
import { CommonThemeProps, getShadows, getTypography } from "../styles";

export const StyledAccordion = styled(Accordion)`
  ${(props: CommonThemeProps) => {
    const shadows = getShadows(props);
    const typography = getTypography(props);

    return css`
      font-family: ${typography?.fontFamily};
      box-shadow: ${shadows?.none};
      outline: 1px solid coral;
    `;
  }};
`;
