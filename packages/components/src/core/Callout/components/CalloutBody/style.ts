import styled from "@emotion/styled";
import { CommonThemeProps, fontBodyXs, getSpaces } from "src/core/styles";

export const StyledCalloutBody = styled("p")`
  ${fontBodyXs}

  ${(props: CommonThemeProps & { hideTitle?: boolean }) => {
    const { hideTitle = false } = props;
    const spaces = getSpaces(props);

    return `
      margin: ${!hideTitle ? spaces?.xs : 0}px 0 0 0;
    `;
  }}
`;
