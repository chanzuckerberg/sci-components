import styled from "@emotion/styled";
import { Radio as RawRadio } from "@material-ui/core";
import { getColors } from "../styles";

export const StyledRadioButton = styled(RawRadio)`
  ${(props) => {
    const colors = getColors(props);
    return `
      color: ${colors?.gray[400]};
      &:hover {
        color: ${colors?.gray[500]};
        background-color: transparent;
      }
      &.Mui-disabled {
        color: ${colors?.gray[300]};
      }
      &.Mui-checked {
        color: ${colors?.primary[400]};
        &:hover {
          color: ${colors?.primary[500]};
          background-color: transparent;
        }
        &.Mui-disabled {
          color: ${colors?.primary[300]}
        }
      }
    `;
  }}
`;
