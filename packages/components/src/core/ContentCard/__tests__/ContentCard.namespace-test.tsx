import React from "react";
import {
  ContentCard,
  ContentCardActions,
  ContentCardBody,
  ContentCardProps,
} from "@czi-sds/components";
import Button from "src/core/Button";

export const ContentCardNameSpaceTest = (props: ContentCardProps) => {
  return (
    <ContentCard
      visualElementType="image"
      image="https://picsum.photos/1000"
      imagePadding={false}
      imageSize={300}
      overlineText="Overline text"
      titleText="Title"
      subtitleText="Subtitle text"
      metadataText="Metadata text"
      boundingBox
      sdsType="wide"
      clickableCard={false}
      imagePosition={"left" as ContentCardProps["imagePosition"]}
      buttonsPosition="left"
    >
      <ContentCardBody>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </ContentCardBody>

      <ContentCardActions>
        <Button sdsStyle="minimal" sdsType="primary" key="minimal">
          Minimal Button
        </Button>
      </ContentCardActions>
    </ContentCard>
  );
};
