import { Banner, BannerProps } from "czifui";
import React from "react";

const BannerNameSpaceTest = (props: BannerProps) => {
  const { sdsType, text } = props;
  return <Banner {...props} />;
};
