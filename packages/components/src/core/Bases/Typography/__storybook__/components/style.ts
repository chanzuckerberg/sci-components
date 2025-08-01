/* eslint-disable sort-keys */
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";
import {
  CommonThemeProps,
  getSemanticColors,
  fontCodeXs,
  getBorders,
  getSpaces,
  fontBodyL,
  fontBodyM,
  fontBodyS,
  fontBodyXs,
  fontBodyXxs,
  fontBodyXxxs,
  fontBodySemiboldL,
  fontBodySemiboldM,
  fontBodySemiboldS,
  fontBodySemiboldXs,
  fontBodySemiboldXxs,
  fontBodySemiboldXxxs,
  fontCapsXxs,
  fontCapsXxxs,
  fontCapsXxxxs,
  fontCodeS,
  fontCodeSemiboldS,
  fontCodeSemiboldXs,
  fontHeaderXxl,
  fontHeaderXl,
  fontHeaderL,
  fontHeaderM,
  fontHeaderS,
  fontHeaderXs,
  fontHeaderXxs,
  fontHeaderXxxs,
  fontTabularS,
  fontTabularSemiboldS,
  fontTabularSemiboldXs,
  fontTabularXs,
} from "src/core/styles";

interface StyledSampleTextProps extends CommonThemeProps {
  mixinName: string;
  category: string;
  weight: string;
  size: string;
}

const getMixinFunction = (mixinName: string) => {
  const mixinMap: Record<
    string,
    (props: CommonThemeProps) => SerializedStyles | null
  > = {
    // Body mixins
    fontBodyL,
    fontBodyM,
    fontBodyS,
    fontBodyXs,
    fontBodyXxs,
    fontBodyXxxs,
    fontBodySemiboldL,
    fontBodySemiboldM,
    fontBodySemiboldS,
    fontBodySemiboldXs,
    fontBodySemiboldXxs,
    fontBodySemiboldXxxs,
    // Caps mixins
    fontCapsXxs,
    fontCapsXxxs,
    fontCapsXxxxs,
    // Code mixins
    fontCodeS,
    fontCodeSemiboldS,
    fontCodeSemiboldXs,
    fontCodeXs,
    // Header mixins
    fontHeaderXxl,
    fontHeaderXl,
    fontHeaderL,
    fontHeaderM,
    fontHeaderS,
    fontHeaderXs,
    fontHeaderXxs,
    fontHeaderXxxs,
    // Tabular mixins
    fontTabularS,
    fontTabularSemiboldS,
    fontTabularSemiboldXs,
    fontTabularXs,
  };

  return mixinMap[mixinName] || (() => () => null);
};

export const StyledSampleText = styled.div<StyledSampleTextProps>`
  ${(props) => {
    const { mixinName, category } = props;
    const semanticColors = getSemanticColors(props);
    const mixinFunction = getMixinFunction(mixinName);

    return [
      mixinFunction(props),
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
