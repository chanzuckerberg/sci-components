import { Colors } from "../types";

// (masoudmanson): We need to define borders separately for light and dark themes
// because the border colors are different for each theme.
const BorderThickness = {
  default: 1,
  extraThick: 4,
  thick: 2,
} as const;

export const createAppThemeBorders = (colors: Colors, isDarkMode: boolean) => {
  const createBorder = (
    color: keyof Colors,
    level: keyof Colors[keyof Colors],
    style: "solid" | "dashed",
    thickness: keyof typeof BorderThickness
  ) => `${BorderThickness[thickness]}px ${style} ${colors[color][level]}`;

  return {
    accent: {
      default: createBorder("blue", isDarkMode ? 600 : 500, "solid", "default"),
      focused: createBorder("blue", isDarkMode ? 600 : 500, "solid", "default"),
      hover: createBorder("blue", isDarkMode ? 700 : 600, "solid", "default"),
      open: createBorder("blue", isDarkMode ? 600 : 500, "solid", "default"),
      pressed: createBorder("blue", isDarkMode ? 800 : 700, "solid", "default"),
      selected: createBorder(
        "blue",
        isDarkMode ? 600 : 500,
        "solid",
        "default"
      ),
    },
    base: {
      default: createBorder("gray", 500, "solid", "default"),
      disabled: createBorder("gray", 300, "solid", "default"),
      divider: createBorder("gray", 200, "solid", "default"),
      dividerOnDark: createBorder(
        "gray",
        isDarkMode ? 200 : 700,
        "solid",
        "default"
      ),
      dividerInverse: createBorder("gray", 600, "solid", "default"),
      hover: createBorder("gray", 900, "solid", "default"),
      inverse: createBorder("gray", 50, "solid", "default"),
      pressed: createBorder("gray", 900, "solid", "default"),
      table: createBorder("gray", 300, "solid", "default"),
    },
    beta: {
      default: createBorder("purple", 600, "solid", "default"),
      extraThick: createBorder("purple", 600, "solid", "extraThick"),
      thick: createBorder("purple", 600, "solid", "thick"),
    },
    info: {
      default: createBorder("blue", 600, "solid", "default"),
      extraThick: createBorder("blue", 600, "solid", "extraThick"),
      thick: createBorder("blue", 600, "solid", "thick"),
    },
    link: {
      dashed: createBorder("gray", 900, "dashed", "default"),
      solid: createBorder("gray", 900, "solid", "default"),
    },
    negative: {
      default: createBorder("red", 600, "solid", "default"),
      extraThick: createBorder("red", 600, "solid", "extraThick"),
      thick: createBorder("red", 600, "solid", "thick"),
    },
    neutral: {
      default: createBorder("gray", 500, "solid", "default"),
      extraThick: createBorder("gray", 500, "solid", "extraThick"),
      thick: createBorder("gray", 500, "solid", "thick"),
    },
    none: "none",
    notice: {
      default: createBorder("yellow", 600, "solid", "default"),
      extraThick: createBorder("yellow", 600, "solid", "extraThick"),
      thick: createBorder("yellow", 600, "solid", "thick"),
    },
    positive: {
      default: createBorder("green", 600, "solid", "default"),
      extraThick: createBorder("green", 600, "solid", "extraThick"),
      thick: createBorder("green", 600, "solid", "thick"),
    },
  };
};
