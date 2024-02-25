import { styled } from "@mui/material";
import { getColors, CommonThemeProps, fontCodeXs } from "src/core/styles";

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
    const BoxSize = 60;

    return `
      position: relative;
      margin-left: 10px;
      width: ${BoxSize}px;
      height: ${BoxSize}px;
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
  margin: 0;
  cursor: pointer;

  &:active {
    font-weight: bold;
  }
`;
