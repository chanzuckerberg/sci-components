import { action } from "@storybook/addon-actions";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import ButtonDropdown from "./index";

const text = "Label";

const actions = {
  onClick: action("onClick"),
};

const Demo = (props: Args): JSX.Element => {
  return <ButtonDropdown {...props}>{text}</ButtonDropdown>;
};

export default {
  component: Demo,
  title: "ButtonDropdown",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "square",
  sdsType: "primary",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

// LivePreview
const livePreviewWrapperStyle = {
  display: "grid",
  gridColumnGap: 10,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(4, min-content)",
  gridTemplateRows: "repeat(2, auto)",
};

function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewWrapperStyle as React.CSSProperties}>
      <div style={{ gridArea: "1/1/2/2" }}>
        <ButtonDropdown
          sdsType="primary"
          sdsStyle="rounded"
          icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {text}
        </ButtonDropdown>
      </div>

      <div style={{ gridArea: "1/2/2/3" }}>
        <ButtonDropdown
          sdsType="secondary"
          sdsStyle="rounded"
          icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {text}
        </ButtonDropdown>
      </div>

      <div style={{ gridArea: "2/1/3/2" }}>
        <ButtonDropdown
          sdsType="primary"
          sdsStyle="square"
          icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {text}
        </ButtonDropdown>
      </div>

      <div style={{ gridArea: "2/2/3/3" }}>
        <ButtonDropdown
          sdsType="secondary"
          sdsStyle="square"
          icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {text}
        </ButtonDropdown>
      </div>
    </div>
  );
}

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  return (
    <ButtonDropdown data-testid="button-dropdown" {...props}>
      {text}
    </ButtonDropdown>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  disabled: false,
  icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
  onClick: actions.onClick,
  sdsStyle: "rounded",
  sdsType: "primary",
};
