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

export {
  Subtitle as DialogTitleSubtitle,
  Title as DialogTitleTitle,
  Overline as DialogTitleOverline,
};

export interface DialogTitleProps
  extends DialogTitleExtraProps,
    RawDialogTitleProps {
  title?: string;
  subtitle?: string;
  overline?: string;
  onClose?: () => void;
}

/**
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(props: DialogTitleProps, ref): JSX.Element {
    const { children, title, subtitle, overline, onClose, ...rest } = props;

    return (
      <StyledDialogTitle ref={ref} {...rest}>
        {children || (
          <>
            {onClose && <CloseButton icon="XMark" onClick={onClose} />}
            <Overline>{overline}</Overline>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </>
        )}
      </StyledDialogTitle>
    );
  }
);

export default DialogTitle;
