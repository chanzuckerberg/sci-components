import styled from "@emotion/styled";
import { Args } from "@storybook/react";
import RawInputDropdown from "src/core/InputDropdown";

export const StyledInputDropdown = styled(RawInputDropdown)`
  ${({ width }: Args) => {
    return `
      width: fit-content;
      max-width: ${width || 250}px;
    `;
  }}
`;
