import { TagFilter, TagFilterProps } from "@czifui/sci-components";
import React from "react";
import { noop } from "src/common/utils";

const TagFilterNameSpaceTest = (props: TagFilterProps) => {
  return <TagFilter label="Label" onDelete={noop} />;
};
