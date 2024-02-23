import { AlertTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyXs, getSpaces } from "src/core/styles";

export const StyledCalloutTitle = styled(AlertTitle)`
  ${fontBodyXs}

  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin: ${spacings?.xxxs}px 0 ${spacings?.xs}px;
    `;
  }}
`;
