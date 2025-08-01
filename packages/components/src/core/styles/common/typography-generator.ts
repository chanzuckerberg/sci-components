/* eslint-disable sort-keys */

const FONT_SIZE_VALUES = {
  wide: {
    body: {
      xxxs: 11,
      xxs: 12,
      xs: 13,
      s: 14,
      m: 16,
      l: 18,
    },
    header: {
      xxxs: 11,
      xxs: 12,
      xs: 13,
      s: 14,
      m: 16,
      l: 18,
      xl: 22,
      xxl: 26,
    },
    code: {
      xs: 13,
      s: 14,
    },
    caps: {
      xxs: 12,
      xxxs: 11,
      xxxxs: 10,
    },
    tabular: {
      xxxs: 11,
      xxs: 12,
      xs: 13,
      s: 14,
    },
    title: {
      s: 32,
      m: 40,
      l: 52,
    },
  },
  narrow: {
    body: {
      xxxs: 12,
      xxs: 12,
      xs: 13,
      s: 14,
      m: 14,
      l: 16,
    },
    header: {
      xxxs: 12,
      xxs: 12,
      xs: 13,
      s: 14,
      m: 14,
      l: 16,
      xl: 18,
      xxl: 22,
    },
    code: {
      xs: 13,
      s: 14,
    },
    caps: {
      xxs: 12,
      xxxs: 11,
      xxxxs: 11,
    },
    tabular: {
      xxxs: 11,
      xxs: 12,
      xs: 13,
      s: 14,
    },
    title: {
      s: 26,
      m: 32,
      l: 40,
    },
  },
} as const;

const LINE_HEIGHT_VALUES = {
  wide: {
    body: {
      xxxs: 16,
      xxs: 18,
      xs: 20,
      s: 24,
      m: 26,
      l: 28,
    },
    header: {
      xxxs: 16,
      xxs: 18,
      xs: 18,
      s: 20,
      m: 22,
      l: 24,
      xl: 30,
      xxl: 34,
    },
    code: {
      xs: 20,
      s: 24,
    },
    caps: {
      xxs: 18,
      xxxs: 16,
      xxxxs: 14,
    },
    tabular: {
      xxxs: 16,
      xxs: 18,
      xs: 20,
      s: 24,
    },
    title: {
      s: 40,
      m: 50,
      l: 64,
    },
  },
  narrow: {
    body: {
      xxxs: 18,
      xxs: 18,
      xs: 20,
      s: 24,
      m: 24,
      l: 26,
    },
    header: {
      xxxs: 18,
      xxs: 18,
      xs: 18,
      s: 20,
      m: 20,
      l: 22,
      xl: 24,
      xxl: 30,
    },
    code: {
      xs: 20,
      s: 24,
    },
    caps: {
      xxs: 18,
      xxxs: 16,
      xxxxs: 16,
    },
    tabular: {
      xxxs: 16,
      xxs: 18,
      xs: 20,
      s: 24,
    },
    title: {
      s: 34,
      m: 40,
      l: 50,
    },
  },
} as const;

const LETTER_SPACING_VALUES = {
  wide: {
    body: {
      xxxs: "0.06px",
      xxs: "0.06px",
      xs: "0px",
      s: "0px",
      m: "0px",
      l: "0px",
    },
    header: {
      xxxs: "0.1px",
      xxs: "0.1px",
      xs: "0.08px",
      s: "0.08px",
      m: "0px",
      l: "0px",
      xl: "0px",
      xxl: "0px",
    },
    code: {
      xs: "0px",
      s: "0px",
    },
    caps: {
      xxs: "0.4px",
      xxxs: "0.4px",
      xxxxs: "0.4px",
    },
    tabular: {
      xxxs: "-0.25px",
      xxs: "-0.25px",
      xs: "-0.3px",
      s: "-0.3px",
    },
    title: {
      s: "0px",
      m: "0px",
      l: "0px",
    },
  },
  narrow: {
    body: {
      xxxs: "0.06px",
      xxs: "0.06px",
      xs: "0px",
      s: "0px",
      m: "0px",
      l: "0px",
    },
    header: {
      xxxs: "0.1px",
      xxs: "0.1px",
      xs: "0.08px",
      s: "0.08px",
      m: "0.08px",
      l: "0px",
      xl: "0px",
      xxl: "0px",
    },
    code: {
      xs: "0px",
      s: "0px",
    },
    caps: {
      xxs: "0.4px",
      xxxs: "0.4px",
      xxxxs: "0.4px",
    },
    tabular: {
      xxxs: "-0.25px",
      xxs: "-0.25px",
      xs: "-0.3px",
      s: "-0.3px",
    },
    title: {
      s: "0px",
      m: "0px",
      l: "0px",
    },
  },
} as const;

const TYPOGRAPHY_CATEGORIES = {
  body: {
    weights: ["regular", "medium", "semibold"] as const,
    sizes: ["l", "m", "s", "xs", "xxs", "xxxs"] as const,
  },
  header: {
    weights: ["semibold"] as const,
    sizes: ["xxl", "xl", "l", "m", "s", "xs", "xxs", "xxxs"] as const,
  },
  code: {
    weights: ["regular", "medium", "semibold"] as const,
    sizes: ["s", "xs"] as const,
  },
  caps: {
    weights: ["semibold"] as const,
    sizes: ["xxs", "xxxs", "xxxxs"] as const,
  },
  tabular: {
    weights: ["regular", "medium", "semibold"] as const,
    sizes: ["s", "xs", "xxs", "xxxs"] as const,
  },
  title: {
    weights: ["bold"] as const,
    sizes: ["s", "m", "l"] as const,
  },
} as const;

export const FontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

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

  config.weights.forEach((weight) => {
    categoryStyles[weight] = {};
    config.sizes.forEach((size) => {
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
    header: generateCategoryStyles("header", isNarrow),
    code: generateCategoryStyles("code", isNarrow),
    caps: generateCategoryStyles("caps", isNarrow),
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
