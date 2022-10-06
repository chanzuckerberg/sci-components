import { styled } from "@mui/material/styles";
import { CommonThemeProps, fontHeaderS, getColors } from "../styles";

export interface PaginationExtraProps extends CommonThemeProps {
  sdsType: string;
}

export interface PaginationPageProps extends CommonThemeProps {
  disabled?: boolean;
  selected?: boolean;
}

const doNotForwardProps = ["sdsType"];

export const StyledPagination = styled("ul", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}

  ${(props: PaginationExtraProps) => {
    const { sdsType } = props;

    const colors = getColors(props);

    return `
      border-bottom: solid 1px ${colors?.gray[300]};
      border-radius: ${sdsType === "square" ? "0" : "50px"};
    `;
  }}
`;

const disabledPageStyle = () => {
  return `
    background-color: #ddd;
  `;
};

const selectedPageStyle = () => {
  return `
    border: solid 1px #ddd;
  `;
};

export const Page = styled("li", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: PaginationPageProps) => {
    const { selected, disabled } = props;

    return `
      ${disabled && disabledPageStyle()}
      ${selected && selectedPageStyle()}
    `;
  }}
`;
