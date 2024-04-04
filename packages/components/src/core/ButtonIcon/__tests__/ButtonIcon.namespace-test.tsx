import { ButtonIcon, ButtonIconProps, Icon } from "@czi-sds/components";
import React from "react";

const ButtonIconNameSpaceTest = (
  props: ButtonIconProps<"Download", "large">
) => {
  return (
    <ButtonIcon size="large" sdsType="primary" {...props}>
      <Icon sdsIcon="Download" sdsSize="l" sdsType="button" />
    </ButtonIcon>
  );
};
