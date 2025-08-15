import { DialogTitleProps as RawDialogTitleProps } from "@mui/material";
import { forwardRef, useContext } from "react";
import CloseButton from "./components/CloseButton";
import {
  DialogTitleExtraProps,
  StyledDialogTitle,
  Subtitle,
  Title,
  Overline,
} from "./style";
import { DialogContext } from "../common";

export {
  Subtitle as DialogTitleSubtitle,
  Title as DialogTitleTitle,
  Overline as DialogTitleOverline,
};

export interface DialogTitleProps
  extends Omit<DialogTitleExtraProps, "sdsSize">,
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
    const { sdsSize } = useContext(DialogContext);

    return (
      <StyledDialogTitle ref={ref} {...rest} sdsSize={sdsSize}>
        {children || (
          <>
            {onClose && (
              <CloseButton sdsStyle="icon" icon="XMark" onClick={onClose} />
            )}
            <Overline sdsSize={sdsSize}>{overline}</Overline>
            <Title sdsSize={sdsSize}>{title}</Title>
            <Subtitle sdsSize={sdsSize}>{subtitle}</Subtitle>
          </>
        )}
      </StyledDialogTitle>
    );
  }
);

export default DialogTitle;
