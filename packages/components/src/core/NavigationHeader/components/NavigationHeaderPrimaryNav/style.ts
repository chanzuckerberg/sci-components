import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  fontBodyS,
  getSemanticColors,
  getSpaces,
  fontBodySemiboldM,
  getCorners,
  fontBodyMediumS,
  fontBodySemiboldS,
} from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import { css, SerializedStyles } from "@emotion/react";
import Accordion from "src/core/Accordion";
import MenuItem from "src/core/MenuItem";
import Tag from "src/core/Tag";

interface PrimaryNavItemProps extends ExtraHeaderProps {
  active?: boolean;
  itemType?: "dropdown" | "text";
}

const doNotForwardProps = [
  "active",
  "hasInvertedStyle",
  "isNarrow",
  "hasSection",
];

const NarrowPrimaryNavItem = (props: PrimaryNavItemProps): SerializedStyles => {
  const { active, hasInvertedStyle } = props;

  const spaces = getSpaces(props);
  const colors = getSemanticColors(props);

  const activeBackgroundColor = hasInvertedStyle
    ? colors?.base.backgroundSecondaryInverse
    : colors?.base.backgroundSecondary;

  const activeBorderColor = hasInvertedStyle
    ? colors?.base?.borderOnFill
    : colors?.accent?.border;

  const inactiveBorderColor = hasInvertedStyle
    ? colors?.neutral?.fillPrimary
    : colors?.base.borderPrimary;

  return css`
    border-left: ${spaces?.xs}px solid
      ${active ? activeBorderColor : "transparent"};
    border-radius: 0;
    justify-content: start;
    padding: ${spaces?.m}px 0 ${spaces?.m}px
      ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
    background: ${active ? activeBackgroundColor : "transparent"};
    width: 100%;

    &:hover {
      box-shadow: none;
      background: ${hasInvertedStyle
        ? colors?.base.backgroundSecondaryInverse
        : colors?.base.backgroundSecondary};
      border-left: ${spaces?.xs}px solid
        ${active ? activeBorderColor : inactiveBorderColor};
    }
  `;
};

export const PrimaryNavItem = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;
  min-width: fit-content;

  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, isNarrow, active } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryHoverInverse
      : semanticColors?.base.ornamentSecondaryHover;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryPressedInverse
      : semanticColors?.base.ornamentSecondaryPressed;

    return css`
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;
      background-color: ${active
        ? hasInvertedStyle
          ? semanticColors?.base?.fillPressedInverse
          : semanticColors?.base?.fillPressed
        : "transparent"};

      svg {
        color: ${active ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.fillHoverInverse
          : semanticColors?.base.fillHover};
        box-shadow: none;

        ${StyledLabel} {
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryInverse
            : semanticColors?.base.textPrimary};
        }

        svg {
          color: ${ChevronHoverColor} !important;
        }
      }

      ${isNarrow && NarrowPrimaryNavItem(props)}
    `;
  }}
`;

export const StyledTag = styled(Tag)`
  margin: 0;
`;

export const StyledLabel = styled("span", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: PrimaryNavItemProps) => {
    const { hasInvertedStyle, active, isNarrow } = props;

    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    const activeColor = hasInvertedStyle
      ? colors?.base.textPrimaryInverse
      : colors?.base.textPrimary;

    const inactiveColor = hasInvertedStyle
      ? colors?.base.textSecondaryInverse
      : colors?.base.textSecondary;

    return [
      active ? fontBodySemiboldS(props) : fontBodyMediumS(props),
      css`
        display: flex;
        align-items: center;
        gap: ${spaces?.xs}px;
        color: ${active ? activeColor : inactiveColor};

        /* TODO: Double check with Connor! */
        /* ${StyledTag} {
           margin-right: -${spaces?.s}px;margin-right
        } */
      `,
    ];
  }}
`;

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  width: 100%;
  min-width: unset;

  .MuiAccordionSummary-content {
    ${fontBodySemiboldM}
  }

  .MuiAccordionDetails-root .MuiButtonBase-root .primary-text {
    ${fontBodyS}
  }

  ${(props: ExtraHeaderProps) => {
    const { hasInvertedStyle, isNarrow } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryInverse
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryInverse
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentPrimaryInverse
      : semanticColors?.accent.ornamentOpen;

    const isNarrowStyles = () => css`
      background: ${hasInvertedStyle
        ? semanticColors?.base.backgroundSecondaryInverse
        : semanticColors?.base.backgroundSecondary};
    `;

    return css`
      .MuiButtonBase-root {
        padding: ${spaces?.m}px ${spaces?.xl}px;
        color: ${textDefaultColor};

        .MuiAccordionSummary-expandIconWrapper {
          margin-top: ${spaces?.s}px !important;
        }

        svg {
          color: ${ChevronDefaultColor};
        }

        &[aria-expanded="true"] {
          color: ${textOpenColor};

          svg {
            color: ${ChevronOpenColor} !important;
          }
        }

        &:hover {
          padding: ${spaces?.m}px ${spaces?.xl}px ${spaces?.m}px
            ${(spaces?.l ?? 0) + (spaces?.xxxs ?? 0)}px;
          width: 100%;
          box-shadow: none;
          background: ${hasInvertedStyle
            ? semanticColors?.base.backgroundSecondaryInverse
            : semanticColors?.base.backgroundSecondary};
          border-left: ${spaces?.xs}px solid
            ${semanticColors?.base.borderPrimary};
          color: ${hasInvertedStyle
            ? semanticColors?.base.textPrimaryInverse
            : semanticColors?.base.textPrimary};

          svg {
            color: ${hasInvertedStyle
              ? semanticColors?.base?.ornamentPrimaryInverse
              : semanticColors?.base.ornamentSecondaryHover} !important;
          }

          ${isNarrow && isNarrowStyles()}
        }
      }

      .MuiCollapse-root .MuiAccordionDetails-root {
        padding: 0;

        .MuiButtonBase-root {
          padding: ${spaces?.m}px 0 ${spaces?.m}px 34px !important;

          .primary-text {
            color: ${hasInvertedStyle
              ? semanticColors?.base.textSecondaryInverse
              : semanticColors?.base.textSecondary} !important;
          }

          &:hover {
            padding: ${spaces?.m}px 0 ${spaces?.m}px
              calc(34px - ${spaces?.xs}px) !important;

            .primary-text {
              color: ${hasInvertedStyle
                ? semanticColors?.base.textPrimaryInverse
                : semanticColors?.base.textPrimary} !important;
            }
          }
        }
      }
    `;
  }}
`;

export const StyledSubItem = styled(MenuItem)`
  &.MuiButtonBase-root.MuiMenuItem-root:hover {
    span.primary-text {
      font-weight: 600;
    }
  }
`;
