import { Args } from "@storybook/react-vite";
import RawBanner, { BannerProps } from "@components/src/core/Banner";

export const Banner = (props: Args): JSX.Element => (
  <RawBanner {...(props as BannerProps)} />
);
