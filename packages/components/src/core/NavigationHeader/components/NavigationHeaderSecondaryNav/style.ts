import styled from "@emotion/styled";
import Accordion from "src/core/Accordion";
import Button, { SdsMinimalButtonProps } from "src/core/Button";
import {
  fontBodyMediumS,
  fontBodyS,
  fontHeaderS,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import { ExtraHeaderProps } from "../../style";
import MenuItem from "src/core/MenuItem";
import { css, SerializedStyles } from "@emotion/react";

export type StyledTextItemProps = ExtraHeaderProps &
  SdsMinimalButtonProps & { open: boolean };

const ButtonDoNotForwardProps = ["isNarrow"];

const NarrowStyledTextItem = (props: StyledTextItemProps): SerializedStyles => {
  const { hasInvertedStyle } = props;

  const semanticColors = getSemanticColors(props);
  const spaces = getSpaces(props);

  return css`
    padding-left: ${spaces?.xl}px;
    border-radius: 0;
    width: 100%;
    min-height: 44px;

    &:hover {
      box-shadow: none;
      background: ${hasInvertedStyle
        ? semanticColors?.base.backgroundSecondaryInverse
        : semanticColors?.base.backgroundSecondary};
    }
  `;
};

export const StyledTextItem = styled(Button, {
  shouldForwardProp: (prop: string) => !ButtonDoNotForwardProps.includes(prop),
})`
  ${fontBodyMediumS}

  justify-content: flex-start;
  width: fit-content;
  min-width: unset;

  ${(props: StyledTextItemProps) => {
    const { hasInvertedStyle, open, isNarrow } = props;

    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    const textDefaultColor = hasInvertedStyle
      ? semanticColors?.base.textSecondaryInverse
      : semanticColors?.base.textSecondary;

    const textOpenColor = hasInvertedStyle
      ? semanticColors?.base.textPrimaryInverse
      : semanticColors?.base.textPrimary;

    const ChevronDefaultColor = hasInvertedStyle
      ? semanticColors?.base.ornamentSecondaryInverse
      : semanticColors?.base.ornamentSecondary;

    const ChevronHoverColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryHoverInverse
      : semanticColors?.base.ornamentSecondaryHover;

    const ChevronOpenColor = hasInvertedStyle
      ? semanticColors?.base?.ornamentSecondaryPressedInverse
      : semanticColors?.base.ornamentSecondaryPressed;

    return css`
      padding: ${spaces?.xxxs}px ${spaces?.m}px;
      border-radius: ${corners?.l}px;
      background-color: ${open
        ? hasInvertedStyle
          ? semanticColors?.base?.fillPressedInverse
          : semanticColors?.base?.fillPressed
        : "transparent"};

      gap: ${spaces?.xs}px;
      color: ${open ? textOpenColor : textDefaultColor};

      svg {
        color: ${open ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: ${hasInvertedStyle
          ? semanticColors?.base.fillHoverInverse
          : semanticColors?.base.fillHover};
        box-shadow: none;

        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};

        svg {
          color: ${ChevronHoverColor};
        }
      }

      ${isNarrow && NarrowStyledTextItem(props)}
    `;
  }}
`;

const doNotForwardProps = ["hasInvertedStyle", "isNarrow"];

export const StyledAccordion = styled(Accordion, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  width: 100%;
  min-width: unset;

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

        .MuiButtonBase-root {
          padding: ${spaces?.m}px 0 ${spaces?.m}px 34px !important;

          &:hover {
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
