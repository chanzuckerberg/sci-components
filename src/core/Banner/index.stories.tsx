import { styled } from "@mui/material/styles";
import { Args, Story } from "@storybook/react";
import React from "react";
import Link from "../Link";
import Banner from "./index";

const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

const Demo = (props: Args): JSX.Element => {
  const { children, sdsType } = props;
  return (
    <Banner sdsType={sdsType} {...props}>
      {children}
    </Banner>
  );
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
      <Banner dismissible sdsType="primary">
        {BANNER_TEXT}
      </Banner>
      <div style={{ height: "24px" }} />
      <Banner dismissible sdsType="secondary">
        {BANNER_TEXT}
        <div style={{ padding: 5 }} />
        <Link href="/" sdsStyle="default">
          Learn More
        </Link>
      </Banner>
      <div style={{ height: "24px" }} />
      <StyledBanner sdsType="primary">
        Stylable. Should have pink background color
      </StyledBanner>
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
