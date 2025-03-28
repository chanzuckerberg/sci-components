import { Args, Meta } from "@storybook/react";
import { NavigationFooter } from "./stories/default";
import {
  ExampleLogo,
  NAVIGATION_FOOTER_EXCLUDED_CONTROLS,
  NAVIGATION_FOOTER_LOGO_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";
import { TAG_PANEL_COLORS } from "src/core/Tag/__storybook__/constants";
import { NavigationFooterNavItem } from "../NavigationFooter.types";

export default {
  argTypes: {
    hasInvertedStyle: {
      control: { type: "boolean" },
    },
    images: {
      control: { type: "object" },
    },
    logo: {
      control: {
        labels: ["Logo Placeholder", "None"],
        type: "select",
      },
      mapping: NAVIGATION_FOOTER_LOGO_OPTIONS,
      options: Object.keys(NAVIGATION_FOOTER_LOGO_OPTIONS),
    },
    logoUrl: {
      control: { type: "text" },
    },
    navItems: {
      control: { type: "object" },
    },
    navLinks: {
      control: { type: "object" },
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
  component: NavigationFooter,
  title: "Components/NavigationFooter",
} as Meta;

export const Default = {
  args: {
    hasInvertedStyle: false,
    images: [
      {
        image: (
          <ExampleLogo width={100} height={40}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/1",
      },
      {
        image: (
          <ExampleLogo width={100} height={40}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/2",
      },
    ],
    logo: NAVIGATION_FOOTER_LOGO_OPTIONS[0],
    logoUrl: "https://example.com",
    navItems: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      component: "a",
      label: `Nav Item ${idx + 1}`,
      linkProps: {
        target: "_blank",
      },
      url: `https://example.com/nav/${idx + 1}`,
    })),
    navLinks: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Link Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),
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
      exclude: NAVIGATION_FOOTER_EXCLUDED_CONTROLS,
    },
    layout: "fullscreen",
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
