import { Args, Meta } from "@storybook/react";
import React from "react";
import AccordionDetails from "./components/AccordionDetails";
import AccordionHeader from "./components/AccordionHeader";
import RawAccordion from "./index";

const Accordion = (props: Args): JSX.Element => {
  const { id, subtitle, useDivider, togglePosition } = props;
  return (
    <RawAccordion
      id={id}
      useDivider={useDivider}
      togglePosition={togglePosition}
      {...props}
    >
      <AccordionHeader id={`${id}-header`} subtitle={subtitle}>
        Accordion Header
      </AccordionHeader>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </RawAccordion>
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

// Default

export const Default = {
  args: {
    togglePosition: "right",
  },
};

// LivePreview

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(4, 200px)",
};

function LivePreviewDemo(props: Args): JSX.Element {
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

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  arg: {
    id: "test-story",
    togglePosition: "right",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => (
    <Accordion {...props} data-testid="accordion" />
  ),
};
