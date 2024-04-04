import { Args } from "@storybook/react";
import RawNavigationJumpTo from "src/core/NavigationJumpTo";

export const NavigationJumpTo = (props: Args): JSX.Element => {
  const { items, ...rest } = props;

  return <RawNavigationJumpTo items={items} {...rest} />;
};
