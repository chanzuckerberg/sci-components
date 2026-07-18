import { Args } from "@storybook/react-vite";
import ButtonToggle from "@components/src/core/ButtonToggle";
import Icon from "@components/src/core/Icon";

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
