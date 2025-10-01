import { Args } from "@storybook/types";
import RawBanner from "src/core/Banner";

export const Banner = (props: Args): JSX.Element => {
  const { sdsType, textChild } = props;
  return (
    <RawBanner sdsType={sdsType} {...props}>
      {textChild}
    </RawBanner>
  );
};
