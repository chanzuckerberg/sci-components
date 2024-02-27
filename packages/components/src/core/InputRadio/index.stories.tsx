import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import RawInputRadio from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const InputRadio = (props: Args): JSX.Element => {
  const { caption, label, ...rest } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <RawInputRadio caption={caption} label={label} value="demo" {...rest} />
    </RadioGroup>
  );
};

export default {
  argTypes: {
    caption: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
    },
    stage: {
      control: {
        type: "radio",
      },
      options: ["checked", "unchecked"],
    },
  },
  component: InputRadio,
  parameters: {
    badges: [BADGE.BETA],
  },
  title: "Components/Inputs/InputRadio [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    disabled: false,
    intent: "default",
    label: "Label",
  },
};

// Live Preview

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(3, 180px)",
};

const CustomFormLabel = (props: Args): JSX.Element => {
  const { children } = props;

  return <FormLabel sx={{ mb: "12px" }}>{children}</FormLabel>;
};

const LivePreviewTemplate = (): JSX.Element => {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <FormControl>
        <CustomFormLabel>No Labels or Captions</CustomFormLabel>
        <RadioGroup name="input-radio-group-no-labels" defaultValue={1}>
          <RawInputRadio value="1" />
          <RawInputRadio value="2" intent="warning" />
          <RawInputRadio value="3" intent="error" />
          <RawInputRadio value="4" disabled />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels</CustomFormLabel>
        <RadioGroup
          title="With Labels/Captions"
          aria-labelledby="demo-input-radio-group-labels"
          defaultValue="demo1"
          name="input-radio-group"
        >
          <RawInputRadio label="Default" value="1" />
          <RawInputRadio label="Warning" value="2" intent="warning" />
          <RawInputRadio label="Error" value="3" intent="error" />
          <RawInputRadio label="Disabled" value="4" disabled />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels and Captions</CustomFormLabel>
        <RadioGroup
          title="With Labels/Captions"
          aria-labelledby="demo-input-radio-group-labels-captions"
          defaultValue="demo1"
          name="input-radio-group"
        >
          <RawInputRadio label="Default" caption="Caption I" value="1" />
          <RawInputRadio
            label="Warning"
            caption="Caption II"
            value="2"
            intent="warning"
          />
          <RawInputRadio
            label="Error"
            caption="Caption II"
            value="3"
            intent="error"
          />
          <RawInputRadio
            disabled
            label="Disabled"
            caption="Caption IV"
            value="4"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export const LivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    axe: {
      disabledRules: ["label"],
    },
    controls: {
      exclude: ["label", "caption", "disabled", "intent", "stage"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewTemplate {...args} />,
};

// Test

const TestTemplate = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <div>
      <RadioGroup
        aria-labelledby="demo-input-radio-group-label"
        defaultValue="demo1"
        name="input-radio-group"
        data-testid="radioButtonGroup"
      >
        <RawInputRadio data-testid="inputRadio" label={label} value="demo1" />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label={label}
          value="demo2"
        />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label={label}
          value="demo3"
        />
      </RadioGroup>
    </div>
  );
};

export const Test = {
  args: {
    label: "Test Label",
  },
  parameters: {
    controls: {
      exclude: ["label", "caption", "disabled", "intent", "stage"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestTemplate {...args} />,
};
