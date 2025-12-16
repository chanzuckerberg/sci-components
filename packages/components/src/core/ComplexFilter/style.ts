import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export const Wrapper = styled("div")`
  min-width: 150px;
`;

export const StyledChipsWrapper = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.s}px;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.xxs}px;
    `;
  }}
`;
