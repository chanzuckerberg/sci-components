import { Meta, StoryObj } from "@storybook/react-webpack5";
import DefaultStory from "./stories/default";
import WithInteractionsStory from "./stories/withInteractions";
import WithSelectionStory from "./stories/withSelection";

const meta: Meta<typeof DefaultStory> = {
  argTypes: {
    items: {
      control: {
        type: "object",
      },
    },
    selectedIndices: {
      control: {
        type: "object",
      },
      description: "Array of selected item indices (controlled)",
    },
    showValues: {
      control: {
        type: "boolean",
      },
    },
  },
  component: DefaultStory,
  title: "Components/Legend",
};

export default meta;
type Story = StoryObj<typeof DefaultStory>;

const sampleItems = [
  { name: "H. sapiens", value: 3212, color: "#e7798b" },
  { name: "M. musculus", value: 130, color: "#c59345" },
  { name: "C. Jacques", value: 89, color: "#9aa446" },
  { name: "D. rerio", value: 65, color: "#5baf6d" },
  { name: "M. mulatta", value: 45, color: "#5baba4" },
  { name: "P. mirabillis", value: 34, color: "#59a5cc" },
  { name: "V. cholerae", value: 12, color: "#a08ded" },
  { name: "Other (17)", value: 40, color: "#e46bd8" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    showValues: false,
  },
};

export const WithValues: Story = {
  args: {
    items: sampleItems,
    showValues: true,
  },
};

export const WithInteractions: Story = {
  render: WithInteractionsStory,
  args: {
    items: sampleItems,
    showValues: true,
  },
};

export const WithSelection: Story = {
  render: WithSelectionStory,
  args: {
    items: sampleItems,
    showValues: true,
  },
};
