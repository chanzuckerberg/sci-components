import { styled } from "@mui/material";
import {
  fontBodyXxs,
  fontHeaderS,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

const doNotForwardProps = ["horizontalAlign", "verticalAlign"];

export const StyledStoryHeading = styled("span")`
  ${fontHeaderS}

  line-height: 24px;
  display: block;
`;

export const StyledStoryBody = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}

  ${(props) => {
    const semanticTextColors = getSemanticTextColors(props);
    const spaces = getSpaces(props);

    return `
      display: block;
      color: ${semanticTextColors?.base?.secondary};
      padding: ${spaces?.s}px 0;
    `;
  }}
`;
