import { DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "../styles";

export interface ExtraProps extends CommonThemeProps {
  buttonPosition?: "left" | "right";
}

// (thuang): Please keep this in sync with the props used in `ExtraProps`
const doNotForwardProps = ["buttonPosition"];

export const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<ExtraProps>`
  padding: 0;

  ${(props) => {
    const spaces = getSpaces(props);
    const { buttonPosition = "right" } = props;

    return `
      justify-content: ${
        buttonPosition === "right" ? "flex-end" : "flex-start"
      };;

      margin-top: ${spaces?.xxl}px;

      &.MuiDialogActions-spacing > :not(:first-of-type) {
        margin-left: ${spaces?.m}px;
      }
  `;
  }}
`;
