import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipTableContent from "./index";

function createDataRow(label: any, value: any) {
  return { label, value };
}

const rows = [
  createDataRow("Frozen yoghurt", 159),
  createDataRow("Ice cream sandwich", 237),
  createDataRow("Eclair", 262),
  createDataRow("Cupcake", 305),
  createDataRow("Gingerbread", 356),
];

const data = [
  {
    label: "Section 1",
    dataRows: rows,
  },
  {
    label: "Section 2",
    dataRows: rows,
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
  data: data,
  alert: alert,
};
