import { Args } from "@storybook/react";
import RawCallout from "src/core/Callout";
import CalloutTitle from "src/core/Callout/components/CalloutTitle";

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <RawCallout intent="info" {...props} style={{ width: "180px" }}>
        Title
      </RawCallout>
      <RawCallout intent="info" {...props} style={{ width: "180px" }}>
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
      <RawCallout
        intent="info"
        expandable
        sdsStage="closed"
        {...props}
        style={{ width: "180px" }}
      >
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
      <RawCallout
        intent="info"
        {...props}
        // eslint-disable-next-line no-alert
        onClose={() => alert("callout closed")}
        style={{ width: "180px" }}
      >
        <CalloutTitle>Title</CalloutTitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </RawCallout>
    </div>
  );
};
