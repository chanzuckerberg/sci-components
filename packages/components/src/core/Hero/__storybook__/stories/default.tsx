import { Args } from "@storybook/react-webpack5";
import RawHero from "src/core/Hero";

export const Hero = (props: Args): JSX.Element => {
  return <RawHero {...props} />;
};
