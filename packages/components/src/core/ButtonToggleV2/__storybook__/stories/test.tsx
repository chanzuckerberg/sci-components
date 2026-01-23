import { Args } from "@storybook/react-webpack5";
import ButtonToggle from "src/core/ButtonToggleV2";

export const TestDemo = (props: Args): JSX.Element => {
  const { startIcon } = props;

  return (
    <ButtonToggle
      data-testid="button-toggle"
      aria-label="button-toggle"
      startIcon={startIcon}
      {...props}
    />
  );
};
