import { Args, Meta } from "@storybook/react-vite";
import { IntentMessageDemo } from "./stories/default";
import { CheckboxDemo } from "./stories/checkbox";
import { PasswordDemo } from "./stories/password";
import { ScreenshotTestDemo } from "./stories/screenshot";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

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
      description:
        "If true, displays messages in order of severity (negative, notice, positive).",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    border: {
      control: { type: "boolean" },
      description: "If true, displays a colored border on the left.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    messages: {
      control: { type: "object" },
      description: "Array of messages to display.",
      table: {
        defaultValue: { summary: "[]" },
      },
    },
    orderBy: {
      control: { type: "object" },
      description:
        "Array defining a custom severity order. It sets the sort order when autoOrder is true, and decides which intent colors the border either way.",
      table: {
        defaultValue: { summary: '["negative", "notice", "positive"]' },
      },
    },
  },
  component: IntentMessageDemo,
  title: "Components/IntentMessage",
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
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
