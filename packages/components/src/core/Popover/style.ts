import { Popover, popoverClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getBorders,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";
import { addOpacityToHex } from "../styles/common/utils/opacity";

export const StyledPopover = styled(Popover)`
  & .${popoverClasses.paper} {
    ${(props: CommonThemeProps) => {
      const corners = getCorners(props);
      const shadows = getShadows(props);
      const semanticColors = getSemanticColors(props);
      const borders = getBorders(props);
      const spaces = getSpaces(props);

      return `
        background-color: ${semanticColors?.base?.surfacePrimary};
        background-image: none;
        border-radius: ${corners?.l}px;
        padding: ${spaces?.xs}px ${spaces?.m}px;
        border: ${borders?.none};
        outline: 1px solid ${addOpacityToHex(semanticColors?.base?.borderSecondary || "#000000", 15)};
        box-shadow: ${shadows?.m};
        box-sizing: border-box;
        z-index: 1400;
      `;
    }}
  }
`;
