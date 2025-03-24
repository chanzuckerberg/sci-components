import { Args, Meta } from "@storybook/react";
import { NavigationHeader } from "./stories/default";
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
      description: "Invert the colors of the navigation header.",
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    logo: {
      control: {
        labels: ["Logo Placeholder", "Empty"],
        type: "select",
      },
      description: "The logo to display in the navigation header.",
      mapping: NAVIGATION_HEADER_LOGO_OPTIONS,
      options: Object.keys(NAVIGATION_HEADER_LOGO_OPTIONS),
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    logoLinkComponent: {
      control: {
        type: "text",
      },
      description: "The link component to display in the navigation header.",
      table: {
        defaultValue: {
          summary: "a",
        },
      },
    },
    logoUrl: {
      control: { type: "text" },
      description: "The URL of the logo.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    position: {
      control: { type: "select" },
      description: "Position of the navigation header.",
      options: ["absolute", "fixed", "relative", "static", "sticky"],
      table: {
        defaultValue: {
          summary: "sticky",
        },
      },
    },
    primaryNavItems: {
      control: { type: "object" },
      description:
        "List of primary navigation items to display in the navigation header.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    primaryNavPosition: {
      control: { type: "radio" },
      description: "Position of the primary navigation items.",
      options: ["left", "right"],
      table: {
        defaultValue: {
          summary: "left",
        },
      },
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
      description: "Search props for the navigation header.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    secondaryNavItems: {
      control: { type: "object" },
      description:
        "List of secondary navigation items to display in the navigation header.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    showSearch: {
      control: { type: "boolean" },
      description: "Show the search input in the navigation header.",
      table: {
        defaultValue: {
          summary: "true",
        },
      },
    },
    tag: {
      control: { type: "text" },
      description:
        "The tag to display in the navigation header next to the logo.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
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
      description: "Color of the tag.",
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    title: {
      control: { type: "text" },
      description: "Title to display in the navigation header.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
  },
  component: NavigationHeader,
  title: "Components/NavigationHeader",
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
        component: "a",
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
