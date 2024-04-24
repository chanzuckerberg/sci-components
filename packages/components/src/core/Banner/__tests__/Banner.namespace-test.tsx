import React from "react";
import { Banner, BannerProps } from "@czi-sds/components";
import { LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

const BannerNameSpaceTest = (props: BannerProps) => {
  return (
    <Banner {...props} dismissible sdsType="primary">
      {LONG_LOREM_IPSUM}
    </Banner>
  );
};
