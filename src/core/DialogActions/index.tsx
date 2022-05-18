import { DialogActionsProps as RawDialogActionsProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import { DialogActionsExtraProps, StyledDialogActions } from "./style";

export type DialogActionsProps = DialogActionsExtraProps &
  RawDialogActionsProps;

/**
 * @see https://v4.mui.com/components/dialogs/
 */
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    return <StyledDialogActions ref={ref} {...props} />;
  }
);

export default DialogActions;
