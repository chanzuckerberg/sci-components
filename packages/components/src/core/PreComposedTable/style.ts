import styled from "@emotion/styled";
import { CommonThemeProps, getSemanticColors, getSpaces } from "../styles";
import InputSearch from "../InputSearch";

export const StyledTableContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const StyledTableWrapper = styled.div`
  ${(props: { border?: boolean } & CommonThemeProps) => {
    const { border = true } = props;
    const semanticColors = getSemanticColors(props);

    return `
      width: 100%;
      overflow-x: auto;
      border: 1px solid ${border ? semanticColors?.base?.borderSecondary : "transparent"};
      border-bottom: none;

      table {
        width: 100%;
        min-width: max-content;
      }
    `;
  }}
`;

export const StyledPinnedHeader = styled("th")`
  ${(props: { selected?: boolean; hover?: boolean } & CommonThemeProps) => {
    const { selected, hover } = props;

    const semanticColors = getSemanticColors(props);

    return `
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        background-color: ${selected ? semanticColors?.accent?.surfaceSecondary : semanticColors?.base?.backgroundPrimary};
      }

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: ${hover ? semanticColors?.base?.fillHover : "transparent"};
      }
    `;
  }}
`;

export const StyledInputSearch = styled(InputSearch)`
  margin-right: 0;
`;

export const StyledPaginationWrapper = styled.div`
  ${(props: { placement?: "left" | "center" | "right" } & CommonThemeProps) => {
    const { placement = "right" } = props;
    const spaces = getSpaces(props);

    return `
      display: flex;
      justify-content: ${placement};
      margin-top: ${spaces?.m}px;
    `;
  }}
`;
