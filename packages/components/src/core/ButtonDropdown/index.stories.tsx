import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import RawButtonDropdown from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const text = "Label";

const actions = {
  onClick: action("onClick"),
};

const iconOptions = [
  <Icon sdsIcon="download" sdsSize="l" sdsType="button" key="downloadIcon" />,
  <Icon sdsIcon="copy" sdsSize="l" sdsType="button" key="copyIcon" />,
  <Icon sdsIcon="bacteria" sdsSize="l" sdsType="button" key="bacteriaIcon" />,
];

const ButtonDropdown = (props: Args): JSX.Element => {
  return <RawButtonDropdown {...props}>{text}</RawButtonDropdown>;
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: ["Download Icon", "Copy Icon", "Bacteria Icon"],
        type: "select",
      },
      mapping: iconOptions,
      options: Object.keys(iconOptions),
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
      required: true,
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      required: true,
    },
  },
  component: ButtonDropdown,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  title: "Components/ButtonDropdown [wip]",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
    onClick: actions.onClick,
    sdsStyle: "square",
    sdsType: "primary",
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

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    icon: <Icon sdsIcon="download" sdsSize="l" sdsType="button" />,
    onClick: actions.onClick,
    sdsStyle: "rounded",
    sdsType: "primary",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <ButtonDropdown data-testid="button-dropdown" {...props}>
        {text}
      </ButtonDropdown>
    );
  },
};
