import { Icon, TagLegacy, TagLegacyProps } from "@czi-sds/components";
import React from "react";

const TagLegacyNameSpaceTest = (props: TagLegacyProps) => {
  return (
    <TagLegacy
      color="beta"
      icon={<Icon sdsIcon="Download" sdsSize="l" />}
      label="Label"
      sdsStyle="rounded"
      sdsType="primary"
    />
  );
};
