import { Args } from "@storybook/react-webpack5";
import ButtonToggle from "src/core/ButtonToggle";

export const TestDemo = (props: Args): JSX.Element => {
  const { icon } = props;

  return (
    <ButtonToggle
      data-testid="button-toggle"
      aria-label="button-toggle"
      icon={icon}
      {...props}
    />
  );
};
