import { PaperProps } from "@mui/material";
import React, { forwardRef } from "react";
import { DialogContext } from "../Dialog/components/common";
import { StyledPaper } from "./style";

export type { PaperProps as DialogPaperProps };

const DialogPaper = forwardRef<HTMLDivElement, PaperProps>(function DialogPaper(
  props,
  ref
): JSX.Element {
  return (
    <DialogContext.Consumer>
      {({ sdsSize }) => <StyledPaper sdsSize={sdsSize} ref={ref} {...props} />}
    </DialogContext.Consumer>
  );
});

export default DialogPaper;
