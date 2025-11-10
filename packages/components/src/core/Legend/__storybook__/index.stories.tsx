import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useTheme } from "@mui/material";
import DefaultStory from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import type Legend from "../index";
import { generateDiscreteColors } from "src/common/helpers/discreteColorGenerator";
import { getMode, SDSTheme } from "src/core/styles";

const meta: Meta<typeof DefaultStory> = {
  argTypes: {
    items: {
      control: {
        type: "object",
      },
      description: "Array of items to display in the legend",
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
      description: "Show values in the legend",
    },
  },
  component: DefaultStory,
  title: "Components/Legend",
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultStory>;

const sampleItems = [
  { name: "H. sapiens", value: 3212 },
  { name: "M. musculus", value: 130 },
  { name: "C. Jacques", value: 89 },
  { name: "D. rerio", value: 65 },
  { name: "M. mulatta", value: 45 },
  { name: "P. mirabillis", value: 34 },
  { name: "V. cholerae", value: 12 },
  { name: "Other (17)", value: 40 },
];

// Helper to generate items with theme-aware colors
const getSampleItemsWithColors = (isDarkMode: boolean = false) => {
  const colors = generateDiscreteColors(sampleItems.length, isDarkMode);
  return sampleItems.map((item, index) => ({
    ...item,
    color: colors[index],
  }));
};

// Wrapper component to access theme
const LegendWithThemeColors = (props: Parameters<typeof Legend>[0]) => {
  const theme = useTheme() as SDSTheme;
  const isDarkMode = getMode({ theme }) === "dark";
  const itemsWithColors = getSampleItemsWithColors(isDarkMode);

  return <DefaultStory {...props} items={itemsWithColors} />;
};

// Wrapper for selection story
const LegendSelectionWithTheme = (props: Parameters<typeof Legend>[0]) => {
  const theme = useTheme() as SDSTheme;
  const isDarkMode = getMode({ theme }) === "dark";
  const itemsWithColors = getSampleItemsWithColors(isDarkMode);

  return <WithSelectionStory {...props} items={itemsWithColors} />;
};

export const Default: Story = {
  render: LegendWithThemeColors,
  args: {
    showValues: false,
    items: sampleItems,
  },
};

export const WithValues: Story = {
  render: LegendWithThemeColors,
  args: {
    showValues: true,
  },
};

export const WithSelection: Story = {
  render: LegendSelectionWithTheme,
  args: {
    showValues: true,
  },
};
