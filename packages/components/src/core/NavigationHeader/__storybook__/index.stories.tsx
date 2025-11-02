import { Args, Meta } from "@storybook/react-webpack5";
import { NavigationHeader } from "./stories/default";
import { TAG_PANEL_COLORS } from "src/core/Tag/__storybook__/constants";
import {
  NAVIGATION_HEADER_EXCLUDED_CONTROLS,
  NAVIGATION_HEADER_LOGO_OPTIONS,
  PRODUCTS,
  SERVICES,
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
    menuProps: {
      control: { type: "object" },
      description: "Props for the menu component.",
      table: {
        defaultValue: {
          summary: "-",
        },
      },
    },
    backgroundAppearance: {
      control: { type: "inline-radio" },
      description: "The background appearance of the navigation header.",
      options: ["matchBackground", "dark"],
      table: {
        defaultValue: {
          summary: "matchBackground",
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
    sdsStyle: {
      control: { type: "inline-radio" },
      description: "Style of the navigation header.",
      options: ["dropdown", "drawer"],
      table: {
        defaultValue: {
          summary: "dropdown",
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
      { children: "Label", sdsType: "primary" },
      {
        children: "Label",
        sdsType: "secondary",
      },
      {
        children: "Label",
        icon: "Person",
        onClick: () => alert("clicked on my profile"),
      },
    ],
    menuProps: {
      disablePortal: true,
      disableScrollLock: true,
    },
    backgroundAppearance: "matchBackground",
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
        onClick: () => console.log("You clicked on a Text PrimaryNavItem!"),
        tag: "Tag",
        tagColor: "beta",
      },
      {
        itemType: "dropdown",
        items: [
          {
            component: "a",
            href: "https://www.chanzuckerberg.com",
            label: "Go to CZI home page",
          },
          {
            label: "Show an Alert!",
            onClick: () => alert("You clicked on a dropdown menu item!"),
          },
        ],
        key: "3",
        label: "Primary",
        onClick: () => console.log("You clicked on a Dropdown PrimaryNavItem!"),
      },
    ],
    scrollElevation: true,
    secondaryNavItems: [
      {
        itemType: "dropdown",
        items: [
          {
            component: "a",
            href: "https://www.chanzuckerberg.com",
            label: "Go to CZI home page",
            target: "_blank",
          },
          {
            label: "Show an Alert!",
            onClick: () => alert("You clicked on a dropdown item!"),
          },
        ],
        label: "Secondary",
      },
      {
        itemType: "text",
        label: "Secondary",
        onClick: () => alert("clicked on secondary"),
        tag: "2",
        tagColor: "notice",
      },
    ],
    showSearch: true,
    tag: "Tag",
    tagColor: "beta",
    title: "Title",
  },
  parameters: {
    controls: {
      expanded: true,
    },
    layout: "fullscreen",
  },
};

// Dropdown with Sections Demo

export const DropdownWithSections = {
  args: {
    buttons: [
      {
        children: "Sing in",
        sdsType: "secondary",
      },
      {
        children: "My Profile",
        icon: "Person",
        onClick: () => alert("clicked on my profile"),
      },
    ],
    menuProps: {
      disablePortal: true,
      disableScrollLock: true,
    },
    primaryNavItems: [
      {
        itemType: "text",
        key: "home",
        label: "Home",
        onClick: () => console.log("Home clicked"),
      },
      {
        itemType: "dropdown",
        items: PRODUCTS,
        key: "products",
        label: "Products",
        onClick: () => console.log("Products dropdown clicked"),
      },
      {
        itemType: "dropdown",
        items: SERVICES,
        key: "services",
        label: "Services",
        onClick: () => console.log("Services dropdown clicked"),
      },
      {
        itemType: "text",
        key: "about",
        label: "About",
        onClick: () => console.log("About clicked"),
      },
    ],
    scrollElevation: true,
    secondaryNavItems: [
      {
        itemType: "dropdown",
        items: PRODUCTS,
        key: "products",
        label: "New Products",
        onClick: () => console.log("New Products dropdown clicked"),
      },
    ],
    showSearch: true,
    title: "My App",
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
