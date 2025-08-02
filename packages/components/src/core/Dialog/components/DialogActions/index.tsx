import { DialogActionsProps as RawDialogActionsProps } from "@mui/material";
import { forwardRef, useContext } from "react";
import { DialogContext } from "src/core/Dialog/components/common";
import { DialogActionsExtraProps, StyledDialogActions } from "./style";

export type DialogActionsProps = Omit<DialogActionsExtraProps, "sdsSize"> &
  RawDialogActionsProps;

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    const { sdsSize } = useContext(DialogContext);
    return <StyledDialogActions ref={ref} {...props} sdsSize={sdsSize} />;
  }
);

export default DialogActions;
