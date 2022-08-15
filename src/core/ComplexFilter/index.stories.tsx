import { Args, Story } from "@storybook/react";
import React from "react";
import { noop } from "src/common/utils";
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
};

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

// From https://github.com/abdonrd/github-labels
const GITHUB_LABELS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
  {
    color: "#b60205",
    description: "",
    name: "priority: critical",
  },
  {
    color: "#d93f0b",
    description: "",
    name: "priority: high",
  },
  {
    color: "#0e8a16",
    description: "",
    name: "priority: low",
  },
  {
    color: "#fbca04",
    description: "",
    name: "priority: medium",
  },
  {
    color: "#fec1c1",
    description: "",
    name: "status: can't reproduce",
  },
  {
    color: "#215cea",
    description: "",
    name: "status: confirmed",
  },
  {
    color: "#cfd3d7",
    description: "This issue or pull request already exists",
    name: "status: duplicate",
  },
  {
    color: "#fef2c0",
    description: "",
    name: "status: needs information",
  },
  {
    color: "#eeeeee",
    description: "This will not be worked on",
    name: "status: wont do/fix",
  },
  {
    color: "#d73a4a",
    description: "Something isn't working",
    name: "type: bug",
  },
  {
    color: "#d4c5f9",
    description: "",
    name: "type: discussion",
  },
  {
    color: "#006b75",
    description: "",
    name: "type: documentation",
  },
  {
    color: "#84b6eb",
    description: "",
    name: "type: enhancement",
  },
  {
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks",
    name: "type: epic",
  },
  {
    color: "#fbca04",
    description: "New feature or request",
    name: "type: feature request",
  },
  {
    color: "#d876e3",
    description: "Further information is requested",
    name: "type: question",
  },
];

const LIVE_PREVIEW_OPTIONS = [
  { name: "Filter Item 1" },
  { name: "Filter Item 2" },
  { name: "Filter Item 3" },
];
