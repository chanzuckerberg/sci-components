import styled from "@emotion/styled";
import Button from "src/core/Button";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export const StyledButton = styled(Button)`
  position: absolute;

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      right: ${spaces?.xxl}px;
    `;
  }}
`;
