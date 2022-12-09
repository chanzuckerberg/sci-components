import { ButtonIcon, ButtonIconProps, Icon } from "czifui";
import React from "react";

const ButtonIconNameSpaceTest = (
  props: ButtonIconProps<"download", "large">
) => {
  return (
    <ButtonIcon active size="large" sdsType="primary" {...props}>
      <Icon sdsIcon="download" sdsSize="l" sdsType="button" />
    </ButtonIcon>
  );
};
