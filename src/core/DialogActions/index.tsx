import { DialogActionsProps as RawDialogActionsProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import { ExtraProps, StyledDialogActions } from "./style";

export type DialogActionsProps = ExtraProps & RawDialogActionsProps;

export default forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    return <StyledDialogActions ref={ref} {...props} />;
  }
);
