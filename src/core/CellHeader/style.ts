import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  CommonThemeProps,
  fontHeaderS,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

export interface CellHeaderExtraProps extends CommonThemeProps {
  active?: boolean;
  horizontalAlign?: "left" | "center" | "right";
}

const doNotForwardProps = [
  "active",
  "horizontalAlign",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipText",
  "hideSortIcon",
];

export const StyledSortingIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellHeaderExtraProps) => {
    const { active = false } = props;

    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      padding-left: ${spacings?.s}px;
      margin-top: -2px;
      color: ${active ? colors?.primary[400] : colors?.gray[400]};
      opacity: ${active ? 1 : 0};
    `;
  }}
`;

export const StyledTableHeader = styled("th", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}

  ${(props: CellHeaderExtraProps) => {
    const { active = false, horizontalAlign = "left" } = props;

    const spacings = getSpaces(props);
    const typography = getTypography(props);
    const colors = getColors(props);

    return `
      color: ${active ? colors?.primary[400] : colors?.gray[600]};
      font-family: ${typography?.fontFamily};
      padding: ${spacings?.l}px ${spacings?.s}px;
      text-align: ${horizontalAlign};
      min-width: 96px;
      width: 96px;
      cursor: pointer;

      &:hover {
        color: ${active ? colors?.primary[500] : "black"};

        & .MuiButtonBase-root {
          color: ${active ? colors?.primary[500] : colors?.gray[500]};
          opacity: 1;
        }
      }
    `;
  }}
`;
