import {
  FontSizeValues,
  LineHeightValues,
  LetterSpacingValues,
  TypographyCategories,
  FontWeight,
} from "./constants/typography";

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
    ] || 14;
  const fontSize = baseFontSize;

  const lineHeight =
    LineHeightValues[screenType]?.[sourceCategory]?.[
      size as keyof (typeof LineHeightValues)[typeof screenType][typeof sourceCategory]
    ] || 24;

  const letterSpacing =
    LetterSpacingValues[screenType]?.[sourceCategory]?.[
      size as keyof (typeof LetterSpacingValues)[typeof screenType][typeof sourceCategory]
    ] || "0px";

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

function generateCategoryStyles(
  category: keyof typeof TypographyCategories,
  isNarrow: boolean = false,
  tabularNums?: string
) {
  const config = TypographyCategories[category];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryStyles: any = {};

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
}

export function generateTypographyStyles(
  isNarrow: boolean = false,
  tabularNums?: string
) {
  return {
    body: generateCategoryStyles("body", isNarrow),
    caps: generateCategoryStyles("caps", isNarrow),
    code: generateCategoryStyles("code", isNarrow),
    header: generateCategoryStyles("header", isNarrow),
    link: generateCategoryStyles("link", isNarrow),
    tabular: generateCategoryStyles("tabular", isNarrow, tabularNums),
    title: generateCategoryStyles("title", isNarrow),
  };
}

export function generateTypographyTheme(
  fontFamily: string,
  fontFamilyCode: string,
  tabularNums: string
) {
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
}
