import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import { noop } from "src/common/utils";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import ComplexFilter from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <ComplexFilter
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
    />
  );
};

const onChangeOptions = [
  noop,
  (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
];

export default {
  argTypes: {
    isTriggerChangeOnOptionClick: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    onChange: {
      control: {
        labels: ["Noop", "console.log(value)"],
        type: "select",
      },
      mapping: onChangeOptions,
      options: Object.keys(onChangeOptions),
    },
    search: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Demo,
  title: "ComplexFilter",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  isTriggerChangeOnOptionClick: false,
  label: "Click Target",
  multiple: true,
  onChange: onChangeOptions[1],
  search: true,
};

// Live preview

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: 30,
  gridTemplateColumns: "repeat(3, min-content)",
};

const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1/1/2/2" }}>
        <ComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple={false}
          search={false}
          onChange={noop}
          options={LIVE_PREVIEW_OPTIONS}
        />
      </div>
      <div style={{ gridArea: "1/2/2/3" }}>
        <ComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple
          search={false}
          onChange={noop}
          options={LIVE_PREVIEW_OPTIONS}
        />
      </div>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  keepSearchOnSelect: true,
  multiple: false,
  search: false,
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test

// Test Story

const TestDemo = (props: Args): JSX.Element => {
  return (
    <ComplexFilter
      data-testid="complex-filter"
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
    />
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  snapshot: {
    skip: true,
  },
};

const LIVE_PREVIEW_OPTIONS = [
  { name: "Filter Item 1" },
  { name: "Filter Item 2" },
  { name: "Filter Item 3" },
];
