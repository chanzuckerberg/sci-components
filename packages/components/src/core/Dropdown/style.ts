import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";

interface StyleProps extends CommonThemeProps {
  buttonPosition: "left" | "right";
}

const doNotForwardProps = ["buttonPosition"];

export const StyledButtonsWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { buttonPosition } = props;
    const spaces = getSpaces(props);

    return `
      display: flex;
      justify-content: ${buttonPosition === "left" ? "start" : "end"};
      width: 100%;

      & > div {
        gap: ${spaces?.xs}px;
        padding: ${spaces?.xs}px ${spaces?.xs}px 0;
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 100%;

        & > button {
          width: 100%;
        }
      }
    `;
  }}
`;
