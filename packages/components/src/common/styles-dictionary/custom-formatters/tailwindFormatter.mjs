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
    breakpoints: transformDictionary(sds.breakpoint, null, options),
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
  /**
   * (masoudmanson): This will be used for generating the font
   * specific tailwind config.
   */
  const fontData = {
    fontSize: {},
    fontVariantNumeric: {},
    letterSpacing: {},
    lineHeight: {},
    textTransform: {},
  };

  /**
   * (masoudmanson): Generates a typography object compatible with Tailwind's typography plugin.
   * Example usage in a Tailwind config file:
   *
   * const typography = require('@tailwindcss/typography')
   * const sdsTailwindConfig = require("@czi-sds/components/dist/tailwind.json");
   *
   * module.exports = {
   *  mode: 'jit',
   *  content: [...],
   *  theme: {
   *    extend: {
   *      ...sdsTailwindConfig
   *    }
   *  },
   *  plugins: [typography],
   *}
   *
   * And it can be used in the html like:
   *
   * <p class="prose prose-sds-header-xs-600-wide">...</p>
   */
  const typography = {};

  keys.forEach((key) => {
    Object.entries(tokens[key]).forEach(([size, fontVariants]) => {
      Object.entries(fontVariants).forEach(([_, fontValue]) => {
        const name = getName([key, size], options);
        addFontData(typography, fontData, fontValue, name);
      });
    });
  });

  return {
    ...fontData,
    typography,
  };
}

function addFontData(typography, data, fontValue, name) {
  const fontTypes = {
    narrow: cssFont.parse(fontValue.font.narrowValue),
    wide: cssFont.parse(fontValue.font.value),
  };

  Object.entries(fontTypes).forEach(([type, parsedFont]) => {
    const key = `${name}-${parsedFont.weight}-${type}`;
    const sharedStyles = {
      fontFamily: parsedFont.family.join(", "),
      fontSize: parsedFont.size,
      fontStyle: parsedFont.style,
      fontVariantNumeric: fontValue["font-variant-numeric"]?.value || "normal",
      fontWeight: parsedFont.weight,
      letterSpacing: fontValue["letter-spacing"].value || "0px",
      lineHeight: parsedFont.lineHeight,
      textTransform: fontValue["text-transform"]?.value || "none",
    };

    // Add to typography
    typography[key] = { css: sharedStyles };

    // Add to font data
    data.fontSize[key] = parsedFont.size;
    data.lineHeight[key] = parsedFont.lineHeight;
    data.letterSpacing[key] = sharedStyles.letterSpacing;
    data.textTransform[key] = sharedStyles.textTransform;
    data.fontVariantNumeric[key] = sharedStyles.fontVariantNumeric;
  });
}
