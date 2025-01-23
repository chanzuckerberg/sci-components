import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces, Spaces } from "src/core/styles";

export const StyledSection = styled.section`
  display: flex;
  align-items: center;

  ${(props: CommonThemeProps & { gap?: keyof Spaces }) => {
    const spaces = getSpaces(props);

    return `
      column-gap: ${spaces?.[props?.gap ?? "xl"]}px;

      ${props.theme?.breakpoints.down("md")} {
        align-items: start;
        flex-direction: column;
      }
    `;
  }}
`;
