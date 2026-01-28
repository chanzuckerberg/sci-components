import { ForwardedRef, forwardRef } from "react";
import { StyledButton } from "./style";
import Icon from "src/core/Icon";

const DIALOG_SIZE_TO_BUTTON_SIZE: {
  [key: string]: "small" | "medium" | "large";
} = {
  l: "large",
  m: "large",
  s: "medium",
  xs: "small",
};

const DIALOG_SIZE_TO_ICON_SIZE: {
  [key: string]: "s" | "l" | "xl";
} = {
  l: "xl",
  m: "l",
  s: "l",
  xs: "s",
};

interface CloseButtonProps {
  onClick?: () => void;
  dialogSize?: "xs" | "s" | "m" | "l";
  className?: string;
}

const CloseButton = forwardRef(function CloseButton(
  props: CloseButtonProps,
  ref: ForwardedRef<HTMLButtonElement | null>
) {
  const { dialogSize = "m", onClick, className, ...rest } = props;

  const size = DIALOG_SIZE_TO_BUTTON_SIZE[dialogSize] ?? "large";
  const iconSize = DIALOG_SIZE_TO_ICON_SIZE[dialogSize] ?? "l";

  return (
    <StyledButton
      aria-label="Close"
      ref={ref}
      onClick={onClick}
      size={size}
      sdsStyle="minimal"
      sdsType="secondary"
      backgroundOnHover={false}
      className={className}
      {...rest}
    >
      <Icon sdsIcon="XMark" sdsSize={iconSize} />
    </StyledButton>
  );
});

export default CloseButton;
