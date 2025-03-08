import { Args, Meta } from "@storybook/react";
import { NavigationHeader } from "./stories/default";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { TAG_PANEL_COLORS } from "src/core/Tag/__storybook__/constants";
import {
  NAVIGATION_HEADER_EXCLUDED_CONTROLS,
  NAVIGATION_HEADER_LOGO_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";
import { Theme } from "src/core/styles";
import { ThemeProvider } from "@mui/material";

export default {
  argTypes: {
    buttons: {
      control: { type: "object" },
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
    logoUrl: {
      control: { type: "text" },
    },
    primaryNavItems: {
      control: { type: "object" },
    },
    primaryNavPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
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
      { children: "Secondary", sdsType: "secondary" },
      { children: "My Profile", icon: "Person" },
    ],
    hasInvertedStyle: false,
    logo: NAVIGATION_HEADER_LOGO_OPTIONS[0],
    logoUrl: "https://chanzuckerberg.com",
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
    title: "Logo Name",
  },
  parameters: { layout: "fullscreen" },
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
  render: (args: Args) => (
    <ThemeProvider theme={Theme("light")}>
      <TestDemo {...args} />
    </ThemeProvider>
  ),
};
