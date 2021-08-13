import styled from "@emotion/styled";
import { Checkbox as RawCheckbox } from "@material-ui/core";
import { getColors } from "../styles/common/selectors/theme";

export const StyledCheckbox = styled(RawCheckbox)`
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
