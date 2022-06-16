/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const StyleDictionary = require("style-dictionary");
const cssFont = require("css-font");

StyleDictionary.registerFormat({
  formatter({ dictionary, options }) {
    function getName(name) {
      const joinedName = typeof name === "string" ? name : name.join("-");
      const mappedName = options.remapNames?.[joinedName] ?? joinedName;
      const result = options.prefix
        ? `${options.prefix}-${mappedName}`
        : mappedName;

      return result.toLowerCase().replace(" ", "-");
    }

    function transformDictionary(tokens, keys) {
      const result = {};

      for (const [name, token] of Object.entries(tokens)) {
        if (!keys || keys.includes(name)) {
          result[getName(name)] = token.value;
        }
      }

      return result;
    }

    function transformColor(tokens) {
      const colors = {};

      for (const [name, colorTokens] of Object.entries(tokens)) {
        const color = {};

        for (const [colorName, token] of Object.entries(colorTokens)) {
          color[colorName.toLowerCase().replace(" ", "-")] = token.value;
        }

        colors[getName(name)] = color;
      }

      return colors;
    }

    function transformIconSizes(tokens) {
      const width = {};
      const height = {};

      for (const [iconSize, token] of Object.entries(tokens)) {
        width[getName(`icon-${iconSize}`)] = token.height.value;
        height[getName(`icon-${iconSize}`)] = token.width.value;
      }

      return { height, width };
    }

    function transformFonts(tokens, keys) {
      const fontFamily = {};
      const fontSize = {};
      const lineHeight = {};
      const boldNameMap = {
        400: "regular",
        600: "semibold",
      };

      for (const key of keys) {
        for (const [size, fonts] of Object.entries(tokens[key])) {
          for (const [boldSize, { font }] of Object.entries(fonts)) {
            // const name = getName(`${key}-${size}-${boldSizeMap[boldSize]}`);
            const parsed = cssFont.parse(font.value);
            fontFamily[getName(boldNameMap[boldSize])] = parsed.family;
            fontSize[getName([key, size])] = parsed.size;
            lineHeight[getName([key, size])] = parsed.size;
          }
        }
      }

      return {
        fontFamily,
        fontSize,
        lineHeight,
      };
    }

    const { sds } = dictionary.tokens;
    const tailwindConfig = {
      ...transformFonts(sds.font, ["body", "caps", "header"]),
      ...transformIconSizes(sds.iconSizes),
      borderRadius: transformDictionary(sds.corners),
      boxShadow: transformDictionary(sds["drop-shadows"]),
      colors: transformColor(sds.color),
      letterSpacing: transformDictionary(sds.font["letter-spacing"]),
      spacing: transformDictionary(sds.spaces),
    };

    return JSON.stringify(tailwindConfig, null, 2);
  },
  name: "tailwindFormat",
});
