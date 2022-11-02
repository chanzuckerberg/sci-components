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
  textPosition?: "left" | "center" | "right";
}

const doNotForwardProps = [
  "active",
  "textPosition",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipText",
  "hideSortIcon",
];

const contentPositionMapping = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

export const StyledSortingIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellHeaderExtraProps) => {
    const { active = false, textPosition = "left" } = props;

    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      padding-left: ${spacings?.s}px;
      margin-left: ${textPosition === "left" ? "auto" : "unset"};
      
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
    const { active = false, textPosition = "left" } = props;

    const spacings = getSpaces(props);
    const typography = getTypography(props);
    const colors = getColors(props);
    const palette = getPalette(props);

    return `
      box-sizing: border-box;
      color: ${active ? colors?.primary[400] : palette.text?.secondary};
      font-family: ${typography?.fontFamily};
      padding: ${spacings?.l}px ${spacings?.s}px;
      min-height: 48px;
      min-width: 96px;
      width: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;

      & > div {
        width: 100%;
        display: flex;
        justify-content: ${
          textPosition ? contentPositionMapping[textPosition] : "flex-start"
        };
      }

      &:hover {
        color: ${active ? colors?.primary[500] : "black"};

        & > .MuiButtonBase-root {
          color: ${active ? colors?.primary[500] : palette.text?.secondary};
          opacity: 1;
        }
      }
    `;
  }}
`;
