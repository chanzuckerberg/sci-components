import React, { forwardRef } from "react";
import { DialogContext } from "src/core/Dialog/components/common";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import { IconButtonProps } from "src/core/IconButton";
import { StyledIconButton } from "./style";

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

export default forwardRef<HTMLButtonElement, IconButtonProps>(
  function CloseButton(props, ref) {
    return (
      <DialogContext.Consumer>
        {({ sdsSize }) => {
          const size = SDS_SIZE_TO_COMPONENT_SIZE[
            sdsSize
          ] as IconButtonProps["sdsSize"];

          const iconSize = SDS_SIZE_TO_ICON_SIZE[sdsSize] as IconProps<
            keyof IconNameToSizes
          >["sdsSize"];

          return (
            <StyledIconButton
              ref={ref}
              sdsType="tertiary"
              sdsSize={size}
              {...props}
            >
              <Icon sdsIcon="xMark" sdsSize={iconSize} sdsType="iconButton" />
            </StyledIconButton>
          );
        }}
      </DialogContext.Consumer>
    );
  }
);
