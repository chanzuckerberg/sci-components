import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";

interface CalloutExtraContentProps {
  hideTitle?: boolean;
  hideBody?: boolean;
}

export const StyledCalloutExtraContent = styled("div")`
  ${(props: CommonThemeProps & CalloutExtraContentProps) => {
    const { hideTitle = false, hideBody = false } = props;
    const spaces = getSpaces(props);

    return `
      margin: ${hideTitle && hideBody ? 0 : spaces?.m}px 0 0 0;
    `;
  }}
`;
