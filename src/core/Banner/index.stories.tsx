import { styled } from "@mui/material/styles";
import { Args, Story } from "@storybook/react";
import React from "react";
import Banner from "./index";

const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

const Demo = (props: Args): JSX.Element => {
  const { sdsType, text } = props;
  return <Banner sdsType={sdsType} text={text} {...props} />;
};

export default {
  argTypes: {
    dismissed: {
      control: { type: "boolean" },
    },
    dismissible: {
      control: { type: "boolean" },
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      required: true,
    },
    text: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Demo,
  title: "Banner",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  dismissed: false,
  dismissible: true,
  sdsType: "primary",
  text: BANNER_TEXT,
};

const StyledBanner = styled(Banner)`
  background-color: pink;
`;

const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={{ padding: "24px", width: "600px" }}>
      <Banner dismissible sdsType="primary" text={BANNER_TEXT} />
      <div style={{ height: "24px" }} />
      <Banner dismissible sdsType="secondary" text={BANNER_TEXT} />
      <div style={{ height: "24px" }} />
      <StyledBanner
        sdsType="primary"
        text="Stylable. Should have pink background color"
      />
    </div>
  );
};

export const LivePreview = LivePreviewDemo.bind({});

const TestTemplate: Story = (args) => <Demo {...args} />;

export const Test = TestTemplate.bind({});
Test.args = {
  dismissible: true,
  sdsType: "primary",
  text: "test text",
};
