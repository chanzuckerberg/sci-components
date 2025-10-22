import { DialogActionsProps as RawDialogActionsProps } from "@mui/material";
import { forwardRef } from "react";
import { StyledDialogActions } from "./style";
import { DialogExtraProps } from "../../index";
import { EMPTY_OBJECT, cn } from "src/common/utils";

export interface DialogActionsProps extends RawDialogActionsProps {
  sdsSize?: DialogExtraProps["sdsSize"];
  buttonPosition?: "left" | "right";
  classes?: {
    root?: string;
  };
}

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions(props, ref) {
    const { sdsSize = "m", classes = EMPTY_OBJECT, ...rest } = props;
    const { root: rootClassName }: DialogActionsProps["classes"] = classes;
    return (
      <StyledDialogActions
        ref={ref}
        sdsSize={sdsSize}
        className={cn(rootClassName)}
        {...rest}
      />
    );
  }
);

export default DialogActions;
