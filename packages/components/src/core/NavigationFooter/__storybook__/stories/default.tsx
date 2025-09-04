import { Args } from "@storybook/react-webpack5";
import RawNavigationFooter from "src/core/NavigationFooter";

export const NavigationFooter = (props: Args): JSX.Element => {
  return <RawNavigationFooter {...props} title={props.title} />;
};
