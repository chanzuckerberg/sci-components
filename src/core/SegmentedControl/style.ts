import styled from "@emotion/styled";
import { ButtonGroup } from "@material-ui/core";

const sdsPropNames = ["buttonDefinition"];

export const StyledSegmentedControl = styled(ButtonGroup, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  background-color: cyan;
`;
