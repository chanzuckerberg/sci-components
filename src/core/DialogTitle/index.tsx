import { DialogTitleProps as RawDialogTitleProps } from "@mui/material";
import React, { forwardRef } from "react";
import CloseButton from "./components/CloseButton";
import {
  DialogTitleExtraProps,
  StyledDialogTitle,
  Subtitle,
  Title,
} from "./style";

export { Subtitle as DialogTitleSubtitle, Title as DialogTitleTitle };

export interface DialogTitleProps
  extends DialogTitleExtraProps,
    RawDialogTitleProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

/**
 * @see https://v4.mui.com/components/dialogs/
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(props: DialogTitleProps, ref): JSX.Element {
    const { children, title, subtitle, onClose, ...rest } = props;

    return (
      <StyledDialogTitle ref={ref} {...rest}>
        {children || (
          <>
            {onClose && <CloseButton onClick={onClose} />}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </>
        )}
      </StyledDialogTitle>
    );
  }
);

export default DialogTitle;
