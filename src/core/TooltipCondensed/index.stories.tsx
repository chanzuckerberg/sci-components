import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipCondensed from "./index";

const Demo = (props: Args): JSX.Element => {
  const { title, indicator } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <TooltipCondensed indicator={indicator} title={title} {...props}>
          <InfoOutlinedIcon data-testid="tooltip-hover" />
        </TooltipCondensed>
      </div>
    </div>
  );
};

export default {
  argTypes: {
    indicator: {
      control: { type: "boolean" },
    },
    indicatorColor: {
      control: { type: "color" },
    },
  },
  component: Demo,
  title: "TooltipCondensed",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  title: "Label",
};

const TestTemplate: Story = (args) => <Demo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  title: "Test",
};
