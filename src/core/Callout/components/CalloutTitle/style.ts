import styled from "@emotion/styled";
import { AlertTitle } from "@material-ui/lab";
import { fontBody, getSpaces } from "src/core/styles";

const fontBodyXs = fontBody("xs");

export const StyledCalloutTitle = styled(AlertTitle)`
  ${fontBodyXs}

  ${(props) => {
    const spacings = getSpaces(props);

    return `
    margin: ${spacings?.xxxs}px 0 ${spacings?.xs}px;
  `;
  }}
`;
