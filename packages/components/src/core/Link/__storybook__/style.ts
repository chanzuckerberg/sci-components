import styled from "@emotion/styled";
import { fontBodyS } from "src/core/styles";

export const StyledWrapper = styled("div")`
  ${fontBodyS}

  display: grid;
  grid-column-gap: 24px;
  grid-template-columns: repeat(3, 250px);
`;
