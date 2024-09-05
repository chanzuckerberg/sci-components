import styled from "@emotion/styled";
import {
  fontBodyXxs,
  fontHeaderS,
  getSemanticColors,
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
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      display: block;
      color: ${semanticColors?.base?.textSecondary};
      padding: ${spaces?.s}px 0;
    `;
  }}
`;
