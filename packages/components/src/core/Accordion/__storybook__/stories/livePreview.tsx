import { Args } from "@storybook/react";
import { Accordion } from "./default";

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(4, 200px)",
};

export function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <Accordion
        id="accordion-1"
        togglePosition="right"
        useDivider
        {...props}
      />
      <Accordion
        id="accordion-2"
        togglePosition="right"
        subtitle="Optional Subtitle"
        useDivider
        {...props}
      />
      <Accordion id="accordion-3" togglePosition="left" useDivider {...props} />
      <Accordion
        id="accordion-4"
        togglePosition="left"
        subtitle="Optional Subtitle"
        useDivider
        {...props}
      />
    </div>
  );
}
