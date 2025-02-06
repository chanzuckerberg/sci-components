import styled from "@emotion/styled";
import Accordion from "src/core/Accordion";
import Button from "src/core/Button";
import {
  fontBodyS,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import MenuItem from "src/core/MenuItem";
import { css } from "@emotion/react";

interface StyledTextItemProps extends ExtraHeaderProps {
  open: boolean;
}

const ButtonDoNotForwardProps = ["isNarrow"];

export const StyledTextItem = styled(Button, {
  shouldForwardProp: (prop: string) => !ButtonDoNotForwardProps.includes(prop),
})`
  ${fontHeaderS}

  background: none;
  justify-content: flex-start;
  min-height: 44px;
  width: 100%;

  &:hover {
    background: none;
    box-shadow: none;
  }

  ${(props: StyledTextItemProps) => {
    const { hasInvertedStyle, open, isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

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
      padding-left: ${spaces?.xl}px;

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.backgroundSecondaryInverse
          : semanticColors?.base.backgroundSecondary};
      }
    `;

    return css`
      gap: ${spaces?.xs}px;
      color: ${open ? textOpenColor : textDefaultColor};

      svg {
        color: ${open ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};

        svg {
          color: ${hasInvertedStyle
            ? semanticColors?.base?.ornamentPrimaryInverse
            : semanticColors?.base.ornamentSecondaryHover};
        }
      }

      ${isNarrow && isNarrowStyles()}
    `;
  }}
`;

const doNotForwardProps = ["hasInvertedStyle", "isNarrow"];

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  width: 100%;

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

            &:hover {
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
