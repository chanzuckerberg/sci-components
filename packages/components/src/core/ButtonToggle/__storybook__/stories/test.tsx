import { Args } from "@storybook/react-vite";
import { InfoIcon } from "@phosphor-icons/react";
import ButtonToggle from "@components/src/core/ButtonToggle";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <ButtonToggle
      {...props}
      data-testid="button-toggle"
      aria-label="button-toggle"
      sdsStyle="outline"
      startIcon={<InfoIcon weight="bold" />}
    />
  );
};
