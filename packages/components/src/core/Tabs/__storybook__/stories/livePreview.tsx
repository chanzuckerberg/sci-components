import { Args } from "@storybook/react";
import { TABS_LIVE_PREVIEW_WRAPPER_STYLES } from "../constants";
import { Tabs } from "./default";
import { noop } from "src/common/utils";

export function LivePreviewDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    style: { width: "150px" },
  };

  return (
    <div style={TABS_LIVE_PREVIEW_WRAPPER_STYLES as React.CSSProperties}>
      <div>
        <Tabs
          onChange={noop}
          sdsSize="large"
          items={[{ label: "One" }, { label: "Two" }]}
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Tabs
          onChange={noop}
          sdsSize="large"
          items={[
            { count: 0, label: "One" },
            { count: 0, label: "Two" },
          ]}
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Tabs
          sdsSize="small"
          onChange={noop}
          items={[{ label: "One" }, { label: "Two" }]}
          underlined
          {...finalProps}
        />
      </div>
      <div>
        <Tabs
          sdsSize="small"
          onChange={noop}
          items={[
            { count: 0, label: "One" },
            { count: 0, label: "Two" },
          ]}
          underlined
          {...finalProps}
        />
      </div>
    </div>
  );
}
