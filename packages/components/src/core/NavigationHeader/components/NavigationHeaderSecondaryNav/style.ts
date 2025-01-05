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

interface StyledTextItemProps extends ExtraHeaderProps {
  open: boolean;
}

export const StyledTextItem = styled(Button)`
  ${fontHeaderS}

  background: none;
  justify-content: flex-start;
  min-height: 44px;
  width: 100%;

  &:hover {
    background: none;
  }

  ${(props: StyledTextItemProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xs}px;
      color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary};

      svg {
        color: ${props.open ? colors?.accent.ornamentOpen : colors?.base.ornamentSecondary};
      }

      &:hover {
        color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};

        svg {
          color: ${colors?.base.ornamentSecondaryHover};
        }
      }

      ${props.theme?.breakpoints.down("md")} {
        padding-left: ${spaces?.xl}px;

        &:hover {
          background: ${props.hasInvertedStyle ? colors?.base.backgroundSecondaryInverse : colors?.base.backgroundSecondary};
        }
      }
    `;
  }}
`;

export const StyledAccordion = styled(Accordion)`
  width: 100%;

  .MuiAccordionDetails-root .MuiButtonBase-root .primary-text {
    ${fontBodyS}
  }

  ${(props: ExtraHeaderProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      .MuiButtonBase-root {
        padding: ${spaces?.m}px ${spaces?.xl}px;
        color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary};

        &:hover {
          color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary};

          ${props.theme?.breakpoints.down("md")} {
            background: ${props.hasInvertedStyle ? colors?.base.backgroundSecondaryInverse : colors?.base.backgroundSecondary};
          }
        }
      }

      .MuiCollapse-root .MuiAccordionDetails-root  {
        padding: 0;

        .MuiButtonBase-root {
          padding: ${spaces?.m}px 0 ${spaces?.m}px 34px !important;

          .primary-text {
            color: ${props.hasInvertedStyle ? colors?.base.textSecondaryInverse : colors?.base.textSecondary} !important;

            &:hover {
              color: ${props.hasInvertedStyle ? colors?.base.textPrimaryInverse : colors?.base.textPrimary} !important;
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
