import { Args } from "@storybook/react-vite";
import RawNavigationFooter from "src/core/NavigationFooter";

export const NavigationFooter = (props: Args): JSX.Element => {
  return <RawNavigationFooter {...props} title={props.title} />;
};
