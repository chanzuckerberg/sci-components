import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { Accordion } from "@material-ui/core";
import {
  CommonThemeProps,
  getBorders,
  getShadows,
  getSpaces,
  getTypography,
} from "../styles";

export interface ExtraProps extends CommonThemeProps {
  useDivider?: boolean;
  togglePosition?: "right" | "left";
  id: string;
}

const sdsPropNames = ["useDivider", "togglePosition"];

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: ExtraProps) => {
    const { useDivider, togglePosition } = props;

    const shadows = getShadows(props);
    const typography = getTypography(props);
    const border = getBorders(props);

    return css`
      font-family: ${typography?.fontFamily};
      box-shadow: ${shadows?.none};
      border-bottom: ${useDivider ? border?.gray[300] : "none"};
      ${togglePosition === "left" && leftPosition(props)};
    `;
  }};
`;

const leftPosition = (props: ExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    .MuiAccordionSummary-root {
      flex-direction: row-reverse;
      padding-left: 0;

      .MuiAccordionSummary-content {
        padding-left: ${spaces?.xs}px;
      }

      .MuiIconButton-edgeEnd {
        margin: 0;
        transform: rotate(-90deg);
        align-self: flex-start;
        margin-top: ${spaces?.xxs}px;

        &.Mui-expanded {
          transform: rotate(0deg);
        }
      }
    }
  `;
};
