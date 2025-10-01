import { Args } from "@storybook/types";
import RawInputText from "src/core/InputText";

export const InputText = (props: Args): JSX.Element => {
  const { id, intent, disabled, hideLabel, placeholder, label, sdsType } =
    props;
  return (
    <RawInputText
      id={id}
      sdsType={sdsType}
      label={label}
      placeholder={placeholder}
      intent={intent}
      hideLabel={hideLabel}
      disabled={disabled}
      name="input-text-name"
      autoComplete="off"
      sx={{ width: "200px" }}
    />
  );
};
