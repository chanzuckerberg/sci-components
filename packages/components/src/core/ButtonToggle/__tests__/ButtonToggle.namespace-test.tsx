import { ButtonToggle, ButtonToggleProps } from "@czi-sds/components";

const ButtonToggleNameSpaceTest = (props: ButtonToggleProps) => {
  return (
    <ButtonToggle
      sdsSize="medium"
      sdsType="primary"
      sdsStage="off"
      icon="InfoCircle"
      disabled={false}
    />
  );
};
