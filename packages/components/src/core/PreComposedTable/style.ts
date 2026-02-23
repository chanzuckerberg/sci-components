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
        background-color: ${semanticColors?.base?.backgroundPrimary};

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

      td,
      th {
        --pinned-gradient-base: transparent;
        --pinned-gradient-bg: ${semanticColors?.base?.backgroundPrimary};
        --pinned-gradient-overlay: transparent;
      }

      tbody tr:hover td,
      tbody tr:hover th {
        --pinned-gradient-overlay: ${semanticColors?.base
          ?.fillPrimaryInteraction};
      }

      tbody tr[aria-selected="true"] td,
      tbody tr[aria-selected="true"] th {
        --pinned-gradient-bg: ${semanticColors?.accent?.surfaceSecondary};
      }

      ${sdsStyle === "striped" &&
      `
        tbody tr:nth-of-type(odd) td,
        tbody tr:nth-of-type(odd) th {
          --pinned-gradient-base: ${semanticColors?.base?.backgroundPrimary};
          --pinned-gradient-bg: ${semanticColors?.base?.backgroundSecondary};
        }

        tbody tr:nth-of-type(odd):hover td,
        tbody tr:nth-of-type(odd):hover th {
          --pinned-gradient-base: transparent;
          --pinned-gradient-bg: ${semanticColors?.base?.backgroundPrimary};
        }

        tbody tr[aria-selected="true"]:nth-of-type(odd) td,
        tbody tr[aria-selected="true"]:nth-of-type(odd) th {
          --pinned-gradient-base: transparent;
          --pinned-gradient-bg: ${semanticColors?.accent?.surfaceSecondary};
        }

        tbody tr[aria-selected="true"]:nth-of-type(odd):hover td,
        tbody tr[aria-selected="true"]:nth-of-type(odd):hover th {
          --pinned-gradient-base: transparent;
          --pinned-gradient-bg: ${semanticColors?.accent?.surfaceSecondary};
        }
      `}

      [data-pinned-edge]::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 24px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      [data-pinned-edge="left"]::after {
        right: 0;
        transform: translateX(100%);
        background:
          linear-gradient(
            var(--pinned-gradient-overlay),
            var(--pinned-gradient-overlay)
          ),
          linear-gradient(var(--pinned-gradient-bg), var(--pinned-gradient-bg)),
          linear-gradient(
            var(--pinned-gradient-base),
            var(--pinned-gradient-base)
          );
        -webkit-mask-image: linear-gradient(to right, black, transparent);
        mask-image: linear-gradient(to right, black, transparent);
      }

      [data-pinned-edge="right"]::after {
        left: 0;
        transform: translateX(-100%);
        background:
          linear-gradient(
            var(--pinned-gradient-overlay),
            var(--pinned-gradient-overlay)
          ),
          linear-gradient(var(--pinned-gradient-bg), var(--pinned-gradient-bg)),
          linear-gradient(
            var(--pinned-gradient-base),
            var(--pinned-gradient-base)
          );
        -webkit-mask-image: linear-gradient(to left, black, transparent);
        mask-image: linear-gradient(to left, black, transparent);
      }

      &[data-scrolled-left="true"] [data-pinned-edge="left"]::after {
        opacity: 1;
      }

      &[data-scrolled-right="true"] [data-pinned-edge="right"]::after {
        opacity: 1;
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

export const StyledFilterRow = styled("tr")`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.backgroundPrimary};
      border: none;
      box-shadow: none;

      td, th {
        background-color: ${semanticColors?.base?.backgroundPrimary};
      }

      &:after {
        display: none !important;
      }

      &:hover {
        background-color: ${semanticColors?.base?.backgroundPrimary};
      }
    `;
  }}
`;

export const StyledFilterCell = styled("th")`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);

    return `
      padding: 0 ${spaces?.s}px ${spaces?.s}px;
      vertical-align: middle;
      width: 100%;
    `;
  }}
`;
