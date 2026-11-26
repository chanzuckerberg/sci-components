import { XIcon } from "@phosphor-icons/react";
import { ForwardedRef, forwardRef } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import { StyledButton } from "./style";

const DIALOG_SIZE_TO_BUTTON_SIZE: {
  [key: string]: "small" | "medium" | "large";
} = {
  l: "large",
  m: "large",
  s: "medium",
  xs: "small",
};

const DIALOG_SIZE_TO_ICON_SIZE: {
  [key: string]: number;
} = {
  l: 32,
  m: 24,
  s: 24,
  xs: 16,
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
  const iconSize = DIALOG_SIZE_TO_ICON_SIZE[dialogSize] ?? 24;

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
      <XIcon {...INTERNAL_ICON_PROPS} size={iconSize} />
    </StyledButton>
  );
});

export default CloseButton;
