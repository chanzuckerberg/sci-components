import { Args } from "@storybook/react-vite";
import RawHero from "src/core/Hero";

export const Hero = (props: Args): JSX.Element => {
  return <RawHero {...props} />;
};
