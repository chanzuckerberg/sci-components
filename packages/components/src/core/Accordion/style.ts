"use client";

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
  fontBodyXs,
  getBorders,
  getIconSizes,
  getShadows,
  getSpaces,
  getTypography,
} from "src/core/styles";
import { focusVisibleA11yStyle } from "src/core/styles/common/mixins/a11y";

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
    const borders = getBorders(props);
    const spaces = getSpaces(props);

    return css`
      &.${accordionClasses.root} {
        box-shadow: ${shadows?.none};
        font-family: ${typography?.fontFamily?.body};
        border-bottom: ${useDivider ? borders?.base?.divider : "none"};
        height: fit-content;

        & .${accordionSummaryClasses.root} {
          ${focusVisibleA11yStyle()}
          min-height: 44px;

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
            margin-top: ${spaces?.xxxs}px;
          }
        }

        .${accordionDetailsClasses.root} {
          ${fontBodyXs(props)}
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
  const iconSizes = getIconSizes(props);

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

      /** This is to adjust the padding of the AccordionDetails when the togglePosition is left
        * The padding-left is the sum of the
        * left padding of the AccordionButton = spaces?.m
        * the width of the expandIcon = iconSizes?.xs.width
        * and the left padding of the AccordionSummary = spaces?.s 
        */
      & .${accordionDetailsClasses.root} {
        padding-left: ${(spaces?.m ?? 12) +
        (iconSizes?.xs.width ?? 12) +
        (spaces?.s ?? 8)}px;
      }
    }
  `;
};
