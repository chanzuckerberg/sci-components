"use client";

import { DialogActionsProps as RawDialogActionsProps } from "@mui/material";
import { forwardRef } from "react";
import { DialogActionsExtraProps, StyledDialogActions } from "./style";

export type DialogActionsProps = DialogActionsExtraProps &
  RawDialogActionsProps;

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    return <StyledDialogActions ref={ref} {...props} />;
  }
);

export default DialogActions;
