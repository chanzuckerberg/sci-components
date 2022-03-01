import { DialogTitleProps as RawDialogTitleProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import CloseButton from "./components/CloseButton";
import { ExtraProps, StyledDialogTitle, Subtitle, Title } from "./style";

export { Subtitle as DialogTitleSubtitle, Title as DialogTitleTitle };

export interface DialogTitleProps extends ExtraProps, RawDialogTitleProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

const DialogTitle = forwardRef(function DialogTitle(
  props: DialogTitleProps,
  ref
): JSX.Element {
  const { children, title, subtitle, onClose, ...rest } = props;

  return (
    <StyledDialogTitle disableTypography ref={ref} {...rest}>
      {children || (
        <>
          {onClose && <CloseButton onClick={onClose} />}
          <Title variant="h6">{title}</Title>
          <Subtitle variant="h6">{subtitle}</Subtitle>
        </>
      )}
    </StyledDialogTitle>
  );
});

export default DialogTitle;
