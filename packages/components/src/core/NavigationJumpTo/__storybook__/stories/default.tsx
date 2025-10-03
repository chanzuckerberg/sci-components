import { Args } from "@storybook/react-webpack5";
import RawNavigationJumpTo from "src/core/NavigationJumpTo";

export const NavigationJumpTo = (props: Args): JSX.Element => {
  const { items, ...rest } = props;

  return <RawNavigationJumpTo items={items} {...rest} />;
};
