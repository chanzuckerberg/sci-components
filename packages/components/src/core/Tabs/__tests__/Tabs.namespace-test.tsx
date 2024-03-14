import { Tab, Tabs, TabsProps } from "@czi-sds/components";
import React from "react";
import { noop } from "src/common/utils";

const TabsNameSpaceTest = (props: TabsProps) => {
  return (
    <Tabs sdsSize="large" underlined onChange={noop}>
      <Tab label="Label 1" count={1} />
      <Tab label="Label 2" count={3} />
    </Tabs>
  );
};
