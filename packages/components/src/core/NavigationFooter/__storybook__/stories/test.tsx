import { Args } from "@storybook/react";
import RawNavigationFooter from "../../index";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawNavigationFooter
      data-testid="navigation-footer"
      title="Test Title"
      {...props}
    />
  );
};
