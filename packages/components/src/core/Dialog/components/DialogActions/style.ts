import { DialogActions, dialogActionsClasses } from "@mui/material";
import styled from "@emotion/styled";
import { CommonThemeProps, getSpaces } from "src/core/styles";
import { DialogTitleExtraProps } from "../DialogTitle/style";

export interface DialogActionsExtraProps extends CommonThemeProps {
  buttonPosition?: "left" | "right";
  sdsSize: DialogTitleExtraProps["sdsSize"];
}

// (thuang): Please keep this in sync with the props used in `DialogActionsExtraProps`
const doNotForwardProps = ["buttonPosition"];

export const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<DialogActionsExtraProps>`
  padding: 0;

  ${(props) => {
    const spaces = getSpaces(props);
    const { buttonPosition = "right", sdsSize } = props;
    const isSmall = sdsSize === "xs" || sdsSize === "s";

    return `
      justify-content: ${
        buttonPosition === "right" ? "flex-end" : "flex-start"
      };;

      margin-top: ${isSmall ? spaces?.xl : spaces?.xxl}px;

      &.${dialogActionsClasses.spacing} > :not(:first-of-type) {
        margin-left: ${spaces?.m}px;
      }
  `;
  }}
`;
