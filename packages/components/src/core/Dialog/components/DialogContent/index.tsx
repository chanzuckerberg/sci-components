import { DialogContentProps as RawDialogContentProps } from "@mui/material";
import { forwardRef } from "react";
import { StyledDialogContent } from "./style";
import { EMPTY_OBJECT, cn } from "src/common/utils";

export type DialogContentProps = RawDialogContentProps & {
  classes?: {
    root?: string;
  };
};

export default forwardRef<HTMLDivElement, DialogContentProps>(
  /**
   * @see https://mui.com/material-ui/react-dialog/
   */
  function DialogContent(props, ref) {
    const { classes = EMPTY_OBJECT, ...rest } = props;
    const { root: rootClassName }: DialogContentProps["classes"] = classes;
    return (
      <StyledDialogContent ref={ref} className={cn(rootClassName)} {...rest} />
    );
  }
);
