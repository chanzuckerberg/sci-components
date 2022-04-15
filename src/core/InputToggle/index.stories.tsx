import { Args, Story } from "@storybook/react";
import React from "react";
import InputToggle from "./index";

const Demo = (props: Args): JSX.Element => {
  return <InputToggle {...props} />;
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "InputToggle",
};

// const LivePreviewDemo = (props: Args): JSX.Element => {
//   return <InputToggle {...props} id="togglePreview" sdsStage="off" />;
// };

// const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

// export const LivePreview = LivePreviewTemplate.bind({});

// LivePreview.parameters = {
//   snapshot: {
//     skip: true,
//   },
// };

// const TestDemo = (props: Args): JSX.Element => {
//   return (
//     <InputToggle
//       {...props}
//       id="test-toggle"
//     />
//   );
// };

// const TestTemplate: Story = (args) => <TestDemo {...args} />;

// export const Test = TestTemplate.bind({});
