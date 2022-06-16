import { styled } from "@mui/material/styles";
import { getSpaces } from "src/core/styles";
import TagFilter from "src/core/TagFilter";

export const StyledTagFilter = styled(TagFilter)`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin: 0 ${spacings?.xxs}px ${spacings?.xs}px 0;
    `;
  }}
`;
