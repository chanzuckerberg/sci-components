import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import {
  FONT_SIZE_VALUES,
  LINE_HEIGHT_VALUES,
  LETTER_SPACING_VALUES,
  TYPOGRAPHY_CATEGORIES,
} from "../../../core/styles/common/typography-constants";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Font family constants (matching the current font.json structure)
const INTER_FONT =
  'var(--font-inter),Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif';
const CODE_FONT = '"IBM Plex Mono", monospace';
const INTER_FONT_REF = "{sds.font.inter-font}";

// Weight mapping for numeric values
const WEIGHT_MAP: Record<string, number> = {
  bold: 700,
  medium: 500,
  regular: 400,
  semibold: 600,
};

// Generate font family definitions
const generateFontFamilyDefinitions = () => {
  return {
    body: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
    caps: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
    code: {
      narrowValue: CODE_FONT,
      value: CODE_FONT,
    },
    header: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
    link: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
    tabular: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
    title: {
      narrowValue: INTER_FONT_REF,
      value: INTER_FONT_REF,
    },
  };
};

// Generate font shorthand (weight fontSize/lineHeight fontFamily)
const generateFontShorthand = (
  category: keyof typeof TYPOGRAPHY_CATEGORIES,
  size: string,
  weight: number,
  isNarrow: boolean = false
): string => {
  const screenType = isNarrow ? "narrow" : "wide";
  // Use body values for link category
  const sourceCategory = category === "link" ? "body" : category;
  const fontSize =
    FONT_SIZE_VALUES[screenType][sourceCategory][
      size as keyof (typeof FONT_SIZE_VALUES)[typeof screenType][typeof sourceCategory]
    ];
  const lineHeight =
    LINE_HEIGHT_VALUES[screenType][sourceCategory][
      size as keyof (typeof LINE_HEIGHT_VALUES)[typeof screenType][typeof sourceCategory]
    ];
  const fontFamilyRef = isNarrow
    ? `{sds.font.font-family.${String(category)}.narrowValue}`
    : `{sds.font.font-family.${String(category)}.value}`;

  return `${weight} ${fontSize}px/${lineHeight}px ${fontFamilyRef}`;
};

// Generate letter spacing
const getLetterSpacing = (
  category: keyof typeof TYPOGRAPHY_CATEGORIES,
  size: string,
  isNarrow: boolean = false
): string => {
  const screenType = isNarrow ? "narrow" : "wide";
  // Use body values for link category
  const sourceCategory = category === "link" ? "body" : category;
  return LETTER_SPACING_VALUES[screenType][sourceCategory][
    size as keyof (typeof LETTER_SPACING_VALUES)[typeof screenType][typeof sourceCategory]
  ];
};

// Generate typography styles for a category
const generateCategoryStyles = (
  category: keyof typeof TYPOGRAPHY_CATEGORIES
) => {
  const categoryConfig = TYPOGRAPHY_CATEGORIES[category];
  const styles: Record<string, Record<string, unknown>> = {};

  // Process each size
  categoryConfig.sizes.forEach((size: string) => {
    styles[size] = {};

    // Process each weight for this size
    categoryConfig.weights.forEach((weight: string) => {
      const numericWeight = WEIGHT_MAP[weight];
      const weightKey = numericWeight.toString();
      const weightStyle: Record<string, unknown> = {
        font: {
          narrowValue: generateFontShorthand(
            category,
            size,
            numericWeight,
            true
          ),
          value: generateFontShorthand(category, size, numericWeight, false),
        },
      };

      // Add font-variant-numeric for tabular (after font, before letter-spacing)
      if (category === "tabular") {
        weightStyle["font-variant-numeric"] = {
          narrowValue: "tabular-nums",
          value: "tabular-nums",
        };
      }

      // Add letter-spacing
      weightStyle["letter-spacing"] = {
        narrowValue: getLetterSpacing(category, size, true),
        value: getLetterSpacing(category, size, false),
      };

      // Add text-transform for caps (after letter-spacing)
      if (category === "caps") {
        weightStyle["text-transform"] = {
          narrowValue: "uppercase",
          value: "uppercase",
        };
      }

      // Add text-decoration for link (after letter-spacing)
      if (category === "link") {
        weightStyle["text-decoration"] = {
          narrowValue: "underline",
          value: "underline",
        };
      }

      styles[size][weightKey] = weightStyle;
    });
  });

  return styles;
};

// Generate the complete font tokens structure
const generateFontTokens = () => {
  return {
    sds: {
      font: {
        body: generateCategoryStyles("body"),
        caps: generateCategoryStyles("caps"),
        code: generateCategoryStyles("code"),
        "font-family": generateFontFamilyDefinitions(),
        header: generateCategoryStyles("header"),
        "inter-font": INTER_FONT,
        link: generateCategoryStyles("link"),
        tabular: generateCategoryStyles("tabular"),
        title: generateCategoryStyles("title"),
      },
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateFontTokens();
    const outputPath = join(DIRNAME, "../design-tokens/font.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("font.json successfully generated!");
  } catch (error) {
    console.error("Error generating font tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
