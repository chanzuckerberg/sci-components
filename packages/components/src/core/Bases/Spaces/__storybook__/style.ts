import { styled } from "@mui/material";
import {
  getColors,
  CommonThemeProps,
  fontCodeXs,
  getFontWeights,
} from "src/core/styles";

export const StyledSpacingWrapper = styled("div")`
  max-width: 100%;
`;

interface IProps extends CommonThemeProps {
  size: number;
}

export const StyledInsetSpacingBox = styled("div")`
  ${fontCodeXs}

  ${(props: IProps) => {
    const { size } = props;

    const colors = getColors(props);
    const BoxSize = 100;

    return `
      position: relative;
      box-sizing: border-box;
      width: ${BoxSize}px;
      height: ${BoxSize}px;
      border: solid ${size}px rgb(205, 225, 195);
      color: ${colors?.green[600]};
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }}
`;

export const StyledInlineSpacingBox = styled("div")`
  ${fontCodeXs}

  ${(props: IProps) => {
    const { size } = props;

    const colors = getColors(props);
    const BoxSize = 100;

    return `
      position: relative;
      margin-left: 30px;
      width: ${size}px;
      height: ${BoxSize}px;
      background-color: rgb(250, 230, 210);
      color: ${colors?.yellow[600]};
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }}
`;

export const StyledStackedSpacingBox = styled("div")`
  ${fontCodeXs}

  ${(props: IProps) => {
    const { size } = props;

    const colors = getColors(props);
    const BoxSize = 120;

    return `
      position: relative;
      height: ${size}px;
      width: ${BoxSize}px;
      background-color: rgb(250, 230, 210);
      color: ${colors?.yellow[600]};
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }}
`;

export const StyledSpacingVariable = styled("p")`
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
