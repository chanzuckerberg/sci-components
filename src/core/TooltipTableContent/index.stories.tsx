import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipTableContent from "./index";

const rows = [
  { label: "Label 1", value: 1 },
  { label: "Label 2", value: 2 },
  { label: "Label 3", value: 3 },
  { label: "Label 4", value: 4 },
  { label: "Label 5 ", value: 5 },
  { label: "Label 6", value: 6 },
  { label: "Label 7", value: 7 },
  { label: "Label 8", value: 8 },
  { label: "Label 9", value: 9 },
  { label: "Label 10", value: 10 },
  { label: "Label 11", value: 11 },
  { label: "Label 12", value: 12 },
  { label: "Label 13", value: 13 },
  { label: "Label 14", value: 14 },
  { label: "Label 15", value: 15 },
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
  {
    dataRows: rows.slice(10, 15),
    label: "Section 3",
  },
];

const itemAlign = "right";
const contentAlert = null;

const Demo = (props: Args): JSX.Element => {
  return <TooltipTableContent {...props} />;
};
const alertWithLink = <p>alert with link</p>;

export default {
  argTypes: {
    contentAlert: {
      control: { type: "select" },
      options: [
        "Some values do not pass the selected filter",
        "Alert with Link",
        "none",
      ],
    },
    itemAlign: {
      control: { type: "radio" },
      options: ["right", "left"],
    },
  },
  component: Demo,
  title: "TooltipTableContent",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  contentAlert,
  data,
  itemAlign,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-start",
};

const tooltipStyleMock = {
  border: "1px solid #CCCCCC",
  boxShadow: "0 2px 4px 0 rgba(0,0,0, 0.15), 0 2px 10px 0 rgba(0,0,0, 0.15)",
  flexGrow: 1,
  maxWidth: "250px",
  padding: "6px 14px",
};

const dataWithoutLabel = [
  {
    dataRows: rows.slice(0, 5),
  },
];

const dataWithDisabledSection = [
  {
    dataRows: rows.slice(0, 5),
    label: "Section 1",
  },
  {
    dataRows: rows.slice(5, 10),
    disabled: true,
    label: "Section 2",
  },
];

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={tooltipStyleMock as React.CSSProperties}>
        <TooltipTableContent {...props} data={dataWithoutLabel} />
      </div>
      <div style={tooltipStyleMock as React.CSSProperties}>
        <TooltipTableContent {...props} data={dataWithDisabledSection} />
      </div>
      <div style={tooltipStyleMock as React.CSSProperties}>
        <TooltipTableContent {...props} data={data} />
      </div>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};
