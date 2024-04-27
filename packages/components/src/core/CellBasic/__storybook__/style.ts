import { styled } from "@mui/material";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  fontBodyXxxs,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export const ButtonIconsGroupRight = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      align-items: center;
      display: inline-flex;
      gap: ${spaces?.xxxs}px;
      height: 100%;
      border-left: solid 1px ${semanticComponentColors?.base?.divider};
      padding-left: ${spaces?.xs}px;
    `;
  }}
`;

export const ButtonIconsGroupBottom = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      display: inline-flex;
      gap: ${spaces?.xs}px;
    `;
  }}
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
    const semanticComponentColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      height: 100%;
      min-width: 100px;
      box-shadow: inset 0 0 0 1px ${semanticComponentColors?.base?.divider};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${spaces?.l}px;
      box-sizing: border-box;
      border-radius: 4px;
      color: ${semanticTextColors?.base?.disabled};
      user-select: none;
    `;
  }}
`;

export const EmptySlotBottom = styled("div")`
  ${fontBodyXxxs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      min-height: 20px;
      width: 100%;
      box-shadow: inset 0 0 0 1px ${semanticComponentColors?.base?.divider};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 ${spaces?.l}px;
      box-sizing: border-box;
      border-radius: 4px;
      color: ${semanticTextColors?.base?.disabled};
      user-select: none;
    `;
  }}
`;
