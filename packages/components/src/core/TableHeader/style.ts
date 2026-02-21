import styled from "@emotion/styled";
import { CommonThemeProps, getSemanticColors } from "src/core/styles";

export const StyledTableHeader = styled("thead")`
  ${(props: { hasFilterRow?: boolean } & CommonThemeProps) => {
    const { hasFilterRow } = props;
    const semanticColors = getSemanticColors(props);

    return `
      border-bottom: solid 2px ${semanticColors?.base?.borderSecondary};
      margin: 0;
      padding: 0;

      ${
        hasFilterRow
          ? `
        > tr:first-of-type {
          border-bottom: none;

          :after {
            display: none !important;
          }
        }
      `
          : ""
      }
    `;
  }}
`;
