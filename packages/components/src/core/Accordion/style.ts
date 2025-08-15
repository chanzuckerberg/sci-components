import { css, SerializedStyles } from "@emotion/react";
import {
  Accordion,
  accordionClasses,
  accordionSummaryClasses,
  accordionDetailsClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  getBorders,
  getIconSizes,
  getShadows,
  getSpaces,
  fontBodyMediumS,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";

export interface AccordionExtraProps extends CommonThemeProps {
  useDivider?: boolean;
  togglePosition?: "right" | "left";
  chevronSize?: "xs" | "s" | "l" | "xl";
}

const sdsPropNames = ["useDivider", "togglePosition", "chevronSize"];

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: AccordionExtraProps) => {
    const { useDivider, togglePosition } = props;

    const shadows = getShadows(props);
    const borders = getBorders(props);
    const spaces = getSpaces(props);

    return css`
      &.${accordionClasses.root} {
        background-color: transparent;
        background-image: none;
        box-shadow: ${shadows?.none};
        border-bottom: ${useDivider ? borders?.base?.divider : "none"};
        height: fit-content;
        padding: ${spaces?.s}px;

        & .${accordionSummaryClasses.root} {
          ${fontBodyMediumS(props)}
          ${focusVisibleA11yStyle(props)}
          padding: 0;
          min-height: unset;

          &.${accordionSummaryClasses.focusVisible} {
            background-color: unset;
          }

          &.${accordionSummaryClasses.expanded} {
            min-height: unset;
          }

          & .MuiAccordionSummary-expandIcon,
          & .${accordionSummaryClasses.expandIconWrapper} {
            padding: 0;
            align-self: flex-start;
          }
        }

        .${accordionDetailsClasses.root} {
          ${fontBodyXs(props)}
          padding: ${spaces?.l}px 0 0 0;
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
  const iconSizes = getIconSizes(props);

  return css`
    &.${accordionClasses.root} {
      & .${accordionSummaryClasses.root} {
        flex-direction: row-reverse;
        padding: 0;

        .${accordionSummaryClasses.content} {
          padding-left: ${spaces?.s}px;
        }

        .${accordionSummaryClasses.expandIconWrapper} {
          margin: 0;
          transform: rotate(-90deg);
          align-self: flex-start;

          &.${accordionSummaryClasses.expanded} {
            transform: rotate(0deg);
          }
        }
      }

      /** This is to adjust the padding of the AccordionDetails when the togglePosition is left
        * The padding-left is the sum of the
        * left padding of the AccordionButton = spaces?.s
        * the width of the expandIcon = iconSizes?.xs.width
        * and the left padding of the AccordionSummary = spaces?.s 
        */
      & .${accordionDetailsClasses.root} {
        padding-left: ${(spaces?.s ?? 8) + (iconSizes?.xs.width ?? 12)}px;
      }
    }
  `;
};
