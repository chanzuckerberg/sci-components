import { Banner, BannerProps } from "czifui";
import React from "react";

const BannerNameSpaceTest = (props: BannerProps) => {
  return (
    <Banner {...props} dismissible sdsType="primary">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aliquid
      maxime soluta voluptas expedita molestias neque saepe aperiam amet enim
      natus placeat, tempore doloribus odio reiciendis repellat? Dolorem,
      voluptatem tempore.
    </Banner>
  );
};
