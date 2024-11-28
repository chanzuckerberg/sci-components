import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export const StyledSection = styled.section`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      gap-x: ${spaces?.xl}px;

      ${props.theme?.breakpoints.down("md")} {
        align-items: start;
        flex-direction: column;
        gap-y: ${spaces?.m}px;
      }
    `;
  }}
`;
