import { Args } from "@storybook/react";
import RawNavigationJumpTo from "src/core/NavigationJumpTo";

export const TestDemo = (props: Args): JSX.Element => {
  const { items, ...rest } = props;

  return (
    <RawNavigationJumpTo
      data-testid="navigation-jump-to"
      items={items}
      {...rest}
    />
  );
};
