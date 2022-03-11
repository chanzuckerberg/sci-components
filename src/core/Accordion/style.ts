import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Accordion } from "@material-ui/core";
import {
  CommonThemeProps,
  getBorders,
  getShadows,
  getTypography,
} from "../styles";

export interface ExtraProps extends CommonThemeProps {
  useDivider?: boolean;
}

export const StyledAccordion = styled(Accordion)`
  ${(props: ExtraProps) => {
    const { useDivider } = props;
    const shadows = getShadows(props);
    const typography = getTypography(props);
    const border = getBorders(props);

    return css`
      font-family: ${typography?.fontFamily};
      box-shadow: ${shadows?.none};
      border-bottom: ${useDivider ? border?.gray[300] : "none"};
    `;
  }};
`;
