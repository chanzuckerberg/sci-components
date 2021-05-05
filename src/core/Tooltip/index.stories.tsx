import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipInfo from "./index";

const tooltipContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Demo = (props: Args): JSX.Element => {
  return (
    <TooltipInfo title={tooltipContent} {...props}>
      <InfoOutlinedIcon />
    </TooltipInfo>
  );
};

export default {
  component: Demo,
  title: "Tooltip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Info = Template.bind({});

Info.args = {};
