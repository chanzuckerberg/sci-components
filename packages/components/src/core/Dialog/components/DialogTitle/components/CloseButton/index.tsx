import { ForwardedRef, forwardRef } from "react";
import { StyledButton } from "./style";

const SDS_SIZE_TO_COMPONENT_SIZE: {
  [key: string]: "small" | "medium" | "large";
} = {
  l: "large",
  m: "large",
  s: "medium",
  xs: "small",
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

  const size = SDS_SIZE_TO_COMPONENT_SIZE[dialogSize] ?? "large";

  return (
    <StyledButton
      aria-label="Close"
      ref={ref}
      onClick={onClick}
      sdsSize={size}
      icon="XMark"
      sdsStyle="icon"
      sdsType="tertiary"
      className={className}
      {...rest}
    />
  );
});

export default CloseButton;
