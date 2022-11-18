import React, { forwardRef } from "react";
import { ButtonIconProps } from "src/core/ButtonIcon";
import { DialogContext } from "src/core/Dialog/components/common";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import { StyledButtonIcon } from "./style";

const SDS_SIZE_TO_COMPONENT_SIZE = {
  l: "large",
  m: "large",
  s: "medium",
  xs: "small",
};

const SDS_SIZE_TO_ICON_SIZE = {
  l: "xl",
  m: "xl",
  s: "l",
  xs: "s",
};

const CloseButton = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function CloseButton(props, ref) {
    return (
      <DialogContext.Consumer>
        {({ sdsSize }) => {
          const size = SDS_SIZE_TO_COMPONENT_SIZE[
            sdsSize
          ] as ButtonIconProps["sdsSize"];

          const iconSize = SDS_SIZE_TO_ICON_SIZE[sdsSize] as IconProps<
            keyof IconNameToSizes
          >["sdsSize"];

          return (
            <StyledButtonIcon
              aria-label="Close"
              ref={ref}
              sdsType="tertiary"
              sdsSize={size}
              {...props}
            >
              <Icon sdsIcon="xMark" sdsSize={iconSize} sdsType="iconButton" />
            </StyledButtonIcon>
          );
        }}
      </DialogContext.Consumer>
    );
  }
);

export default CloseButton;
