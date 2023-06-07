import { PaperProps } from "@mui/material";
import { forwardRef } from "react";
import { DialogContext } from "../Dialog/components/common";
import { StyledPaper } from "./style";

export type DialogPaperProps = Omit<
  PaperProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

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
