import { Args, Story } from "@storybook/react";
import React from "react";
import AccordionDetails from "./components/AccordionDetails";
import AccordionHeader from "./components/AccordionHeader";
import Accordion from "./index";

const Template: Story = (props: Args) => {
  const { id, subtitle, useDivider } = props;
  return (
    <Accordion id={id} useDivider={useDivider}>
      <AccordionHeader id={id} subtitle={subtitle}>
        TEST
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
};

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
