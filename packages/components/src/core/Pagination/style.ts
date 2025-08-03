import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyS,
  fontTabularS,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface PaginationExtraProps extends CommonThemeProps {
  sdsStyle?: "round" | "square";
  disabled?: boolean;
  selected?: boolean;
  truncateDropdown?: boolean;
}

const doNotForwardProps = [
  "sdsStyle",
  "selected",
  "onPageChange",
  "onNextPage",
  "onPreviousPage",
  "goToPage",
  "totalCount",
  "siblingCount",
  "currentPage",
  "pageSize",
  "truncateDropdown",
];

export const StyledPaginationButton = styled(Button)`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      width: 28px;
      height: 28px;
      cursor: "pointer";

      & .MuiSvgIcon-root {
        width: 12px;
        color: ${semanticColors?.base?.ornamentSecondary};
      }

      &:hover {
        & .MuiSvgIcon-root {
          color: ${semanticColors?.base?.ornamentSecondaryHover}
        }
      }
    `;
  }}
`;

export const StyledPaginationChevronList = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: PaginationExtraProps) => {
    const { disabled, sdsStyle } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      width: 28px;
      height: 28px;
      cursor: ${disabled ? "auto" : "pointer"};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${sdsStyle === "round" ? corners?.rounded : corners?.m}px;

      &[data-order="first"] {
        margin-right: ${spaces?.m}px;
      }

      &[data-order="last"] {
        margin-left: ${spaces?.m}px;
      }

      & .MuiSvgIcon-root {
        color: ${disabled ? semanticColors?.base?.ornamentDisabled : semanticColors?.base?.ornamentSecondary};
      }

      &:hover {
        background-color: ${disabled ? "transparent" : semanticColors?.base?.fillHover};

        & .MuiSvgIcon-root {
          color: ${disabled ? semanticColors?.base?.ornamentDisabled : semanticColors?.base?.ornamentSecondaryHover}
        }
      }

      ${focusVisibleA11yStyle(props)}
    `;
  }}
`;

export const StyledPagination = styled("ul", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  & li {
    list-style: none;
  }
`;

const selectedPageStyle = (props: PaginationExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    background-color: ${semanticColors?.base?.fillOpen};
    color: ${semanticColors?.base?.textPrimary};
    font-weight: 500;
    box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderSecondary};

    &:hover {
      box-shadow: inset 0 0 0 1px ${semanticColors?.base?.borderSecondary};
    }
  `;
};

export const Page = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontTabularS}

  ${(props: PaginationExtraProps) => {
    const { selected, sdsStyle } = props;
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      cursor: pointer;
      list-style: none;
      padding: 0 ${spaces?.s}px;
      min-width: 28px;
      height: 28px;
      margin-right: ${spaces?.s}px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${sdsStyle === "round" ? corners?.rounded : corners?.l}px;
      user-select: none;
      &:hover {
        background-color: ${semanticColors?.base?.fillHover};
        color: ${semanticColors?.base?.textPrimary};
      }

      &:nth-last-of-type(-n+2) {
        margin-right: 0;
      }

      ${selected && selectedPageStyle(props)};
      ${focusVisibleA11yStyle(props)}
    `;
  }}
`;

export const StyledPage = styled(Page)`
  width: 28px;
  max-width: 28px;
`;
