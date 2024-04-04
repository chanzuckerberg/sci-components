import { Args } from "@storybook/react";
import RawInputText from "src/core/InputText";

export const InputText = (props: Args): JSX.Element => {
  const {
    id,
    intent,
    disabled,
    hideLabel,
    placeholder,
    label,
    sdsType,
    sdsStage,
  } = props;
  return (
    <RawInputText
      id={id}
      sdsType={sdsType}
      sdsStage={sdsStage}
      label={label}
      placeholder={placeholder}
      intent={intent}
      hideLabel={hideLabel}
      disabled={disabled}
      name="input-text-name"
      autoComplete="off"
    />
  );
};
