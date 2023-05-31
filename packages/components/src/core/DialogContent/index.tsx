import { DialogContentProps } from "@mui/material";
import { forwardRef } from "react";
import { StyledDialogContent } from "./style";

export type { DialogContentProps };

export default forwardRef<HTMLDivElement, DialogContentProps>(
  /**
   * @see https://mui.com/material-ui/react-dialog/
   */
  function DialogContent(props, ref) {
    return <StyledDialogContent ref={ref} {...props} />;
  }
);
