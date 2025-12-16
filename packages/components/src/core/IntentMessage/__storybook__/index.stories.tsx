import { Args, Meta } from "@storybook/react-webpack5";
import { IntentMessageDemo } from "./stories/default";
import { CheckboxDemo } from "./stories/checkbox";
import { PasswordDemo } from "./stories/password";
import { ScreenshotTestDemo } from "./stories/screenshot";
import CustomSvgIcon from "src/common/storybook/svg/customSvgIcon";

const defaultMessages = [
  {
    intent: "negative",
    text: "This is a negative message",
  },
  { intent: "notice", text: "This is a notice message" },
  { intent: "positive", text: "This is a positive message" },
  {
    intent: "positive",
    text: "This is a very long positive message supposed to be wrapped into multiple lines.",
  },
  { intent: "notice", text: "With custom SDS icon", icon: "Github" },
  {
    intent: "positive",
    text: "With custom icon",
    icon: <CustomSvgIcon sx={{ height: 12, width: 12 }} />,
  },
];

export default {
  argTypes: {
    autoOrder: {
      control: { type: "boolean" },
      defaultValue: { summary: "true" },
      description:
        "If true, displays messages in order of severity (negative, notice, positive).",
    },
    border: {
      control: { type: "boolean" },
      defaultValue: { summary: "false" },
      description: "If true, displays a colored border on the left.",
    },
    messages: {
      control: { type: "object" },
      defaultValue: defaultMessages,
      description: "Array of messages to display.",
    },
    orderBy: {
      control: { type: "object" },
      defaultValue: { summary: '["negative", "notice", "positive"]' },
      description:
        "Array defining custom priority order for sorting messages. Only used if autoOrder is true.",
    },
  },
  component: IntentMessageDemo,
  title: "Components/IntentMessage",
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
  },
} as Meta;

export const Default = {
  args: {
    autoOrder: true,
    border: true,
    messages: defaultMessages,
    orderBy: ["negative", "notice", "positive"],
  },
};

export const Checkbox = {
  args: {
    border: true,
    messages: [defaultMessages[0]],
  },
  render: (args: Args) => <CheckboxDemo {...args} />,
};

export const Password = {
  args: {
    border: true,
    messages: [defaultMessages[0]],
  },
  render: (args: Args) => <PasswordDemo {...args} />,
};

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: ["autoOrder", "border", "messages", "orderBy"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: () => <ScreenshotTestDemo />,
};

export const Test = {
  args: {
    border: true,
    messages: defaultMessages,
  },
  parameters: {
    controls: {
      exclude: ["autoOrder", "border", "messages", "orderBy"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <IntentMessageDemo {...args} data-testid="intent-message" />
  ),
};
