import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontCodeXs,
  getFontWeights,
  getSemanticColors,
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

    const semanticColors = getSemanticColors(props);
    const BoxSize = 100;

    return `
      position: relative;
      box-sizing: border-box;
      width: ${BoxSize}px;
      height: ${BoxSize}px;
      border: solid ${size}px ${semanticColors?.positive.surfacePrimary};
      color: ${semanticColors?.positive?.text};
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

    const semanticColors = getSemanticColors(props);
    const BoxSize = 100;

    return `
      position: relative;
      margin-left: 30px;
      width: ${size}px;
      height: ${BoxSize}px;
      background-color: ${semanticColors?.notice.surfacePrimary};
      color: ${semanticColors?.notice?.text};
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

    const semanticColors = getSemanticColors(props);
    const BoxSize = 120;

    return `
      position: relative;
      height: ${size}px;
      width: ${BoxSize}px;
      background-color: ${semanticColors?.notice.surfacePrimary};
      color: ${semanticColors?.notice?.text};
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
