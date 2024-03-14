import { Args } from "@storybook/react";
import { TABS_LIVE_PREVIEW_WRAPPER_STYLES } from "../constants";
import { Tabs } from "./default";
import { noop } from "src/common/utils";
import Tag from "src/core/Tag";
import { StyledTabCountWrapper } from "../style";

export function TestDemo(props: Args): JSX.Element {
  const finalProps = {
    ...props,
    "data-testid": "tabs",
    style: { width: "400px" },
  };

  return (
    <div>
      <div style={TABS_LIVE_PREVIEW_WRAPPER_STYLES as React.CSSProperties}>
        <div>
          <h4>Default</h4>
          <Tabs
            items={[{ count: 123, label: "Tab One" }, { label: "Tab Two" }]}
            onChange={noop}
            {...finalProps}
          />
        </div>
        <div>
          <h4>Small</h4>
          <Tabs
            items={[{ count: 123, label: "Tab One" }, { label: "Tab Two" }]}
            onChange={noop}
            sdsSize="small"
            {...finalProps}
          />
        </div>
        <div>
          <h4>Underlined</h4>
          <Tabs
            onChange={noop}
            items={[{ count: 123, label: "Tab One" }, { label: "Tab Two" }]}
            underlined
            {...finalProps}
          />
        </div>
      </div>
      <div style={TABS_LIVE_PREVIEW_WRAPPER_STYLES}>
        <div>
          <h4>Label with count</h4>
          <div>
            <Tabs
              onChange={noop}
              sdsSize="large"
              items={[
                { count: <BetaTagWithCount />, label: "One" },
                { label: "Two" },
              ]}
              underlined
              {...finalProps}
              style={{ width: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BetaTagWithCount() {
  return (
    <>
      <StyledTabCountWrapper>123</StyledTabCountWrapper>
      <Tag
        label="BETA"
        hover={false}
        color="beta"
        sdsStyle="rounded"
        sdsType="secondary"
      />
    </>
  );
}
