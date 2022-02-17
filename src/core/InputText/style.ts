import styled from "@emotion/styled";
import { TextField } from "@material-ui/core";
import { getBorders, getCorners, getSpaces } from "../styles";

const sdsPropNames = ["sdsStyle", "sdsType", "intent"];

export const StyledInputBase = styled(TextField, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props) => {
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);

    return `
    margin-bottom: ${spacings?.l}px;
    margin-right: ${spacings?.m}px;
    min-width: 160px;

      .MuiOutlinedInput-inputMarginDense {
        padding: ${spacings?.xs}px ${spacings?.l}px;
        height: 34px;
        box-sizing: border-box;
        background-color: #fff;

        .MuiOutlinedInput-notchedOutline {
          border-radius: ${corners?.m}px;
          border: ${borders?.gray[400]};
        }
      }
    
      .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border: ${borders?.gray[500]};
      }
      `;
  }}
`;

// export const InputBase = styled(TextField, {
//   shouldForwardProp: (prop) => {
//     return !sdsPropNames.includes(prop.toString());
//   },
// })`

//   ${fontBodyXs};
//   ${(props) => {
//     const spacings = getSpaces(props);
//     const borders = getBorders(props);
//     const corners = getCorners(props);

//     return`
//     .MuiInputBase-root {
//       height: 34px;
//       margin-right: ${spacings?.m}px;
//       margin-bottom: ${spacings?.l}px;
//       background-color: #fff;
//       border-radius: ${corners?.m}px;
//       min-width: 160px;
//       cursor: pointer;

//       .MuiInputBase-input {
//         padding: ${spacings?.xs}px ${spacings?.l}px;
//       }

//       .MuiOutlinedInput-notchedOutline {
//         border: ${borders?.gray[400]};
//       }

//       &:hover {
//         .MuiOutlinedInput-notchedOutline {
//           border: ${borders?.gray[500]};
//         }
//       }

//       &.Mui-focused {
//         .MuiOutlinedInput-notchedOutline {
//           border: ${borders?.primary[400]};
//         }
//       }

//       &.Mui-disabled {
//         .MuiOutlinedInput-notchedOutline {
//           border: ${borders?.gray[300]};
//         }
//       }
//     }
//     `;
//   }};
