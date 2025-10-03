import { Args } from "@storybook/react-webpack5";
import RawMenuItem from "src/core/MenuItem";
import { DemoWrapper } from "../style";

export const MenuItem = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      <RawMenuItem data-testid="MenuItem" {...props}>
        {name}
      </RawMenuItem>
    </DemoWrapper>
  );
};
