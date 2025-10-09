/* eslint-disable sort-keys */
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getSemanticColors,
  fontCodeXs,
  getBorders,
  getSpaces,
  fontBody,
  fontHeader,
  fontCode,
  fontCaps,
  fontTabular,
  fontTitle,
  fontLink,
} from "src/core/styles";

interface StyledSampleTextProps extends CommonThemeProps {
  mixinName: string;
  category: string;
  weight: string;
  size: string;
  isNarrow?: boolean;
}

export const StyledSampleText = styled.div<StyledSampleTextProps>`
  ${(props) => {
    const { category, weight, size, isNarrow } = props;
    const semanticColors = getSemanticColors(props);

    const getMixinFunction = () => {
      switch (category) {
        case "body":
          return fontBody;
        case "header":
          return fontHeader;
        case "code":
          return fontCode;
        case "caps":
          return fontCaps;
        case "tabular":
          return fontTabular;
        case "title":
          return fontTitle;
        case "link":
          return fontLink;
        default:
          return fontBody;
      }
    };

    const mixinFun = getMixinFunction();

    return [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mixinFun as any)(size, weight, isNarrow),
      `
        color: ${semanticColors?.base?.textPrimary};
        word-break: break-word;
        white-space: pre-line;
        ${category === "tabular" ? "text-align: right;" : ""}
      `,
    ];
  }}
`;

export const StyledCssProperties = styled.div`
  ${(props: CommonThemeProps) => fontCodeXs(props)}
  cursor: pointer;
  white-space: pre-line;

  &:active {
    font-weight: 600;
  }
`;

export const StyledTableWrapper = styled.div`
  ${(props: CommonThemeProps) => {
    const borders = getBorders(props);
    const spaces = getSpaces(props);

    return `
      margin-bottom: ${spaces?.m}px;
      border: ${borders?.base?.table};
    `;
  }}
`;
