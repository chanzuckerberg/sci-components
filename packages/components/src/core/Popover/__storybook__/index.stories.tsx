import { Args, Meta } from "@storybook/react-webpack5";
import { Popover } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    anchorOrigin: {
      control: { type: "object" },
      description:
        "This is the point on the anchor where the popover's anchorEl will attach to. Options: vertical: [top, center, bottom]; horizontal: [left, center, right].",
      table: {
        defaultValue: {
          summary: "{ vertical: 'bottom', horizontal: 'left' }",
        },
        type: {
          summary:
            "{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }",
        },
      },
    },
    transformOrigin: {
      control: { type: "object" },
      description:
        "This is the point on the popover which will attach to the anchor's origin. The SDS default adds a vertical offset using the theme spacing.",
      table: {
        defaultValue: {
          summary: "{ vertical: -(spaces.s || 8), horizontal: 0 }",
        },
        type: {
          summary:
            "{ horizontal: 'center' | 'left' | 'right' | number, vertical: 'bottom' | 'center' | 'top' | number }",
        },
      },
    },
  },
  component: Popover,
  parameters: {
    badges: ["stable"],
    docs: {
      description: {
        component: [
          "This is an SDS wrapper around the MUI Popover component that applies",
          "custom SDS box-shadows, borders, and background colors.",
          "It accepts the same props as the MUI Popover component.",
          "",
          "For a full list of available props, see the",
          "[MUI Popover API documentation](https://mui.com/material-ui/api/popover/).",
        ].join("\n"),
      },
    },
  },
  title: "Components/Popover",
} as Meta;

// Default

export const Default = {
  args: {
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: -8, horizontal: 0 },
  },
};

// Test

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
