import styled from "@emotion/styled";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  width?: number;
}

export const StyledColumn = styled("div")`
  ${(props: StyleProps) => {
    const { width = 280 } = props;

    return `
      position: relative;
      width: ${width}px;
    `;
  }}
`;

export const StyledColumnTitle = styled("p")`
  ${fontCapsXxxxs}
  ${(props: StyleProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      padding: 0 ${spaces?.xs}px ${spaces?.xxs}px;
      margin: 0;
    `;
  }}
`;
