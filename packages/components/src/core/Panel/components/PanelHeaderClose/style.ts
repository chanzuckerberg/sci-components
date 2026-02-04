import styled from "@emotion/styled";
import { CommonThemeProps, getIconSizes } from "src/core/styles";

export const StyledPanelHeaderClose = styled("div")`
  ${(props: CommonThemeProps) => {
    const iconSizes = getIconSizes(props);

    return `
    display: flex;
    justify-content: end;
    align-items: center;

    button {
      svg {
        width: ${iconSizes?.l?.width}px;
        height: ${iconSizes?.l?.height}px;
      }
    }
  `;
  }}
`;
