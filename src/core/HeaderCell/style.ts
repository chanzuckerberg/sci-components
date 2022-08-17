import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import {
  CommonThemeProps,
  fontHeaderS,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

export interface HeaderCellExtraProps extends CommonThemeProps {
  active?: boolean;
  textPosition?: "left" | "right";
}

const doNotForwardProps = [
  "active",
  "textPosition",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipText",
  "hideSortIcon",
];

export const StyledSortingIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: HeaderCellExtraProps) => {
    const { active = false, textPosition = "left" } = props;

    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      padding-left: ${spacings?.s}px;
      margin-left: ${textPosition === "left" ? "auto" : "unset"};
      
      color: ${active ? colors?.primary[400] : colors?.gray[400]};
    `;
  }}
`;

export const StyledTableHeader = styled("th", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}

  ${(props: HeaderCellExtraProps) => {
    const { active = false, textPosition = "left" } = props;

    const spacings = getSpaces(props);
    const typography = getTypography(props);
    const colors = getColors(props);

    return `
      box-sizing: border-box;
      color: ${active ? colors?.primary[400] : colors?.gray[600]};
      font-family: ${typography?.fontFamily};
      padding: ${spacings?.l}px ${spacings?.s}px;
      text-align: ${textPosition};
      min-height: 48px;
      min-width: 96px;
      display: flex;
      align-items: center;
      justify-content: ${textPosition === "left" ? "flex-start" : "flex-end"}; 
      cursor: pointer;

      &:hover {
        color: ${active ? colors?.primary[500] : "black"};

        & > .MuiButtonBase-root {
          color: ${active ? colors?.primary[500] : colors?.gray[500]};
        }
      }
    `;
  }}
`;
