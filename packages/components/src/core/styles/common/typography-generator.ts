import {
  FONT_SIZE_VALUES,
  LINE_HEIGHT_VALUES,
  LETTER_SPACING_VALUES,
  TYPOGRAPHY_CATEGORIES,
  FontWeight,
} from "./typography-constants";

export {
  FONT_SIZE_VALUES,
  LINE_HEIGHT_VALUES,
  LETTER_SPACING_VALUES,
  TYPOGRAPHY_CATEGORIES,
  FontWeight,
};

function generateTypographyStyle(
  category: keyof typeof TYPOGRAPHY_CATEGORIES,
  size: string,
  weight: string,
  isNarrow: boolean = false,
  tabularNums?: string
) {
  const screenType = isNarrow ? "narrow" : "wide";
  const baseFontSize =
    FONT_SIZE_VALUES[screenType]?.[category]?.[
      size as keyof (typeof FONT_SIZE_VALUES)[typeof screenType][typeof category]
    ] || 14;
  const fontSize = baseFontSize;

  const lineHeight =
    LINE_HEIGHT_VALUES[screenType]?.[category]?.[
      size as keyof (typeof LINE_HEIGHT_VALUES)[typeof screenType][typeof category]
    ] || 24;

  const letterSpacing =
    LETTER_SPACING_VALUES[screenType]?.[category]?.[
      size as keyof (typeof LETTER_SPACING_VALUES)[typeof screenType][typeof category]
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

  return baseStyle;
}

function generateCategoryStyles(
  category: keyof typeof TYPOGRAPHY_CATEGORIES,
  isNarrow: boolean = false,
  tabularNums?: string
) {
  const config = TYPOGRAPHY_CATEGORIES[category];
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
      tabular: fontFamily,
      title: fontFamily,
    },
    narrowStyles: generateTypographyStyles(true, tabularNums),
    wideStyles: generateTypographyStyles(false, tabularNums),
  };
}
