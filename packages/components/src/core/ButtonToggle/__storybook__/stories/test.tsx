import { Args } from "@storybook/react-webpack5";
import ButtonToggle from "src/core/ButtonToggle";
import Icon from "src/core/Icon";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <ButtonToggle
      {...props}
      data-testid="button-toggle"
      aria-label="button-toggle"
      sdsStyle="outline"
      startIcon={<Icon sdsIcon="InfoCircle" sdsSize="s" />}
    />
  );
};
