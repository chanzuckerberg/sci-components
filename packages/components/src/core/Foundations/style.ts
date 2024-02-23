import { styled } from "@mui/material";
import {
  fontCodeXs,
  fontTabularXs,
  getCorners,
  getSemanticComponentColors,
  getSpaces,
} from "../styles";

export const StyledDiv = styled("div")`
  ${fontCodeXs}

  ${(props) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      display: flex;
      justify-content: space-between;
      background-color: ${semanticComponentColors?.notice?.fill};
      color: ${semanticComponentColors?.notice?.fillOnFill};
      padding: ${spaces?.s}px;
      border-radius: ${corners?.m}px;

      &:hover {
        background-color: ${semanticComponentColors?.notice?.fillHover};
      }

      &:active {
        background-color: ${semanticComponentColors?.notice?.fillPressed};
      }
    `;
  }}
`;

export const StyledSpan = styled("span")`
  ${fontTabularXs}
`;
