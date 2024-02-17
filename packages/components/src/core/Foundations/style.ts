import { styled } from "@mui/material";
import {
  fontCodeXs,
  fontTabularXs,
  getCorners,
  getPalette,
  getSpaces,
} from "../styles";

export const StyledDiv = styled("div")`
  ${fontCodeXs};

  ${(props) => {
    const palette = getPalette(props);
    const spaces = getSpaces(props);
    const corners = getCorners(props);

    return `
      display: flex;
      justify-content: space-between;
      background-color: ${palette?.component?.notice?.fill};
      color: ${palette?.component?.notice?.fillOnFill};
      padding: ${spaces?.s}px;
      border-radius: ${corners?.m}px;

      &:hover {
        background-color: ${palette?.component?.notice?.fillHover};
      }

      &:active {
        background-color: ${palette?.component?.notice?.fillPressed};
      }
    `;
  }};
`;

export const StyledSpan = styled("span")`
  ${fontTabularXs};
`;
