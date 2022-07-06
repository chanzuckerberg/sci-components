import { css, SerializedStyles } from "@emotion/react";
import { Accordion } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  getBorders,
  getShadows,
  getSpaces,
  getTypography,
} from "../styles";

export interface AccordionExtraProps extends CommonThemeProps {
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
  ${(props: AccordionExtraProps) => {
    const { useDivider, togglePosition } = props;

    const shadows = getShadows(props);
    const typography = getTypography(props);
    const border = getBorders(props);

    return css`
      &.MuiAccordion-root {
        box-shadow: ${shadows?.none};
        font-family: ${typography?.fontFamily};
        border-bottom: ${useDivider ? border?.gray[300] : "none"};
        height: fit-content;
        ${togglePosition === "left" && leftPosition(props)}

        & .MuiAccordionSummary-root {
          padding: 10px;
          min-height: 40px;

          &.Mui-expanded {
            min-height: unset;
          }

          & .MuiAccordionSummary-expandIcon {
            padding: 0;
            align-self: flex-start;
          }
        }

        .MuiAccordionDetails-root {
          padding: 10px;
          padding-top: 4px;
        }

        &:before {
          opacity: 0;
        }

        &.Mui-expanded {
          margin: 0;
        }
      }
    `;
  }}
`;

const leftPosition = (props: AccordionExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    &.MuiAccordion-root {
      & .MuiAccordionSummary-root {
        flex-direction: row-reverse;

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

      & .MuiAccordionDetails-root {
        padding-left: 30px;
      }
    }
  `;
};
