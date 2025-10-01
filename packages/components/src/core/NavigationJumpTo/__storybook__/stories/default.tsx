import { Args } from "@storybook/types";
import RawNavigationJumpTo from "src/core/NavigationJumpTo";

export const NavigationJumpTo = (props: Args): JSX.Element => {
  const { items, ...rest } = props;

  return <RawNavigationJumpTo items={items} {...rest} />;
};
