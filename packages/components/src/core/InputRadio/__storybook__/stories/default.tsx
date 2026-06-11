import { RadioGroup } from "@mui/material";
import { Args } from "@storybook/react-vite";
import RawInputRadio from "@components/src/core/InputRadio";

export const InputRadio = (props: Args): JSX.Element => {
  const { caption, label, ...rest } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
    >
      <RawInputRadio caption={caption} label={label} value="demo" {...rest} />
    </RadioGroup>
  );
};
