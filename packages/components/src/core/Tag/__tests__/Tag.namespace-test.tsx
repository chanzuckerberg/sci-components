import { Tag, TagProps } from "@czi-sds/components";
import { SparkleIcon } from "@phosphor-icons/react";
import React from "react";

const TagNameSpaceTest = (props: TagProps) => {
  return (
    <>
      <Tag color="accent" label="Label" sdsStyle="solid" size="medium" />
      <Tag
        color="info"
        icon={<SparkleIcon />}
        label="Label"
        sdsStyle="outline"
        size="small"
      />
      <Tag color="beta" icon={<SparkleIcon />} iconOnly label="Label" />
      <Tag
        href="https://sds.czi.design"
        label="Label"
        showLinkIcon
        target="_blank"
      />
      <Tag disabled label="Label" onClick={() => {}} />
      <Tag color={["#3b2f00", "#ffe6a0", "#b26f00"]} label="Label" />
    </>
  );
};
