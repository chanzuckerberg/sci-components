import { ForwardedRef, forwardRef } from "react";
import { ButtonProps } from "src/core/Button";
import { DialogContext } from "src/core/Dialog/components/common";
import { StyledButton } from "./style";

const CloseButton = forwardRef(function CloseButton(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement | null>
) {
  const SDS_SIZE_TO_COMPONENT_SIZE: {
    [key: string]: "small" | "medium" | "large";
  } = {
    l: "large",
    m: "large",
    s: "medium",
    xs: "small",
  };

  return (
    <DialogContext.Consumer>
      {({ sdsSize }) => {
        const size = SDS_SIZE_TO_COMPONENT_SIZE[sdsSize];

        return (
          <StyledButton
            aria-label="Close"
            ref={ref}
            sdsType="tertiary"
            sdsSize={size}
            {...props}
            icon="XMark"
            sdsStyle="icon"
          />
        );
      }}
    </DialogContext.Consumer>
  );
});

export default CloseButton;
