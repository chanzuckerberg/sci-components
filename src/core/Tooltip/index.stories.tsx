import { css } from "@emotion/css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import Tooltip from "./index";

const tooltipContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Demo = (props: Args): JSX.Element => {
  return (
    <Tooltip {...props} title={tooltipContent}>
      <InfoOutlinedIcon />
    </Tooltip>
  );
};

export default {
  component: Demo,
  title: "Tooltip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Action = Template.bind({});

Action.args = {
  inverted: true,
};

export const Info = Template.bind({});

Info.args = {
  inverted: false,
};

export const StyledArrow = Template.bind({});

const arrow = css`
  left: 0 !important;
`;

StyledArrow.args = {
  classes: { arrow },
};
