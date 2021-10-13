import styled from "@emotion/styled";
import { AlertTitle } from "@material-ui/lab";
import { fontBody, getSpacings } from "src/core/styles";

const fontBodyXs = fontBody("xs");

export const StyledCalloutTitle = styled(AlertTitle)`
  ${fontBodyXs};

  ${(props) => {
    const spacings = getSpacings(props);

    return `
    margin: ${spacings?.xxxs}px 0 ${spacings?.xs}px;
  `;
  }};
`;
