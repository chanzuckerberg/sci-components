import { Args, Story } from "@storybook/react";
import * as React from "react";
import ComponentCellRaw from "./index";

const ComponentCell = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr
          style={{
            display: "block",
            maxWidth: "180px",
          }}
        >
          <ComponentCellRaw
            children={<h3 style={{ width: 100 }}> Hello World! </h3>}
            contentPosition="center"
            data-testid="ComponentCell"
            {...props}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    contentPosition: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
  },
};

const Template: Story = (args) => <ComponentCell {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};
