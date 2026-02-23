import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";
import { PanelHeaderProps } from ".";

export interface ExtraPanelHeaderProps
  extends CommonThemeProps, PanelHeaderProps {}

export const StyledPanelHeader = styled("div")`
  ${(props: ExtraPanelHeaderProps) => {
    const spaces = getSpaces(props);

    return `
      width: 100%;
      height: 100%;
      margin-right: ${spaces?.l}px;
    `;
  }}
`;
