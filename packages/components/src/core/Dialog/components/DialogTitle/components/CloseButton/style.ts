import styled from "@emotion/styled";
import Button from "src/core/Button";
import { CommonThemeProps, getSpaces } from "src/core/styles";

const doNotForwardProps = ["sdsSize"];

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  position: absolute;

  ${(props: CommonThemeProps & { sdsSize: "small" | "medium" | "large" }) => {
    const { sdsSize } = props;
    const isSmall = sdsSize === "small" || sdsSize === "medium";

    const spaces = getSpaces(props);

    const right = isSmall ? spaces?.xl : spaces?.xxl;

    return `
      right: ${right}px;
    `;
  }}
`;
