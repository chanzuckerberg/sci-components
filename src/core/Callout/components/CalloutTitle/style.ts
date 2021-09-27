import styled from "@emotion/styled";
import { AlertTitle } from "@material-ui/lab";
import { fontHeader, getSpacings } from "src/core/styles";

const fontHeaderXs = fontHeader("xs");

export const StyledCalloutTitle = styled(AlertTitle)`
  ${fontHeaderXs};

  ${(props) => {
    const spacings = getSpacings(props);

    return `
    margin: ${spacings?.xxxs}px 0 ${spacings?.xs}px;
  `;
  }};
`;
