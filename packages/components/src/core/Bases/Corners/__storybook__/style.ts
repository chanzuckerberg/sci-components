import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCodeXs,
  getFontWeights,
  getMode,
  getSemanticColors,
} from "src/core/styles";

export const StyledCornersWrapper = styled("div")`
  max-width: 100%;
`;

interface IStyledCornerBoxProps extends CommonThemeProps {
  size: number;
}

export const StyledCornerBox = styled("div")`
  ${(props: IStyledCornerBoxProps) => {
    const { size } = props;

    const mode = getMode(props);
    const semanticColors = getSemanticColors(props);
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
        linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top
        linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right
        none // bottom
      ;

      &::after {
        content: "";
        position: absolute;
        background-color: ${mode === "dark" ? semanticColors?.base.surfacePrimary : semanticColors?.base.surfaceSecondary};
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
            linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top
            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right
            none // bottom
          ;
        }
        12.5% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%, transparent 100%), // right
            none // bottom
          ;
        }
        25% {
          background-image:
            none, // left
            none, // top
            linear-gradient(180deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // right
            linear-gradient(270deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%) // bottom
          ;
        }
        37.5% {
          background-image:
            none, // left
            none, // top
            none, // right
            linear-gradient(270deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%, transparent 100%) // bottom
          ;
        }
        50% {
          background-image:
            linear-gradient(0deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // left
            none, // top
            none, // right
            linear-gradient(270deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%) // bottom
          ;
        }
        62.5% {
          background-image:
            linear-gradient(0deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%), // left
            none, // top
            none, // right
            none // bottom
          ;
        }
        75% {
          background-image:
            linear-gradient(0deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // left
            linear-gradient(90deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // top
            none, // right
            none // bottom
          ;
        }
        87.5% {
          background-image:
          none, // left
          linear-gradient(90deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 100%), // top
          none, // right
          none // bottom
        ;
        }
        100% {
          background-image:
            none, // left
            linear-gradient(90deg, transparent, transparent 50%, ${semanticColors?.accent.border} 50%), // top
            linear-gradient(180deg, ${semanticColors?.accent.border}, ${semanticColors?.accent.border} 50%, transparent 50%), // right
            none // bottom
          ;
        }
      }
    `;
  }}
`;

export const StyledCornerVariable = styled("p")`
  ${fontCodeXs}

  ${(props) => {
    const fontWeights = getFontWeights(props);

    return `
      margin: 0;
      cursor: pointer;

      &:active {
        font-weight: ${fontWeights?.semibold};
      }
    `;
  }}
`;
