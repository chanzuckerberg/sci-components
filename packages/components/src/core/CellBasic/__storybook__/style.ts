import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  fontBodyXxxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import CellBasic from "..";

export const ButtonIconsGroupRight = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      align-items: center;
      display: inline-flex;
      height: 100%;
      border-left: solid 1px ${semanticColors?.base?.divider};
      padding-left: ${spaces?.xs}px;
    `;
  }}
`;

export const ButtonIconsGroupBottom = styled("div")`
  display: inline-flex;
`;

export const StyledButton = styled(Button)`
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const EmptySlotRight = styled("div")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      height: 100%;
      min-width: 100px;
      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.divider};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${spaces?.l}px;
      box-sizing: border-box;
      border-radius: 4px;
      color: ${semanticColors?.base?.textDisabled};
      user-select: none;
    `;
  }}
`;

export const EmptySlotBottom = styled("div")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      min-height: 20px;
      width: 100%;
      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.divider};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${spaces?.l}px;
      box-sizing: border-box;
      border-radius: 4px;
      color: ${semanticColors?.base?.textDisabled};
      user-select: none;
    `;
  }}
`;

export const StyledCellBasic = styled(CellBasic)`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: dashed 1px ${semanticColors?.base?.divider};
      height: 70px;
      max-width: 300px;
      width: 300px;
    `;
  }}
`;
