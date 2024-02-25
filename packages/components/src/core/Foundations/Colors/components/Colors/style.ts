import { styled } from "@mui/material";
import {
  CommonThemeProps,
  fontBodyXs,
  fontCodeXs,
  fontHeaderL,
  getCorners,
  getSpaces,
} from "../../../../styles";

interface IStyledDivProps extends CommonThemeProps {
  backgroundColor: string;
  textColor: string;
}

export const StyledColorWrapper = styled("div")`
  ${fontBodyXs}

  ${(props: IStyledDivProps) => {
    const { backgroundColor, textColor } = props;

    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return `
      background-color: ${backgroundColor};
      color: ${textColor};
      padding: ${spaces?.xs}px ${spaces?.s}px;
      margin: ${spaces?.xxxs}px 0;
      border-radius: ${corners?.m}px;
      border: solid 1px ${backgroundColor};
      transition: transform 0.2s ease-in-out;
      cursor: pointer;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        border: solid 1px black;
        z-index: 10;
      }
    `;
  }}
`;

export const StyledColorGroupTitle = styled("h3")`
  ${fontHeaderL}

  ${(props) => {
    const spaces = getSpaces(props);
    return `
      margin-bottom: ${spaces?.s}px;
    `;
  }}
`;

export const StyledColorCode = styled("span")`
  ${fontCodeXs}
`;

export const StyledColorVariable = styled("span")`
  ${fontCodeXs}
  font-size: 10px;
`;

interface IStyledColorsWrapperProps extends CommonThemeProps {
  type: "primitive" | "semantic";
}

export const StyledColorsWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  ${(props: IStyledColorsWrapperProps) => {
    const { type } = props;

    return `
      ${
        type === "primitive" &&
        `
          & > div:nth-of-type(1) {
            grid-area: 1 / 1 / 2 / 3;
          }
        `
      }
    `;
  }}
`;
