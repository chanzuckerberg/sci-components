import styled from "@emotion/styled";
import Button from "src/core/Button";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyS,
  fontBodySemiboldS,
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
      width: 32px;
      height: 32px;
      cursor: "pointer";

      & .MuiSvgIcon-root {
        width: 10px;
        color: ${semanticColors?.base?.iconPrimary}
      }

      &:hover {
        background-color: ${semanticColors?.base?.fillHover};

        & .MuiSvgIcon-root {
          color: ${semanticColors?.base?.iconPrimaryHover}
        }
      }
    `;
  }}
`;

export const StyledPaginationChevronList = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: PaginationExtraProps) => {
    const { disabled } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      width: 32px;
      height: 32px;
      cursor: ${disabled ? "auto" : "pointer"};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 32px;

      &[data-order="first"] {
        margin-right: ${spaces?.l}px;
      }

      &[data-order="last"] {
        margin-left: ${spaces?.l}px;
      }

      & .MuiSvgIcon-root {
        color: ${disabled ? semanticColors?.base?.iconDisabled : semanticColors?.base?.iconPrimary};
      }

      &:hover {
        background-color: ${disabled ? "transparent" : semanticColors?.base?.fillHover};

        & .MuiSvgIcon-root {
          color: ${disabled ? semanticColors?.base?.iconDisabled : semanticColors?.base?.iconPrimaryHover}
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
    background-color: ${semanticColors?.base?.fillSelected};
    color: ${semanticColors?.base?.textPrimaryInverse};

    &:hover {
      background-color: ${semanticColors?.base?.fillSelected};
      color: ${semanticColors?.base?.textPrimaryInverse};
    }
  `;
};

export const Page = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodySemiboldS}

  ${(props: PaginationExtraProps) => {
    const { selected, sdsStyle } = props;
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      cursor: pointer;
      list-style: none;
      width: 32px;
      height: 32px;
      margin-right: ${spaces?.l}px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${sdsStyle === "round" ? corners?.l : corners?.m}px;
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
