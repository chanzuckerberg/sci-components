import { styled } from "@mui/material";
import { CommonThemeProps, fontCodeXs, getCorners } from "src/core/styles";

export const StyledBordersWrapper = styled("div")`
  max-width: 100%;
`;

interface IStyledCornerBoxProps extends CommonThemeProps {
  border: string;
}

export const StyledBorderBox = styled("div")`
  ${(props: IStyledCornerBoxProps) => {
    const { border } = props;

    const corners = getCorners(props);

    const BorderWidth = 1;
    const BoxSize = 60;

    return `
      position: relative;
      margin-left: 10px;
      width: ${BoxSize}px;
      height: ${BoxSize}px;
      background-color: transparent;
      border-radius: ${BorderWidth}px;
      border: ${border};
      border-radius: ${corners?.l}px;

      &:hover {
        animation: pulse 3s infinite;
      }

      @keyframes pulse {
        50% {
          border-radius: 0;
        }
      }
    `;
  }}
`;

export const StyledBorderVariable = styled("p")`
  ${fontCodeXs}
  margin: 0;
  cursor: pointer;

  &:active {
    font-weight: bold;
  }
`;
