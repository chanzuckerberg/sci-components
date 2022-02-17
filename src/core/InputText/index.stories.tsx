import { FormControl } from "@material-ui/core";
import { Args, Story } from "@storybook/react";
import React from "react";
import InputText from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <FormControl>
      <InputText id="test" />
    </FormControl>
  );
};

export default {
  component: Demo,
  title: "InputText",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});
