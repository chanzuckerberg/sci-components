import { Radio as RawRadio } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getColors, getIconSizes } from "../styles";

export const StyledRadioButton = styled(RawRadio)`
  ${(props) => {
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);
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

      .MuiSvgIcon-root {
        height: ${iconSizes?.input.height}px;
        width: ${iconSizes?.input.width}px;
      }
    `;
  }}
`;
