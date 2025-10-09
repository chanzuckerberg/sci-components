import { TypographyStyle } from "@mui/material";
import {
  FontSizeValues,
  LineHeightValues,
  LetterSpacingValues,
  TypographyCategories,
  FontWeight,
} from "../constants/typography";
import { Typography, TypographyStyles } from "../types";

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_LINE_HEIGHT = 24;
const DEFAULT_LETTER_SPACING = "0px";

function generateTypographyStyle(
  category: keyof typeof TypographyCategories,
  size: string,
  weight: string,
  isNarrow: boolean = false,
  tabularNums?: string
) {
  const screenType = isNarrow ? "narrow" : "wide";
  // Use body values for link category
  const sourceCategory = category === "link" ? "body" : category;
  const baseFontSize =
    FontSizeValues[screenType]?.[sourceCategory]?.[
      size as keyof (typeof FontSizeValues)[typeof screenType][typeof sourceCategory]
    ] || DEFAULT_FONT_SIZE;
  const fontSize = baseFontSize;

  const lineHeight =
    LineHeightValues[screenType]?.[sourceCategory]?.[
      size as keyof (typeof LineHeightValues)[typeof screenType][typeof sourceCategory]
    ] || DEFAULT_LINE_HEIGHT;

  const letterSpacing =
    LetterSpacingValues[screenType]?.[sourceCategory]?.[
      size as keyof (typeof LetterSpacingValues)[typeof screenType][typeof sourceCategory]
    ] || DEFAULT_LETTER_SPACING;

  const fontWeight =
    FontWeight[weight as keyof typeof FontWeight] || FontWeight.regular;

  const baseStyle: {
    fontSize: number;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: string;
    textTransform: "uppercase" | "none";
    fontVariantNumeric?: string;
    textDecoration?: "underline" | "none";
  } = {
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight: `${lineHeight}px`,
    textTransform:
      category === "caps" ? ("uppercase" as const) : ("none" as const),
  };

  if (category === "tabular" && tabularNums) {
    baseStyle.fontVariantNumeric = tabularNums;
  }

  if (category === "link") {
    baseStyle.textDecoration = "underline";
  }

  return baseStyle;
}

const generateCategoryStyles = (
  category: keyof typeof TypographyCategories,
  isNarrow: boolean = false,
  tabularNums?: string
): TypographyStyle => {
  const config = TypographyCategories[category];
  const categoryStyles: Record<string, Record<string, TypographyStyle>> = {};

  config.weights.forEach((weight: string) => {
    categoryStyles[weight] = {};
    config.sizes.forEach((size: string) => {
      categoryStyles[weight][size] = generateTypographyStyle(
        category,
        size,
        weight,
        isNarrow,
        tabularNums
      );
    });
  });

  return categoryStyles;
};

export const generateTypographyStyles = (
  isNarrow: boolean = false,
  tabularNums?: string
): TypographyStyles => {
  return {
    body: generateCategoryStyles("body", isNarrow) as TypographyStyles["body"],
    caps: generateCategoryStyles("caps", isNarrow) as TypographyStyles["caps"],
    code: generateCategoryStyles("code", isNarrow) as TypographyStyles["code"],
    header: generateCategoryStyles(
      "header",
      isNarrow
    ) as TypographyStyles["header"],
    link: generateCategoryStyles("link", isNarrow) as TypographyStyles["link"],
    tabular: generateCategoryStyles(
      "tabular",
      isNarrow,
      tabularNums
    ) as TypographyStyles["tabular"],
    title: generateCategoryStyles(
      "title",
      isNarrow
    ) as TypographyStyles["title"],
  };
};

export const generateTypographyTheme = (
  fontFamily: string,
  fontFamilyCode: string,
  tabularNums: string
): Typography => {
  return {
    fontFamily: {
      body: fontFamily,
      caps: fontFamily,
      code: fontFamilyCode,
      header: fontFamily,
      link: fontFamily,
      tabular: fontFamily,
      title: fontFamily,
    },
    narrowStyles: generateTypographyStyles(true, tabularNums),
    wideStyles: generateTypographyStyles(false, tabularNums),
  };
};
