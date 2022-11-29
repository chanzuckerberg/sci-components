import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import AccordionDetails from "./components/AccordionDetails";
import AccordionHeader from "./components/AccordionHeader";
import Accordion from "./index";

const Template: Story = (props: Args) => {
  const { id, subtitle, useDivider, togglePosition } = props;
  return (
    <Accordion id={id} useDivider={useDivider} togglePosition={togglePosition}>
      <AccordionHeader id={id} subtitle={subtitle}>
        Accordion Header
      </AccordionHeader>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
};

export default {
  argTypes: {
    id: {
      control: { type: "text" },
      required: true,
    },
    subtitle: {
      control: { type: "text" },
    },
    togglePosition: {
      control: { type: "select" },
      options: ["right", "left"],
    },
    useDivider: {
      control: { type: "boolean" },
    },
  },
  component: Accordion,
  title: "Accordion",
} as Meta;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  id: "test-story",
  togglePosition: "right",
};

export const Test = Template.bind({});

Test.args = {
  id: "test-story",
  togglePosition: "right",
};

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(4, 200px)",
};

// LivePreview
function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <Template id="accordion-1" togglePosition="right" useDivider {...props} />
      <Template
        id="accordion-2"
        togglePosition="right"
        subtitle="Optional Subtitle"
        useDivider
        {...props}
      />
      <Template id="accordion-3" togglePosition="left" useDivider {...props} />
      <Template
        id="accordion-4"
        togglePosition="left"
        subtitle="Optional Subtitle"
        useDivider
        {...props}
      />
    </div>
  );
}

const LivePreviewTemplate: Story = (args: Args) => (
  <LivePreviewDemo {...args} />
);

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};
