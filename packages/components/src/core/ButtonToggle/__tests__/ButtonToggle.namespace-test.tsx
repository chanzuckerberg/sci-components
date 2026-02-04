import { ButtonToggle, ButtonToggleProps } from "@czi-sds/components";

const ButtonToggleNameSpaceTest = (props: ButtonToggleProps) => {
  return (
    <ButtonToggle
      size="medium"
      sdsType="primary"
      sdsStage="off"
      startIcon="InfoCircle"
      disabled={false}
    />
  );
};
