import { Args } from "@storybook/react-webpack5";
import RawHero from "src/core/Hero";

export const Hero = (props: Args): JSX.Element => {
  const { headerText, captionText, ...restProps } = props;

  return (
    <RawHero headerText={headerText} captionText={captionText} {...restProps} />
  );
};
