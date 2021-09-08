import styled from "@emotion/styled";
import Chip from "src/core/Chip";
import { getSpacings } from "src/core/styles";

export const StyledChip = styled(Chip)`
  ${(props) => {
    const spacings = getSpacings(props);

    return `
      margin: 0 ${spacings?.xxs}px ${spacings?.xs}px 0;
    `;
  }}
`;
