import { Args } from "@storybook/react-webpack5";
import RawButtonToggleV2 from "src/core/ButtonToggleV2";

export const ButtonToggleV2 = (props: Args): JSX.Element => {
  const { startIcon } = props;

  return (
    <RawButtonToggleV2
      aria-label="button-toggle"
      startIcon={startIcon}
      {...props}
    />
  );
};
