import {
  Dialog as RawDialog,
  DialogProps as RawDialogProps,
} from "@material-ui/core";
import React, { ComponentType, forwardRef, useMemo } from "react";
import DialogPaper, { DialogPaperProps } from "../DialogPaper";
import { DialogContext } from "./components/common";

export { DialogContext };

interface ExtraProps {
  sdsSize?: "xs" | "s" | "m" | "l";
  PaperComponent?: ComponentType<DialogPaperProps>;
  DialogComponent?: ComponentType<RawDialogProps>;
}

export type DialogProps = RawDialogProps & ExtraProps;

const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  props,
  ref
): JSX.Element {
  const {
    sdsSize = "m",
    DialogComponent = RawDialog,
    PaperComponent = DialogPaper,
    ...rest
  } = props;

  const contextValue = useMemo(() => ({ sdsSize }), [sdsSize]);

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogComponent ref={ref} PaperComponent={PaperComponent} {...rest} />
    </DialogContext.Provider>
  );
});

export default Dialog;
