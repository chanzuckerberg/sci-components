import styled from "@emotion/styled";
import { Checkbox as RawCheckbox, CheckboxProps } from "@material-ui/core";
import React from "react";
import { getColors } from "../styles";

export { CheckboxProps };

const StyledCheckbox = styled(RawCheckbox)`
  ${(props) => {
    const colors = getColors(props);
    return `
      color: ${colors?.gray[300]};
      &:hover {
        color: ${colors?.gray[400]};
        background-color: transparent;
      }
      &.Mui-checked {
        background-color: transparent;
      }
    `;
  }}
  &:hover {
  }
`;

const Checkbox = (props: CheckboxProps): JSX.Element => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
