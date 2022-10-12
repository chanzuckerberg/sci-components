import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  CommonThemeProps,
  fontBodyS,
  getColors,
  getCorners,
  getFontWeights,
  getSpaces,
  getTypography,
} from "../styles";

export interface PaginationExtraProps extends CommonThemeProps {
  sdsStyle?: "round" | "square";
  disabled?: boolean;
  selected?: boolean;
  truncateDropdown?: boolean;
}

const doNotForwardProps = [
  "sdsStyle",
  "disabled",
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
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      width: 32px;
      height: 32px;
      margin-right: ${disabled ? spaces?.l : 0}px;
      cursor: ${disabled ? "auto" : "pointer"};
      &:hover {
        background-color: ${disabled ? "transparent" : colors?.gray[200]};
      }
      & .MuiSvgIcon-root {
        width: 10px;
        color: ${colors?.gray[600]}
      }
    `;
  }}
`;

export const StyledPaginationChevronButton = styled(ButtonIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: PaginationExtraProps) => {
    const { disabled } = props;
    const colors = getColors(props);
    const spaces = getSpaces(props);

    return `
      &:first-of-type {
        margin-right: ${spaces?.xl}px;
      }
      &:last-of-type {
        margin-left: ${spaces?.xl}px;
      }
      cursor: ${disabled ? "auto" : "pointer"};
      &:hover {
        background-color: transparent;
      }
      & .MuiSvgIcon-root {
        color: ${disabled ? colors?.gray[300] : "black"};
      }
    `;
  }}
`;

export const StyledPagination = styled("ul", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}

  ${(props: PaginationExtraProps) => {
    const typography = getTypography(props);

    return `
      font-family: ${typography?.fontFamily};
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      & li {
        list-style: none;
      }
    `;
  }}
`;

const selectedPageStyle = () => {
  return `
    background-color: black;
    color: white;

    &:hover {
      background-color: black;
    }
  `;
};

export const Page = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}

  ${(props: PaginationExtraProps) => {
    const { selected, sdsStyle } = props;
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const colors = getColors(props);
    const fontWeights = getFontWeights(props);

    return `
      font-weight: ${fontWeights?.semibold};
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
        background-color: ${colors?.gray[200]};
      }

      &:last-of-type {
        margin-right: 0;
      }

      ${selected && selectedPageStyle()};
    `;
  }}
`;
