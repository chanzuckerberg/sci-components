import { styled } from "@mui/material/styles";
import Button from "../Button";
import { CommonThemeProps, getSpaces } from "../styles";

interface StyleProps extends CommonThemeProps {
  buttonPosition: "left" | "right";
}

const doNotForwardProps = ["buttonPosition"];

export const StyledButtonsWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { buttonPosition } = props;

    return `
      display: flex;
      justify-content: ${buttonPosition === "left" ? "start" : "end"};
    `;
  }}
`;

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-top: ${spacings?.l}px;
      margin-right: ${spacings?.m}px;
    `;
  }}
`;
