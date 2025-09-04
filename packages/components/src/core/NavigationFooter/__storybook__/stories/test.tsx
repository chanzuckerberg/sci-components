import { Args } from "@storybook/react-webpack5";
import RawNavigationFooter from "src/core/NavigationFooter/index";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawNavigationFooter
      data-testid="navigation-footer"
      title="Test Title"
      {...props}
    />
  );
};
