import { Args } from "@storybook/react-vite";
import RawBanner from "@components/src/core/Banner";

export const Banner = (props: Args): JSX.Element => {
  const { sdsType, textChild } = props;
  return (
    <RawBanner sdsType={sdsType} {...props}>
      {textChild}
    </RawBanner>
  );
};
