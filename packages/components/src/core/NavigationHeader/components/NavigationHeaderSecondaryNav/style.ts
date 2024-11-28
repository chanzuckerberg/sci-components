import styled from "@emotion/styled";
import Accordion from "src/core/Accordion";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  fontBodyS,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export const StyledTextItem = styled(Button)`
  ${fontHeaderS}

  background: none;
  justify-content: flex-start;
  min-height: 44px;
  width: 100%;

  &:hover {
    background: none;
  }

  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xs}px;
      color: ${colors?.base.textSecondary};

      &:hover {
        color: ${colors?.base.textPrimary};
      }

      ${props.theme?.breakpoints.down("md")} {
        padding-left: ${spaces?.xl}px;

        &:hover {
          background: ${colors?.base.surfaceSecondary};
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

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const colors = getSemanticColors(props);

    return `
      .MuiButtonBase-root {
        padding: ${spaces?.m}px ${spaces?.xl}px;
        color: ${colors?.base.textSecondary};

        &:hover {
          color: ${colors?.base.textPrimary};

          ${props.theme?.breakpoints.down("md")} {
            background: ${colors?.base.surfaceSecondary};
          }
        }
      }

      .MuiCollapse-root .MuiAccordionDetails-root  {
        padding: 0;

        .MuiButtonBase-root {
          padding: ${spaces?.m}px 0 ${spaces?.m}px 34px !important;

          .primary-text {
            color: ${colors?.base.textSecondary} !important;

            &:hover {
              color: ${colors?.base.textPrimary} !important;
            }
          }
        }
      }
    `;
  }}
`;
