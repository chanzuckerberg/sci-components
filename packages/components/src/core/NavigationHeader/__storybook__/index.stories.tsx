import { Args, Meta } from "@storybook/react";
import { NavigationHeader } from "./stories/default";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { TAG_PANEL_COLORS } from "src/core/Tag/__storybook__/constants";
import {
  NAVIGATION_HEADER_EXCLUDED_CONTROLS,
  NAVIGATION_HEADER_LOGO_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    buttons: {
      control: { type: "object" },
      description: "List of buttons to display in the navigation header.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    hasInvertedStyle: {
      control: { type: "boolean" },
    },
    logo: {
      control: {
        labels: ["Logo Placeholder", "Empty"],
        type: "select",
      },
      mapping: NAVIGATION_HEADER_LOGO_OPTIONS,
      options: Object.keys(NAVIGATION_HEADER_LOGO_OPTIONS),
    },
    logoLinkComponent: {
      control: {
        type: "text",
      },
    },
    logoUrl: {
      control: { type: "text" },
    },
    position: {
      control: { type: "select" },
      options: ["absolute", "fixed", "relative", "static", "sticky"],
    },
    primaryNavItems: {
      control: { type: "object" },
    },
    primaryNavPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    scrollElevation: {
      control: { type: "boolean" },
      description: "Elevate the navigation header when the user scrolls.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    searchProps: {
      control: { type: "object" },
    },
    secondaryNavItems: {
      control: { type: "object" },
    },
    showSearch: {
      control: { type: "boolean" },
    },
    tag: {
      control: { type: "text" },
    },
    tagColor: {
      control: {
        labels: [
          "info",
          "positive",
          "notice",
          "negative",
          "beta",
          "Custom colors for Label, Background, Icon",
        ],
        type: "select",
      },
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
    },
    title: {
      control: { type: "text" },
    },
  },
  component: NavigationHeader,
  parameters: {
    badges: [BADGE.BETA],
  },
  title: "Components/NavigationHeader [beta]",
} as Meta;

export const Default = {
  args: {
    buttons: [
      { children: "Primary", sdsType: "primary" },
      {
        children: "Secondary",
        sdsType: "secondary",
      },
      {
        children: "My Profile",
        icon: "Person",
        onClick: () => alert("clicked on my profile"),
      },
    ],
    hasInvertedStyle: false,
    logo: NAVIGATION_HEADER_LOGO_OPTIONS[0],
    logoUrl: "https://chanzuckerberg.com",
    position: "sticky",
    primaryNavItems: [
      {
        key: "1",
        label: "Primary",
      },
      {
        key: "2",
        label: "Primary",
        tag: "Beta",
        tagColor: "beta",
      },
    ],
    scrollElevation: true,
    secondaryNavItems: [
      {
        itemType: "dropdown",
        items: [
          {
            label: "Item 1",
            onClick: () => alert("clicked on item 1"),
          },
          { label: "Item 2", onClick: () => alert("clicked on item 2") },
        ],
        label: "Secondary",
      },
      {
        itemType: "text",
        label: "Secondary",
        onClick: () => alert("clicked on secondary"),
      },
    ],
    showSearch: true,
    tag: "Beta",
    tagColor: "beta",
  },
  parameters: {
    controls: {
      expanded: true,
    },
    layout: "fullscreen",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: NAVIGATION_HEADER_EXCLUDED_CONTROLS,
    },
    layout: "fullscreen",
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
