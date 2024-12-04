import { Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { CALLOUT_ICON_OPTIONS, CALLOUT_SDS_STYLE_OPTIONS } from "./constants";
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
    sdsStyle: {
      control: {
        labels: ["persistent", "expandable", "dismissible"],
        type: "select",
      },
      defaultValue: { summary: "persistent" },
      description:
        "The style of the Callout determines its behavior: Persistent Callouts are always visible, Expandable Callouts can be toggled to show or hide extra content, and Dismissible Callouts can be closed by the user.",
      mapping: CALLOUT_SDS_STYLE_OPTIONS,
      options: Object.keys(CALLOUT_SDS_STYLE_OPTIONS),
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
    body: "Callout text — replace the content here and the height of the component will adjust automatically.",
    title: "The callout title goes here",
  },
};
