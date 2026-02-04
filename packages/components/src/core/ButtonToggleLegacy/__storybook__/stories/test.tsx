import { Args } from "@storybook/react-webpack5";
import ButtonToggleLegacy from "src/core/ButtonToggleLegacy";

export const TestDemo = (props: Args): JSX.Element => {
  const { icon } = props;

  return (
    <ButtonToggleLegacy
      data-testid="button-toggle"
      aria-label="button-toggle"
      icon={icon}
      {...props}
    />
  );
};
