import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  CommonThemeProps,
  fontHeaderS,
  getColors,
  getPalette,
  getSpaces,
  getTypography,
} from "../styles";

export interface CellHeaderExtraProps extends CommonThemeProps {
  active?: boolean;
  horizontalAlign?: "left" | "center" | "right";
}

const contentPositionMapping = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

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
      margin-left: ${spacings?.s}px;
      margin-bottom: 2px;
      color: ${active ? colors?.primary[400] : colors?.gray[400]};
      opacity: ${active ? 1 : 0};
      outline: none !important;
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
    const palette = getPalette(props);

    return `
      color: ${active ? colors?.primary[400] : palette.text?.secondary};
      font-family: ${typography?.fontFamily};
      padding: ${spacings?.l}px ${spacings?.s}px;
      text-align: ${horizontalAlign};
      min-width: 96px;
      width: 96px;
      cursor: pointer;
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${active ? colors?.primary[500] : palette.text?.primary};

        & .MuiButtonBase-root {
          color: ${active ? colors?.primary[500] : palette.text?.secondary};
          opacity: 1;
        }
      }
    `;
  }}
`;

export const StyledCellHeaderContainer = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellHeaderExtraProps) => {
    const { horizontalAlign = "left" } = props;
    return `
      align-items: flex-end;
      width: 100%;
      display: flex;
      justify-content: ${
        horizontalAlign ? contentPositionMapping[horizontalAlign] : "flex-start"
      };
    `;
  }}
`;
