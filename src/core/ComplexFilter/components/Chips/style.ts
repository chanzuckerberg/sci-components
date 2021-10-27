import styled from "@emotion/styled";
import Chip from "src/core/Chip";
import { getSpaces } from "src/core/styles";

export const StyledChip = styled(Chip)`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin: 0 ${spacings?.xxs}px ${spacings?.xs}px 0;
    `;
  }}
`;
