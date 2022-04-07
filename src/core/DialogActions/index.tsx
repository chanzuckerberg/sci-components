import { DialogActionsProps as RawDialogActionsProps } from "@mui/material";
import React, { forwardRef } from "react";
import { ExtraProps, StyledDialogActions } from "./style";

export type DialogActionsProps = ExtraProps & RawDialogActionsProps;

const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    return <StyledDialogActions ref={ref} {...props} />;
  }
);

export default DialogActions;
