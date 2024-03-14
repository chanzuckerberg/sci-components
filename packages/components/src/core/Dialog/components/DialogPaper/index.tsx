import { PaperProps } from "@mui/material";
import { forwardRef } from "react";
import { DialogContext } from "../common";
import { StyledPaper } from "./style";

export type DialogPaperProps = PaperProps;

/**
 * @see https://mui.com/material-ui/react-paper/
 */
const DialogPaper = forwardRef<HTMLDivElement, DialogPaperProps>(
  function DialogPaper(props, ref): JSX.Element {
    return (
      <DialogContext.Consumer>
        {({ sdsSize }) => (
          <StyledPaper sdsSize={sdsSize} ref={ref} {...props} />
        )}
      </DialogContext.Consumer>
    );
  }
);

export default DialogPaper;
