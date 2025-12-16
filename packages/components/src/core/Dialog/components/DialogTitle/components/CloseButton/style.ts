import styled from "@emotion/styled";
import Button from "src/core/Button";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export const StyledButton = styled(Button)`
  position: absolute;

  ${(props: CommonThemeProps & { sdsSize: "small" | "medium" | "large" }) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "small" || sdsSize === "medium";

    const spaces = getSpaces(props);

    const right = isSmall ? spaces?.xl : spaces?.xxxl;

    return `
      right: ${right}px;
    `;
  }}
`;
