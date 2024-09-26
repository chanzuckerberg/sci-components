import { Panel, PanelProps } from "@czi-sds/components";
import React from "react";
import { noop } from "src/common/utils";

const NotificationNameSpaceTest = (props: PanelProps) => {
  return (
    <Panel sdsType="basic" width="400px" position="left">
      This is a Basic Panel!
    </Panel>
  );
};
