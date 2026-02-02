import { DialogTitleProps as RawDialogTitleProps } from "@mui/material";
import { forwardRef } from "react";
import CloseButton from "./components/CloseButton";
import {
  DialogTitleExtraProps,
  StyledDialogTitle,
  Subtitle,
  Title,
  Overline,
} from "./style";
import { EMPTY_OBJECT, cn } from "src/common/utils";

export {
  Subtitle as DialogTitleSubtitle,
  Title as DialogTitleTitle,
  Overline as DialogTitleOverline,
};

export interface DialogTitleProps
  extends DialogTitleExtraProps, RawDialogTitleProps {
  title?: string;
  subtitle?: string;
  overline?: string;
  onClose?: () => void;
  classes?: {
    root?: string;
    title?: string;
    subtitle?: string;
    overline?: string;
    closeButton?: string;
  };
}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(props: DialogTitleProps, ref): JSX.Element {
    const {
      children,
      title,
      subtitle,
      overline,
      onClose,
      sdsSize,
      classes = EMPTY_OBJECT,
      ...rest
    } = props;

    const {
      root: rootClassName,
      title: titleClassName,
      subtitle: subtitleClassName,
      overline: overlineClassName,
      closeButton: closeButtonClassName,
    }: DialogTitleProps["classes"] = classes;

    return (
      <StyledDialogTitle
        ref={ref}
        sdsSize={sdsSize}
        className={cn(rootClassName)}
        {...rest}
      >
        {children || (
          <>
            {onClose && (
              <CloseButton
                onClick={onClose}
                dialogSize={sdsSize}
                className={cn(closeButtonClassName)}
              />
            )}
            <Overline sdsSize={sdsSize} className={cn(overlineClassName)}>
              {overline}
            </Overline>
            <Title sdsSize={sdsSize} className={cn(titleClassName)}>
              {title}
            </Title>
            <Subtitle sdsSize={sdsSize} className={cn(subtitleClassName)}>
              {subtitle}
            </Subtitle>
          </>
        )}
      </StyledDialogTitle>
    );
  }
);

export default DialogTitle;
