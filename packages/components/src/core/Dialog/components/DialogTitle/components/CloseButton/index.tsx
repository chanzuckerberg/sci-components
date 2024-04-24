import { ForwardedRef, forwardRef } from "react";
import { ButtonIconProps } from "src/core/ButtonIcon";
import { DialogContext } from "src/core/Dialog/components/common";
import { StyledButtonIcon } from "./style";

const CloseButton = forwardRef(function CloseButton(
  props: ButtonIconProps,
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
          <StyledButtonIcon
            aria-label="Close"
            ref={ref}
            sdsType="tertiary"
            sdsSize={size}
            {...props}
            icon="XMark"
          />
        );
      }}
    </DialogContext.Consumer>
  );
});

export default CloseButton;
