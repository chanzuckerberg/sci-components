import { Args } from "@storybook/react-webpack5";
import RawHero from "src/core/Hero";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawHero
      headerText="Test Hero Component"
      captionText="This is a test instance of the Hero component for snapshot testing and development."
      data-testid="hero"
      {...props}
    />
  );
};
