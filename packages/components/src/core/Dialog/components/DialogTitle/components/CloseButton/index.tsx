import { ForwardedRef, forwardRef } from "react";
import { StyledButton } from "./style";
import Icon from "src/core/Icon";

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
      size={size}
      sdsStyle="minimal"
      sdsType="secondary"
      backgroundOnHover={false}
      className={className}
      {...rest}
    >
      <Icon
        sdsIcon="XMark"
        sdsSize={
          dialogSize === "xs"
            ? "s"
            : dialogSize === "s"
              ? "l"
              : dialogSize === "m"
                ? "l"
                : "xl"
        }
      />
    </StyledButton>
  );
});

export default CloseButton;
