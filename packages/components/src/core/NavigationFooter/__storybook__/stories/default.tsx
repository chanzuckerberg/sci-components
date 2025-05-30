import { Args } from "@storybook/react";
import RawNavigationFooter from "../../index";

export const NavigationFooter = (props: Args): JSX.Element => {
  return <RawNavigationFooter {...props} title={props.title} />;
};
