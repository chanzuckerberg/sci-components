import styled from "@emotion/styled";
import {
  getColors,
  CommonThemeProps,
  fontCodeXs,
  getFontWeights,
} from "src/core/styles";

const SHADOW_BOX_BOX_SIZE_PX = 60;

export const StyledShadowsWrapper = styled("div")`
  max-width: 100%;
`;

interface IStyledCornerBoxProps extends CommonThemeProps {
  shadow: string;
}

export const StyledShadowBox = styled("div")`
  ${(props: IStyledCornerBoxProps) => {
    const { shadow } = props;

    const colors = getColors(props);

    return `
      position: relative;
      margin-left: 10px;
      width: ${SHADOW_BOX_BOX_SIZE_PX}px;
      height: ${SHADOW_BOX_BOX_SIZE_PX}px;
      background-color: ${colors?.gray[100]};
      border-radius: 6px;
      box-shadow: ${shadow};

      &:hover {
        animation: boxShadowAnimation 3s infinite;
      }

      @keyframes boxShadowAnimation {
        50% {
          box-shadow: ${shadow};
        }
      }
    `;
  }}
`;

export const StyledShadowVariable = styled("p")`
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
