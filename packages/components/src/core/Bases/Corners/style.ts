import { styled } from "@mui/material";
import { getColors, CommonThemeProps, fontCodeXs } from "src/core/styles";

export const StyledCornersWrapper = styled("div")`
  max-width: 100%;
`;

interface IStyledCornerBoxProps extends CommonThemeProps {
  size: number;
}

export const StyledCornerBox = styled("div")`
  ${(props: IStyledCornerBoxProps) => {
    const { size } = props;

    const colors = getColors(props);
    const BorderWidth = 2;
    const BoxSize = 60;

    return `
      position: relative;
      margin-left: 10px;
      width: ${BoxSize}px;
      height: ${BoxSize}px;
      background-color: transparent;
      border-radius: ${size + BorderWidth}px;

      background-position:  0 0, 0 0, 100% 0, 0 100%;
      background-size: 10px 100%, 100% 10px, 10px 100% , 100% 10px;
      background-repeat: no-repeat;
      background-image:
        none, // left
        linear-gradient(90deg, transparent, transparent 50%, ${colors?.blue[400]} 50%), // top
        linear-gradient(180deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%), // right
        none // bottom
      ;

      &::after {
        content: "";
        position: absolute;
        background-color: ${colors?.gray[200]};
        width: ${BoxSize - 2 * BorderWidth}px;
        height: ${BoxSize - 2 * BorderWidth}px;
        top: ${BorderWidth}px;
        left: ${BorderWidth}px;
        border-radius: ${size}px;
      }

      &:hover {
        animation: boxBorderAnimation 2s infinite linear;
      }

      @keyframes boxBorderAnimation {
        0% {
          background-image:
            none, // left
            linear-gradient(90deg, transparent, transparent 50%, ${colors?.blue[400]} 50%), // top
            linear-gradient(180deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%), // right
            none // bottom
          ;
        }
        12.5% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, ${colors?.blue[400]}, ${colors?.blue[400]} 100%, transparent 100%), // right
            none // bottom
          ;
        }
        25% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, transparent, transparent 50%, ${colors?.blue[400]} 50%), // right
            linear-gradient(270deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%) // bottom
          ;
        }
        37.5% {
          background-image:
            none, // left
            none, // top
            none, // right
            linear-gradient(270deg, ${colors?.blue[400]}, ${colors?.blue[400]} 100%, transparent 100%) // bottom
          ;
        }
        50% {
          background-image:
            linear-gradient(0deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%), // left
            none, // top
            none, // right
            linear-gradient(270deg, transparent, transparent 50%, ${colors?.blue[400]} 50%) // bottom
          ;
        }
        62.5% {
          background-image:
            linear-gradient(0deg, ${colors?.blue[400]}, ${colors?.blue[400]} 100%), // left
            none, // top
            none, // right
            none // bottom
          ;
        }
        75% {
          background-image:
            linear-gradient(0deg, transparent, transparent 50%, ${colors?.blue[400]} 50%), // left
            linear-gradient(90deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%), // top
            none, // right
            none // bottom
          ;
        }
        87.5% {
          background-image:
          none, // left
          linear-gradient(90deg, ${colors?.blue[400]}, ${colors?.blue[400]} 100%), // top
          none, // right
          none // bottom
        ;
        }
        100% {
          background-image:
            none, // left
            linear-gradient(90deg, transparent, transparent 50%, ${colors?.blue[400]} 50%), // top
            linear-gradient(180deg, ${colors?.blue[400]}, ${colors?.blue[400]} 50%, transparent 50%), // right
            none // bottom
          ;
        }
      }
    `;
  }}
`;

export const StyledCornerVariable = styled("p")`
  ${fontCodeXs}
  margin: 0;
  cursor: pointer;

  &:active {
    font-weight: bold;
  }
`;
