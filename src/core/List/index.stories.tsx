import { Args, Story } from "@storybook/react";
import React from "react";
import ListItem from "../ListItem";
import ListSubheader from "../ListSubheader";
import List from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <List
      subheader={<ListSubheader disableSticky>This is a list</ListSubheader>}
      {...props}
    >
      <ListItem fontSize="l" marginBottom="s">
        fontSize=l marginBottom=s
      </ListItem>
      <ListItem fontSize="m" marginBottom="s">
        fontSize=m marginBottom=s
      </ListItem>
      <ListItem fontSize="s" marginBottom="xs">
        fontSize=s marginBottom=xs
      </ListItem>
      <ListItem fontSize="s" marginBottom="xs">
        fontSize=s marginBottom=xs
      </ListItem>
      <ListItem fontSize="xs" marginBottom="xs">
        fontSize=xs marginBottom=xs
      </ListItem>
      <ListItem fontSize="xxs" marginBottom="xs">
        fontSize=xxs marginBottom=xs
      </ListItem>
      <ListItem fontSize="xxxs" marginBottom="xxs">
        fontSize=xxxs marginBottom=xxs
      </ListItem>
      <ListItem fontSize="m" marginBottom="s">
        <div style={{ width: "200px" }}>
          Really long list item here to make it wrap, so we can see if the
          bullet is top aligned
        </div>
      </ListItem>
    </List>
  );
};

export default {
  component: Demo,
  title: "List",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};
