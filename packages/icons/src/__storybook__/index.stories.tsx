import { Meta } from "@storybook/react-vite";
import { ICON_NAMES, IconDemo } from "./stories/default";

export default {
  argTypes: {
    alt: {
      control: { type: "text" },
      description:
        "Renders an SVG `<title>`, which gives the icon an accessible name. Leave it off for an icon that sits beside a text label, since the label already names it.",
      table: { type: { summary: "string" } },
    },
    color: {
      control: { type: "color" },
      description:
        "Any CSS color string. Defaults to `currentColor`, so an icon with no color of its own follows the text color around it.",
      table: {
        defaultValue: { summary: '"currentColor"' },
        type: { summary: "string" },
      },
    },
    icon: {
      control: { type: "select" },
      description:
        "Which icon to render. This is the story's own control, not a prop: each icon is its own component, so in an app you import the one you want.",
      options: ICON_NAMES,
      table: { type: { summary: "SDS icon component" } },
    },
    mirrored: {
      control: { type: "boolean" },
      description:
        "Flips the icon horizontally, for right-to-left layouts where the normal orientation reads wrongly.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    size: {
      control: { type: "number" },
      description:
        "Width and height. A number is pixels; a string may carry any CSS unit. The SDS icon sizes are 12, 16, 24 and 32.",
      table: {
        defaultValue: { summary: '"1em"' },
        type: { summary: "number | string" },
      },
    },
    weight: {
      control: { type: "select" },
      description:
        "Which of Phosphor's six drawings to render. SDS icons ship a single drawing, so they accept it for API parity and look the same at every value.",
      options: ["thin", "light", "regular", "bold", "fill", "duotone"],
      table: {
        defaultValue: { summary: '"regular"' },
        type: {
          summary: '"thin" | "light" | "regular" | "bold" | "fill" | "duotone"',
        },
      },
    },
  },
  component: IconDemo,
  parameters: {
    badges: ["stable"],
    docs: {
      description: {
        component: [
          "Every icon in `@czi-sds/icons` takes the props below, as do the icons in",
          "`@phosphor-icons/react`: both are built on Phosphor's `IconBase`, so the",
          "only difference between them is where you import from.",
          "",
          "Icons also accept every prop an `svg` element does, including `className`,",
          "`style`, `onClick` and `aria-*`.",
        ].join("\n"),
      },
    },
  },
  title: "Icons/Overview",
} as Meta;

// Default

export const Default = {
  args: {
    color: "#6E4FF9",
    icon: "SdsAtlasIcon",
    mirrored: false,
    size: 32,
    weight: "regular",
  },
};
