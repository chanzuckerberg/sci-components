import { AlertTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontBodyXs, getSpaces } from "src/core/styles";

export const StyledCalloutTitle = styled(AlertTitle)`
  ${fontBodyXs}

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin: ${spaces?.xxxs}px 0 ${spaces?.xs}px;
    `;
  }}
`;
