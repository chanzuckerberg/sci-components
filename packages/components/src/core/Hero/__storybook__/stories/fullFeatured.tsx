import { Args } from "@storybook/react-webpack5";
import RawHero from "src/core/Hero";
import { DemoContentSlot } from "../../style";

export const FullFeaturedDemo = (props: Args): JSX.Element => {
  const { headerText, captionText, ...restProps } = props;

  return (
    <RawHero headerText={headerText} captionText={captionText} {...restProps}>
      <DemoContentSlot>Content Slot (childNode)</DemoContentSlot>
    </RawHero>
  );
};
