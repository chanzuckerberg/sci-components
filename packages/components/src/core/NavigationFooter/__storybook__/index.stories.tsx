import { Args, Meta } from "@storybook/react-vite";
import { NavigationFooter } from "./stories/default";
import {
  ExampleLogo,
  NAVIGATION_FOOTER_EXCLUDED_CONTROLS,
  NAVIGATION_FOOTER_LOGO_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";
import { TAG_PANEL_COLORS } from "@components/src/core/Tag/__storybook__/constants";
import { NavigationFooterNavItem } from "../NavigationFooter.types";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: { type: INLINE_RADIO },
      description: "The background appearance of the navigation header.",
      options: ["matchBackground", "dark"],
      table: {
        defaultValue: {
          summary: "matchBackground",
        },
      },
    },
    images: {
      control: { type: "object" },
      description:
        "An array of images displayed in the footer. Each item includes an image, optional link URL, and component.",
    },
    logo: {
      control: {
        labels: { placeholder: "Logo Placeholder", none: "None" },
        type: "select",
      },
      description:
        "The logo displayed in the footer. Can be any valid React node such as an image, icon, or SVG.",
      mapping: NAVIGATION_FOOTER_LOGO_OPTIONS,
      options: Object.keys(NAVIGATION_FOOTER_LOGO_OPTIONS),
    },
    logoUrl: {
      control: { type: "text" },
      description: "If provided, clicking the logo will navigate to this URL.",
    },
    navItems: {
      control: { type: "object" },
      description:
        "The prominent links on the top row, next to the logo. They are headings, not body text, and get no dividers.",
    },
    navLinks: {
      control: { type: "object" },
      description:
        "The smaller links on the bottom row, drawn in one line with dividers between them.",
    },
    tag: {
      control: { type: "text" },
      description: "A small label displayed next to the title.",
    },
    tagColor: {
      control: {
        labels: { custom: "Custom colors for Label, Background, Icon" },
        type: "select",
      },
      description:
        "The Tag's color. A tuple sets the label, background, and icon colors by hand.",
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
    },
    title: {
      control: { type: "text" },
      description: "The main title displayed in the footer.",
    },
  },
  component: NavigationFooter,
  title: "Components/NavigationFooter",
} as Meta;

export const Default = {
  args: {
    backgroundAppearance: "matchBackground",
    images: [
      {
        image: (
          <ExampleLogo width={64} height={24}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/1",
      },
      {
        image: (
          <ExampleLogo width={64} height={24}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/2",
      },
    ],
    logo: NAVIGATION_FOOTER_LOGO_OPTIONS.placeholder,
    logoUrl: "https://example.com",
    navItems: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      component: "a",
      label: `Nav Item`,
      linkProps: {
        target: "_blank",
      },
      url: `https://example.com/nav/${idx + 1}`,
    })),
    navLinks: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Link Item`,
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
