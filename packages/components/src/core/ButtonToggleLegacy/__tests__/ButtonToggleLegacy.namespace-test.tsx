import {
  ButtonToggleLegacy,
  ButtonToggleLegacyProps,
} from "@czi-sds/components";

const ButtonToggleLegacyNameSpaceTest = (props: ButtonToggleLegacyProps) => {
  return (
    <ButtonToggleLegacy
      sdsSize="medium"
      sdsType="primary"
      sdsStage="off"
      icon="InfoCircle"
      disabled={false}
    />
  );
};
