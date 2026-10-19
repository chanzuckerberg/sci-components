import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getCorners,
  getSpaces,
} from "@components/src/core/styles";
import Tag from "@components/src/core/Tag";

export const StyledChip = styled(Tag)`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return css`
      border-radius: ${corners?.m}px;
      padding: 0 ${spaces?.xs}px;
    `;
  }}
`;
