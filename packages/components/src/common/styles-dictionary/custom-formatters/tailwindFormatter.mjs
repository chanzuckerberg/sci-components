import cssFont from "css-font";

/**
 * (masoudmanson): This is a custom format for generating Tailwind variables for light and dark modes.
 */
export function tailwindFormatter({ dictionary, options }) {
  const { sds } = dictionary.tokens;
  const tailwindConfig = {
    fontFamily: transformDictionary(sds.font["font-family"], null, options),
    ...transformFonts(
      sds.font,
      ["body", "caps", "header", "tabular", "code"],
      options
    ),
    ...transformIconSizes(sds.iconSize, options),
    borderRadius: transformDictionary(sds.corner, null, options),
    boxShadow: transformDictionary(sds["drop-shadow"], null, options),
    colors: transformColor(sds.color),
    spacing: transformDictionary(sds.space, null, options),
  };

  return JSON.stringify(tailwindConfig, null, 2);
}

function getName(name, options = {}) {
  const joinedName = typeof name === "string" ? name : name.join("-");
  const mappedName = options.remapNames?.[joinedName] ?? joinedName;
  const result = options.prefix
    ? `${options.prefix}-${mappedName}`
    : mappedName;

  return result.toLowerCase().replace(" ", "-");
}

function convertToKebabCase(inputString) {
  return inputString
    .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
    .replace(/\d+/g, (match) => `-${match}`)
    .replace(/^-/, "")
    .replace(/-+/g, "-");
}

function transformDictionary(tokens, keys, options = {}) {
  const result = {};

  for (const [name, token] of Object.entries(tokens)) {
    if (!keys || keys.includes(name)) {
      result[getName(name, options)] = token.value;
    }
  }

  return result;
}

function transformColor(tokens) {
  const colors = {
    dark: {},
    light: {},
  };

  function getColor(theToken) {
    for (const [, iToken] of Object.entries(theToken)) {
      if ("value" in iToken && "name" in iToken) {
        colors.light[convertToKebabCase(iToken.name)] = iToken.value;
        colors.dark[convertToKebabCase(iToken.name)] = iToken.darkValue;
      } else {
        getColor(iToken);
      }
    }
  }

  getColor(tokens);

  return colors;
}

function transformIconSizes(tokens, options = {}) {
  const width = {};
  const height = {};

  for (const [iconSize, token] of Object.entries(tokens)) {
    width[getName(`icon-${iconSize}`, options)] = token.height.value;
    height[getName(`icon-${iconSize}`, options)] = token.width.value;
  }

  return { height, width };
}

function transformFonts(tokens, keys, options = {}) {
  const fontSize = { narrow: {}, wide: {} };
  const lineHeight = { narrow: {}, wide: {} };
  const letterSpacing = { narrow: {}, wide: {} };
  const fontVariantNumeric = { narrow: {}, wide: {} };
  const textTransform = { narrow: {}, wide: {} };

  const TEXT_TRANSFORM = "text-transform";
  const FONT_VARIANT_NUMERIC = "font-variant-numeric";

  function makeFontValue(fontValue, name) {
    const parsedWideFont = cssFont.parse(fontValue.font.value);
    const parsedNarrowFont = cssFont.parse(fontValue.font.narrowValue);

    // Wide Style Fonts
    fontSize.wide[name] = parsedWideFont.size;
    lineHeight.wide[name] = parsedWideFont.size;
    letterSpacing.wide[name] = fontValue["letter-spacing"].value;
    textTransform.wide[name] = fontValue[TEXT_TRANSFORM]
      ? fontValue[TEXT_TRANSFORM].value
      : "none";
    fontVariantNumeric.wide[name] = fontValue[FONT_VARIANT_NUMERIC]
      ? fontValue[FONT_VARIANT_NUMERIC].value
      : "normal";

    // Narrow Style Fonts
    fontSize.narrow[name] = parsedNarrowFont.size;
    lineHeight.narrow[name] = parsedNarrowFont.size;
    letterSpacing.narrow[name] = fontValue["letter-spacing"].narrowValue;
    textTransform.narrow[name] = fontValue[TEXT_TRANSFORM]
      ? fontValue[TEXT_TRANSFORM].narrowValue
      : "none";
    fontVariantNumeric.narrow[name] = fontValue[FONT_VARIANT_NUMERIC]
      ? fontValue[FONT_VARIANT_NUMERIC].narrowValue
      : "normal";
  }

  for (const key of keys) {
    for (const [size, fonts] of Object.entries(tokens[key])) {
      for (const [, fontValue] of Object.entries(fonts)) {
        makeFontValue(fontValue, getName([key, size], options));
      }
    }
  }

  return {
    fontSize,
    fontVariantNumeric,
    letterSpacing,
    lineHeight,
    textTransform,
  };
}
