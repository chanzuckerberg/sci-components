import { TypographyStyle } from "@mui/material";
import { copyToClipboard, convertToKebabCase } from "src/core/Bases/utils";

export interface TypographyItemData {
  category: "body" | "header" | "code" | "caps" | "tabular" | "title" | "link";
  weight: "light" | "regular" | "medium" | "semibold" | "bold";
  size: string;
  displayName: string;
  mixinName: string;
  sampleText: string;
  cssProperties: TypographyStyle;
  fontFamily: string;
  hasTextTransform?: boolean;
  hasFontVariantNumeric?: boolean;
  hasTextDecoration?: boolean;
}

export const getSampleText = (category: string): string => {
  switch (category) {
    case "body":
    case "header":
      return "The quick brown fox jumps over the lazy dog.";
    case "code":
      return 'const greeting = "Hello World";';
    case "caps":
      return "SCIENCE DESIGN SYSTEM";
    case "tabular":
      return `10,234.56\n9,876.54\n537.00\n11.03`;
    case "title":
      return "Page Title Text";
    case "link":
      return "Visit our homepage";
    default:
      return "Sample Text";
  }
};

export const generateDisplayName = (
  category: string,
  weight: string,
  size: string
): string => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
  const sizeName = size.toUpperCase();

  return `${categoryName} ${sizeName} ${weightName}`;
};

export const generateMixinName = (
  category: string,
  weight: string,
  size: string
): string => {
  const basePrefix = `font${category.charAt(0).toUpperCase() + category.slice(1)}`;

  const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);

  // Caps and Headers don't use weight in their mixin names
  if (category === "caps" || category === "header") {
    return `${basePrefix}${capitalizedSize}`;
  }

  if (weight === "light") {
    return `${basePrefix}Light${capitalizedSize}`;
  }

  if (weight === "medium") {
    return `${basePrefix}Medium${capitalizedSize}`;
  }

  if (weight === "semibold") {
    return `${basePrefix}Semibold${capitalizedSize}`;
  }

  if (weight === "bold") {
    return `${basePrefix}Bold${capitalizedSize}`;
  }

  return `${basePrefix}${capitalizedSize}`;
};

export const generateScssVariable = (
  category: string,
  weight: string,
  size: string,
  isNarrow?: boolean
): string => {
  const kebabCategory = convertToKebabCase(category);
  const kebabSize = convertToKebabCase(size);
  const weightNumber = weight === "semibold" ? "600" : "400";
  const narrowSuffix = isNarrow ? "-narrow" : "";

  return `$sds-font-${kebabCategory}-${kebabSize}-${weightNumber}-font${narrowSuffix}`;
};

export const generateCssVariable = (
  category: string,
  weight: string,
  size: string,
  isNarrow?: boolean
): string => {
  const kebabCategory = convertToKebabCase(category);
  const kebabSize = convertToKebabCase(size);
  const weightNumber = weight === "semibold" ? "600" : "400";
  const narrowSuffix = isNarrow ? "-narrow" : "";

  return `--sds-font-${kebabCategory}-${kebabSize}-${weightNumber}-font${narrowSuffix}`;
};

export const formatCssProperties = (
  properties: TypographyStyle,
  fontFamily?: string,
  hasTextTransform?: boolean,
  hasFontVariantNumeric?: boolean,
  hasTextDecoration?: boolean
): string => {
  const lines: string[] = [];

  if (fontFamily) {
    lines.push(`font-family: ${fontFamily};`);
  }
  if (properties.fontSize) {
    lines.push(`font-size: ${properties.fontSize}px;`);
  }
  if (properties.lineHeight) {
    lines.push(`line-height: ${properties.lineHeight};`);
  }
  if (properties.fontWeight) {
    lines.push(`font-weight: ${properties.fontWeight};`);
  }
  if (properties.letterSpacing) {
    lines.push(`letter-spacing: ${properties.letterSpacing};`);
  }
  if (hasFontVariantNumeric) {
    lines.push(`font-variant-numeric: tabular-nums;`);
  }
  if (hasTextTransform) {
    lines.push(`text-transform: uppercase;`);
  }
  if (hasTextDecoration) {
    lines.push(`text-decoration: underline;`);
  }

  return lines.join("\n");
};

// Define size order from largest to smallest
const SIZE_ORDER = ["xxl", "xl", "l", "m", "s", "xs", "xxs", "xxxs", "xxxxs"];

// Define weight order from lightest to boldest
const WEIGHT_ORDER = ["light", "regular", "medium", "semibold", "bold"];

export const sortTypographyItems = (
  items: TypographyItemData[]
): TypographyItemData[] => {
  return items.sort((a, b) => {
    // First sort by category to keep categories grouped
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }

    // Then sort by weight (light->regular->medium->semibold->bold)
    if (a.weight !== b.weight) {
      const aWeightIndex = WEIGHT_ORDER.indexOf(a.weight);
      const bWeightIndex = WEIGHT_ORDER.indexOf(b.weight);

      // If weight not found in WEIGHT_ORDER, put it at the end
      if (aWeightIndex === -1 && bWeightIndex === -1)
        return a.weight.localeCompare(b.weight);
      if (aWeightIndex === -1) return 1;
      if (bWeightIndex === -1) return -1;

      return aWeightIndex - bWeightIndex;
    }

    // Finally sort by size (largest first)
    const aIndex = SIZE_ORDER.indexOf(a.size);
    const bIndex = SIZE_ORDER.indexOf(b.size);

    // If size not found in SIZE_ORDER, put it at the end
    if (aIndex === -1 && bIndex === -1) return a.size.localeCompare(b.size);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
};

export const copyTypographyData = {
  cssProperties: (
    properties: TypographyStyle,
    fontFamily?: string,
    hasTextTransform?: boolean,
    hasFontVariantNumeric?: boolean,
    hasTextDecoration?: boolean
  ) =>
    copyToClipboard(
      formatCssProperties(
        properties,
        fontFamily,
        hasTextTransform,
        hasFontVariantNumeric,
        hasTextDecoration
      )
    ),
  cssVariable: (cssVar: string) => copyToClipboard(cssVar),
  mixinName: (mixin: string) => copyToClipboard(mixin),
  scssVariable: (scssVar: string) => copyToClipboard(scssVar),
};
