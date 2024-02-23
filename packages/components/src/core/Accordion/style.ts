import { css, SerializedStyles } from "@emotion/react";
import {
  Accordion,
  accordionClasses,
  accordionSummaryClasses,
  accordionDetailsClasses,
} from "@mui/material";
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
    const spaces = getSpaces(props);

    return css`
      &.${accordionClasses.root} {
        box-shadow: ${shadows?.none};
        font-family: ${typography?.fontFamily?.body};
        border-bottom: ${useDivider ? border?.base[300] : "none"};
        height: fit-content;

        & .${accordionSummaryClasses.root} {
          min-height: 44px;

          &.${accordionSummaryClasses.expanded} {
            min-height: unset;
          }

          & .MuiAccordionSummary-expandIcon,
          & .${accordionSummaryClasses.expandIconWrapper} {
            padding: 0;
            align-self: flex-start;
            margin-top: ${spaces?.xxxs}px;
          }
        }

        .${accordionDetailsClasses.root} {
          padding: ${spaces?.m}px;
          padding-top: ${spaces?.xxs}px;
        }

        &:before {
          opacity: 0;
        }

        &.${accordionClasses.expanded} {
          margin: 0;
        }

        ${togglePosition === "left" && leftPosition(props)}
      }
    `;
  }}
`;

const leftPosition = (props: AccordionExtraProps): SerializedStyles => {
  const spaces = getSpaces(props);

  return css`
    &.${accordionClasses.root} {
      & .${accordionSummaryClasses.root} {
        flex-direction: row-reverse;

        .${accordionSummaryClasses.content} {
          padding-left: ${spaces?.s}px;
        }

        .${accordionSummaryClasses.expandIconWrapper} {
          margin: 0;
          transform: rotate(-90deg);
          align-self: flex-start;
          margin-top: ${spaces?.xxxs}px;

          &.${accordionSummaryClasses.expanded} {
            transform: rotate(0deg);
          }
        }
      }

      & .${accordionDetailsClasses.root} {
        padding-left: 36px;
      }
    }
  `;
};
