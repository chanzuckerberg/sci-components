import React from "react";
import { ButtonIcon, ButtonIconProps, Icon } from "@czi-sds/components";

const ButtonIconNameSpaceTest = (props: ButtonIconProps) => {
  return (
    <ButtonIcon size="large" sdsType="primary" {...props}>
      <Icon sdsIcon="Download" sdsSize="l" sdsType="button" />
    </ButtonIcon>
  );
};
