import { TagFilter, TagFilterProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const TagFilterNameSpaceTest = (props: TagFilterProps) => {
  return <TagFilter label="Label" onDelete={noop} />;
};
