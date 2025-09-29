import React from "react";
import { Hero, HeroProps } from "@czi-sds/components";

const HeroNameSpaceTest = (props: HeroProps) => {
  return (
    <Hero
      headerText={props.headerText || "Test Hero Header"}
      captionText={props.captionText || "Test Hero Caption"}
      maxWidth={props.maxWidth || "large"}
      useContainerMargin={props.useContainerMargin}
      className={props.className}
      data-testid={props["data-testid"]}
    />
  );
};

export default HeroNameSpaceTest;
