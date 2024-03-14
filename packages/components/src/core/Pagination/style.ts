import { styled } from "@mui/material/styles";
import ButtonIcon from "src/core/ButtonIcon";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodySemiboldS,
  getCorners,
  getSemanticComponentColors,
  getSemanticTextColors,
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

export const StyledPaginationButtonIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: PaginationExtraProps) => {
    const { disabled } = props;
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      width: 32px;
      height: 32px;
      cursor: ${disabled ? "auto" : "pointer"};

      & .MuiSvgIcon-root {
        width: 10px;
        color: ${semanticComponentColors?.base?.icon}
      }

      &:hover {
        background-color: ${disabled ? "transparent" : semanticComponentColors?.base?.fillHover};

        & .MuiSvgIcon-root {
          color: ${semanticComponentColors?.base?.iconHover}
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
    const semanticComponentColors = getSemanticComponentColors(props);

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
        color: ${disabled ? semanticComponentColors?.base?.iconDisabled : semanticComponentColors?.base?.icon};
      }

      &:hover {
        background-color: ${disabled ? "transparent" : semanticComponentColors?.base?.fillHover};

        & .MuiSvgIcon-root {
          color: ${disabled ? semanticComponentColors?.base?.iconDisabled : semanticComponentColors?.base?.iconHover}
        }
      }
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
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    background-color: ${semanticComponentColors?.base?.fillSelected};
    color: ${semanticTextColors?.base?.onFill};

    &:hover {
      background-color: ${semanticComponentColors?.base?.fillSelected};
      color: ${semanticTextColors?.base?.onFill};
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
    const semanticComponentColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.secondary};
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
        background-color: ${semanticComponentColors?.base?.fillHover};
        color: ${semanticTextColors?.base?.primary};
      }

      &:nth-last-of-type(-n+2) {
        margin-right: 0;
      }

      ${selected && selectedPageStyle(props)};
    `;
  }}
`;
