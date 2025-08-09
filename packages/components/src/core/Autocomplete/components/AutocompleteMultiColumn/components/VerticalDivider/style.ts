import { styled } from "@mui/material";
import {
  CommonThemeProps,
  getIconSizes,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export const StyledVerticalDivider = styled("div")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      position: relative;
      width: 1px;
      background-color: ${semanticColors?.base?.divider};
      margin: 0 ${spaces?.xs}px;
    `;
  }}
`;

export const StyledColumnIcon = styled("span")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surface};
      position: absolute;
      right: -${spaces?.xs}px;
      top: -${spaces?.xxxs}px;

      svg {
        color: ${semanticColors?.base?.ornamentDisabled};
        width: ${iconSizes?.xs.width}px;
        height: ${iconSizes?.xs.height}px;
      }
    `;
  }}
`;
