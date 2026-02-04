import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "../styles";
import InputSearch from "../InputSearch";
import { css } from "@emotion/react";
import InputCheckbox from "../InputCheckbox";
import CellComponent from "../CellComponent";

export const StyledTableContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const stripedStyle = (props: CommonThemeProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    tr {
      border: none !important;
      box-shadow: none !important;
      &:after {
        display: none !important;
      }
    }

    tr:nth-of-type(odd) {
      background-color: ${semanticColors?.base?.backgroundSecondary};

      td, th {
        background-color: ${semanticColors?.base?.backgroundSecondary};

        &::before {
          background-color: ${semanticColors?.base?.backgroundSecondary};
        }
      }

      &:hover {
        td, th {
          position: relative;
          background-color: ${semanticColors?.base?.backgroundPrimary};

          &:before {
            background-color: ${semanticColors?.base?.fillPrimaryInteraction};
          }
        }
      }
    }

    tr[aria-selected="true"]:nth-of-type(odd) {
      background-color: ${semanticColors?.accent?.surfaceSecondary};

      td, th {
        background-color: ${semanticColors?.accent?.surfaceSecondary};

        &::before {
          background-color: ${semanticColors?.accent?.surfaceSecondary};
        }
      }

      &:hover {
        td, th {
          position: relative;
          background-color: ${semanticColors?.accent?.surfaceSecondary};

          &:before {
            background-color: ${semanticColors?.base?.fillPrimaryInteraction};
          }
        }
      }
    }
  `;
};

export const StyledInputCheckbox = styled(InputCheckbox)`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      background-color: ${semanticColors?.base?.backgroundPrimary} !important;
      border-radius: ${corners?.s}px !important;
    `;
  }}
`;

export const StyledTableWrapper = styled.div`
  ${(
    props: {
      border?: boolean;
      sdsStyle?: "lined" | "striped";
    } & CommonThemeProps
  ) => {
    const { border = true, sdsStyle = "lined" } = props;
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return css`
      width: 100%;
      overflow-x: auto;
      border: 1px solid
        ${border ? semanticColors?.base?.borderSecondary : "transparent"};
      border-radius: ${border ? corners?.xl : 0}px;

      tbody {
        width: 100%;
        min-width: max-content;

        ${sdsStyle === "striped" && stripedStyle(props)}

        tr:last-child {
          border-bottom: none;
          &:after {
            display: none !important;
          }
        }
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
        background-color: ${hover ? semanticColors?.base?.fillPrimaryInteraction : "transparent"};
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

export const StyledSelectionCell = styled(CellComponent)`
  line-height: 22px !important;
`;
