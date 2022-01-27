import { PaperProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import { DialogContext } from "../Dialog/components/common";
import { StyledPaper } from "./style";

export { PaperProps as DialogPaperProps };

export default forwardRef<unknown, PaperProps>(function DialogPaper(
  props,
  ref
): JSX.Element {
  return (
    <DialogContext.Consumer>
      {({ sdsSize }) => <StyledPaper sdsSize={sdsSize} ref={ref} {...props} />}
    </DialogContext.Consumer>
  );
});
