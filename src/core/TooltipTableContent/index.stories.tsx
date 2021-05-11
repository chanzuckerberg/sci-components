import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipTableContent from "./index";

const rows = [
  { label: "Harley Thomas", value: 1 },
  { label: "Janeece Pourroy", value: 2 },
  { label: "Jennifer Tang", value: 3 },
  { label: "Jonathan Sheu", value: 4 },
  { label: "Julie Han", value: 5 },
  { label: "Katrina Kalantar", value: 6 },
  { label: "Omar Valenzuela", value: 7 },
  { label: "Seve Badajoz", value: 8 },
  { label: "Tiago Carvalho", value: 9 },
  { label: "Timmy Huang", value: 10 },
];

const data = [
  {
    dataRows: rows.slice(0, 5),
    label: "Section 1",
  },
  {
    dataRows: rows.slice(5, 10),
    label: "Section 2",
  },
];

const Demo = (props: Args): JSX.Element => {
  return <TooltipTableContent {...props} />;
};

export default {
  component: Demo,
  title: "TooltipTableContent",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  alert,
  data,
};
