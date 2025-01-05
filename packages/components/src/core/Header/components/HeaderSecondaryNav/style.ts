import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  getSemanticColors,
  getSpaces,
  getTypography,
} from "src/core/styles";

export const StyledTextItem = styled(Button)`
  background: none;

  &:hover {
    background: none;
  }

  ${(props: CommonThemeProps) => {
    const colors = getSemanticColors(props);
    const typography = getTypography(props);
    const font = typography?.styles.header.semibold.s;
    const spaces = getSpaces(props);

    return `
      gap: ${spaces?.xs}px;
      color: ${colors?.base.textSecondary};
      font-size: ${font?.fontSize}px;
      font-weight: ${font?.fontWeight};
      line-height: ${font?.lineHeight};

      &:hover {
        color: ${colors?.base.textPrimary};
      }
    `;
  }}
`;
