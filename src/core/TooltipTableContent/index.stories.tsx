import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import Tooltip from "../Tooltip";
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
  alignItems: "stretch",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-start",
};

const tooltipStyleMock = {
  flexGrow: 1,
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={tooltipStyleMock as React.CSSProperties}>
        <Tooltip
          placement="bottom"
          title={<TooltipTableContent {...props} data={[data[0]]} />}
        >
          <InfoOutlinedIcon color="primary" fontSize="small" />
        </Tooltip>
      </div>

      <div style={tooltipStyleMock as React.CSSProperties}>
        <Tooltip
          placement="bottom"
          title={<TooltipTableContent {...props} data={[data[0], data[1]]} />}
        >
          <InfoOutlinedIcon color="primary" fontSize="small" />
        </Tooltip>
      </div>

      <div style={tooltipStyleMock as React.CSSProperties}>
        <Tooltip
          placement="bottom"
          title={<TooltipTableContent {...props} data={data} />}
        >
          <InfoOutlinedIcon color="primary" fontSize="small" />
        </Tooltip>
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
