import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCodeXs,
  getColors,
  getFontWeights,
} from "src/core/styles";

interface IStyledVariableProps extends CommonThemeProps {
  type?: "css" | "sass" | "none";
  color?: string;
}

export const StyledVariable = styled("p")`
  ${fontCodeXs}

  ${(props: IStyledVariableProps) => {
    const { type = "none", color } = props;

    const colors = getColors(props);
    const fontWeights = getFontWeights(props);

    const textColor =
      type === "none"
        ? "black"
        : type === "css"
          ? colors?.yellow?.[500]
          : colors?.red?.[400];

    return `
      cursor: pointer;
      position: relative;
      padding-left: ${type === "none" ? 0 : type === "css" ? 32 : 40}px;

      &:active {
        font-weight: ${fontWeights?.semibold};

        &::before {
          font-weight: normal;
          background-color: ${type === "none" ? "transparent" : colors?.gray?.[200]};
          color: black;
        }
      }

      &::before {
        content: "${type === "none" ? "" : type}";
        color: ${color || textColor};
        position: absolute;
        padding: 0 5px;
        border-radius: 4px;
        left: 0;
        top: 0;
        font-size: 10px;
      }
    `;
  }}
`;
