import { Args } from "@storybook/react-vite";
import RawNavigationJumpTo from "@components/src/core/NavigationJumpTo";

export const NavigationJumpTo = (props: Args): JSX.Element => {
  const { items, ...rest } = props;

  return <RawNavigationJumpTo items={items} {...rest} />;
};
