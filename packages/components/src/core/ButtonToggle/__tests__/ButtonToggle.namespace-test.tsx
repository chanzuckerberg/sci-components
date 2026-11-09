import { ButtonToggle, ButtonToggleProps } from "@czi-sds/components";
import { InfoIcon } from "@phosphor-icons/react";

const ButtonToggleNameSpaceTest = (props: ButtonToggleProps) => {
  return (
    <ButtonToggle
      size="medium"
      sdsType="primary"
      sdsStage="off"
      startIcon={<InfoIcon weight="bold" />}
      disabled={false}
    />
  );
};
