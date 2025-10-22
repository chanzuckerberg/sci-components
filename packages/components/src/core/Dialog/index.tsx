import {
  Dialog as RawDialog,
  DialogProps as RawDialogProps,
} from "@mui/material";
import React, { ComponentType, forwardRef } from "react";
import DialogPaper, { DialogPaperProps } from "./components/DialogPaper";
import DialogTitle from "./components/DialogTitle";
import DialogActions from "./components/DialogActions";
import { EMPTY_OBJECT } from "src/common/utils";

export interface DialogExtraProps {
  canClickOutsideClose?: boolean;
  onClose?: (event: object, reason: string) => void;
  sdsSize?: "xs" | "s" | "m" | "l";
  PaperComponent?: ComponentType<DialogPaperProps>;
  DialogComponent?: ComponentType<RawDialogProps>;
  classes?: {
    root?: string;
    paper?: string;
    title?: string;
    actions?: string;
  };
}

export type DialogProps = RawDialogProps & DialogExtraProps;

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(props, ref): JSX.Element {
    const {
      canClickOutsideClose = true,
      onClose,
      sdsSize = "m",
      PaperComponent = DialogPaper,
      children,
      classes = EMPTY_OBJECT,
      ...rest
    } = props;

    const {
      root: rootClassName,
      paper: paperClassName,
    }: DialogProps["classes"] = classes;

    // Create a wrapper for PaperComponent that injects sdsSize
    const PaperWithSize = React.useCallback(
      (paperProps: DialogPaperProps) => (
        <PaperComponent
          {...paperProps}
          sdsSize={sdsSize}
          className={`${paperClassName} ${paperProps.className}`}
        />
      ),
      [PaperComponent, paperClassName, sdsSize]
    );

    return (
      <RawDialog
        ref={ref}
        className={rootClassName}
        PaperComponent={PaperWithSize}
        onClose={(
          event: React.SyntheticEvent<Element, Event>,
          reason: string
        ) => {
          if (
            !canClickOutsideClose &&
            reason &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          )
            return;
          if (onClose) onClose(event, reason);
        }}
        {...rest}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          // Only pass sdsSize to DialogTitle and DialogActions components
          if (child.type === DialogTitle || child.type === DialogActions) {
            return React.cloneElement(child, { sdsSize } as Partial<{
              sdsSize: "xs" | "s" | "m" | "l";
            }>);
          }

          return child;
        })}
      </RawDialog>
    );
  }
);

export default Dialog;
