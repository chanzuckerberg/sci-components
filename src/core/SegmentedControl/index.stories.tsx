import { Meta, Story } from "@storybook/react";
import React from "react";
import SegmentedControl from "./index";

const Demo = () => {
  const buttonDefinition = [
    { iconName: "barChartHorizontal3", tooltipText: "test tooltip 1" },
    { iconName: "eyeOpen", tooltipText: "test tooltip 2" },
    { iconName: "lock", tooltipText: "test tooltip 3" },
  ];
  return (
    <SegmentedControl buttonDefinition={buttonDefinition}></SegmentedControl>
  );
};

export default {
  component: Demo,
  title: "SegmentedControl",
} as Meta;

const Template: Story = () => <Demo />;

export const Default = Template.bind({});

// const Template: Story = (props) => {
//     const {
//     } = props;

//     return ();
// };

// // Default
// export const Default = Template.bind({});

// Default.args = {

// };

// Default.parameters = {
//     snapshot: {
//       skip: true,
//     },
// };

// LivePreview

// export const LivePreview = LivePreviewTemplate.bind({});

// Test

// export const Test = TestTemplate.bind({});
