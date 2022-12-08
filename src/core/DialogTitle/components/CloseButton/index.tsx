import React, { ForwardedRef, forwardRef } from "react";
import { ButtonIconProps, ButtonIconSizeToTypes } from "src/core/ButtonIcon";
import { DialogContext } from "src/core/Dialog/components/common";
import { IconNameToSizes } from "src/core/Icon";
import { StyledButtonIcon } from "./style";

const CloseButton = forwardRef(function CloseButton<
  IconName extends keyof IconNameToSizes,
  ButtonIconSize extends keyof ButtonIconSizeToTypes
>(
  props: ButtonIconProps<IconName, ButtonIconSize>,
  ref: ForwardedRef<HTMLButtonElement | null>
) {
  const SDS_SIZE_TO_COMPONENT_SIZE: {
    [key: string]: keyof ButtonIconSizeToTypes;
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
            sdsIcon="xMark"
          />
        );
      }}
    </DialogContext.Consumer>
  );
});

export default CloseButton;
