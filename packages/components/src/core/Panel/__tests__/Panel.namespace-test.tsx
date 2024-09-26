import React from "react";
import { Panel, PanelProps } from "@czi-sds/components";
import { noop } from "src/common/utils";

const PanelNameSpaceTest = (props: PanelProps) => {
  return (
    <Panel
      sdsType="overlay"
      width="400px"
      position="left"
      headerComponent={<p>Header</p>}
      closeButtonComponent={<button>Close</button>}
      closeButtonOnClick={noop}
    >
      This is a Basic Panel!
    </Panel>
  );
};
