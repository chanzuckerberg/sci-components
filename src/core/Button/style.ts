import styled from "@emotion/styled";
import { Button } from "@material-ui/core";
import { getCorners, getSpacings, Props } from "../styles";

export interface IsRounded extends Props {
  isRounded?: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isRounded",
})`
  &.MuiButton-root {
    ${(props: IsRounded) => {
      if (!props.isRounded) return ``;

      const corners = getCorners(props);
      const spacings = getSpacings(props);

      return `
        border-radius: ${corners?.l}px;
        padding: ${spacings?.xs}px ${spacings?.l}px;
        min-width: 120px;
        height: 34px;
      `;
    }}
  }
`;
