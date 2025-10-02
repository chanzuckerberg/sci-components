import { Args } from "@storybook/types";
import RawNavigationFooter from "src/core/NavigationFooter";

export const NavigationFooter = (props: Args): JSX.Element => {
  return <RawNavigationFooter {...props} title={props.title} />;
};
