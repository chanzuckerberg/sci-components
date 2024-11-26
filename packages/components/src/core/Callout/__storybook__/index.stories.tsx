import { Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { CALLOUT_ICON_OPTIONS, CALLOUT_ON_CLOSE_OPTIONS } from "./constants";
import { Callout } from "./stories/default";

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      defaultValue: { summary: "false" },
      description:
        "If set to a number, the callout will automatically dismiss after that many milliseconds. If set to true, the callout will automatically dismiss after 8000 milliseconds.",
      options: [true, false, 4000, 12000, 20000],
    },
    body: {
      control: { type: "text" },
      defaultValue: { summary: "-" },
      description: "The body text of the callout.",
    },
    expandable: {
      control: { type: "boolean" },
      defaultValue: { summary: "false" },
      description: "If true, the callout will be expandable.",
    },
    extraContent: {
      control: { type: "boolean" },
      defaultValue: { summary: "-" },
      description:
        "The extra content in the Callout is passed as children to the component, allowing you to add custom content to it. For Storybook purposes, a predefined example of extra content has been added to the Callout component. You can toggle this boolean to test it out. Note that this is not an actual prop on the Callout component.",
    },
    hideBody: {
      control: { type: "boolean" },
      defaultValue: { summary: "false" },
      description: "If true, the body of the callout will be hidden.",
    },
    hideTitle: {
      control: { type: "boolean" },
      defaultValue: { summary: "false" },
      description: "If true, the title of the callout will be hidden.",
    },
    icon: {
      control: {
        labels: [
          "Custom SVG Icon",
          "Custom SDS Icon",
          "SDS Icon: Book",
          "SDS Icon: Check Circle",
        ],
        type: "select",
      },
      defaultValue: { summary: "-" },
      description:
        "The icon displayed in the Callout. By default, each Callout intent is paired with a corresponding SDS icon.",
      mapping: CALLOUT_ICON_OPTIONS,
      options: Object.keys(CALLOUT_ICON_OPTIONS),
    },
    intent: {
      control: { type: "radio" },
      defaultValue: { summary: "info" },
      description: "The intent of the callout.",
      options: ["info", "negative", "positive", "notice"],
    },
    onClose: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      defaultValue: { summary: "-" },
      description:
        "If set to a function, the callout will have a close button.",
      mapping: CALLOUT_ON_CLOSE_OPTIONS,
      options: Object.keys(CALLOUT_ON_CLOSE_OPTIONS),
    },
    title: {
      control: { type: "text" },
      defaultValue: { summary: "-" },
      description: "The title of the callout.",
    },
  },
  component: Callout,
  parameters: {
    badges: [BADGE.STABLE],
    controls: {
      expanded: true,
    },
  },
  title: "Components/Callout",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    body: "Callout text—replace the content here and the height of the component will adjust automatically.",
    expandable: false,
    onClose: false,
    title: "Title",
  },
};
