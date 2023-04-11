import { ComplexFilter, ComplexFilterProps } from "@czifui/sci-components";
import React from "react";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
];

const ComplexFilterNameSpaceTest = (props: ComplexFilterProps<true>) => {
  return (
    <ComplexFilter
      label="Click Target"
      onChange={noop}
      multiple
      search
      options={OPTIONS}
      isTriggerChangeOnOptionClick
    />
  );
};
