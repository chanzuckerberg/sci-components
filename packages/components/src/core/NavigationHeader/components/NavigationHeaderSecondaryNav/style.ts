import styled from "@emotion/styled";
import Accordion from "src/core/Accordion";
import Button, { SdsMinimalButtonProps } from "src/core/Button";
import {
  fontBodyS,
  fontHeaderS,
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
  ${fontHeaderS}

  background: none;
  justify-content: flex-start;
  min-height: 44px;
  width: 100%;

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

    return css`
      gap: ${spaces?.xs}px;
      color: ${open ? textOpenColor : textDefaultColor};

      svg {
        color: ${open ? ChevronOpenColor : ChevronDefaultColor};
      }

      &:hover {
        background: none;
        box-shadow: none;
        color: ${hasInvertedStyle
          ? semanticColors?.base.textPrimaryInverse
          : semanticColors?.base.textPrimary};

        svg {
          color: ${hasInvertedStyle
            ? semanticColors?.base?.ornamentPrimaryInverse
            : semanticColors?.base.ornamentSecondaryHover};
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
