import styled from "@emotion/styled";
import { ToggleButtonGroup } from "@mui/material";
import {
  CommonThemeProps,
  getColors,
  getCorners,
  getIconSizes,
  getSpaces,
} from "../styles";

const sdsPropNames = ["buttonDefinition"];

export const StyledSegmentedControl = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => {
    return !sdsPropNames.includes(prop.toString());
  },
})`
  ${(props: CommonThemeProps) => {
    const colors = getColors(props);
    const spacings = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const corners = getCorners(props);

    return `
    height: 26px;
    
    .Mui-selected.MuiToggleButton-root {
        background-color: ${colors?.gray[100]};
        color: ${colors?.primary[400]};
        border-color: ${colors?.gray[300]};
        &:hover {
          background-color: ${colors?.gray[100]};
        }
    }

    .MuiToggleButtonGroup-grouped.MuiToggleButton-root {
      //border-radius: ${corners?.l}px;

    }

    .MuiSvgIcon-root{
      padding-right: ${spacings?.l}px;
      padding-left: ${spacings?.l}px;
      padding-bottom: ${spacings?.xs}px;
      padding-top: ${spacings?.xs}px;
      border-radius: ${corners?.m}px;
    }
    `;
  }}
`;
