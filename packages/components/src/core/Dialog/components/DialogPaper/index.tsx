import { PaperProps } from "@mui/material";
import { forwardRef } from "react";
import { StyledPaper } from "./style";

export interface DialogPaperProps extends PaperProps {
  sdsSize?: "xs" | "s" | "m" | "l";
}

/**
 * @see https://mui.com/material-ui/react-paper/
 */
const DialogPaper = forwardRef<HTMLDivElement, DialogPaperProps>(
  function DialogPaper(props, ref): JSX.Element {
    const { sdsSize = "m", ...rest } = props;
    return <StyledPaper sdsSize={sdsSize} ref={ref} {...rest} />;
  }
);

export default DialogPaper;
