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

    function convertToKebabCase(inputString) {
      return inputString
        .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
        .replace(/\d+/g, (match) => `-${match}`)
        .replace(/^-/, "")
        .replace(/-+/g, "-");
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
      const fontSize = {};
      const lineHeight = {};
      const letterSpacing = {};
      const fontVariantNumeric = {};
      const textTransform = {};

      for (const key of keys) {
        for (const [size, fonts] of Object.entries(tokens[key])) {
          for (const [, fontValue] of Object.entries(fonts)) {
            const parsed = cssFont.parse(fontValue.font.value);
            fontSize[getName([key, size])] = parsed.size;
            lineHeight[getName([key, size])] = parsed.size;

            letterSpacing[getName([key, size])] =
              fontValue["letter-spacing"].value;
            textTransform[getName([key, size])] = fontValue["text-transform"]
              ? fontValue["text-transform"].value
              : "none";
            fontVariantNumeric[getName([key, size])] = fontValue[
              "font-variant-numeric"
            ]
              ? fontValue["font-variant-numeric"].value
              : "normal";
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

    const { sds } = dictionary.tokens;
    const tailwindConfig = {
      fontFamily: transformDictionary(sds.font["font-family"]),
      ...transformFonts(sds.font, [
        "body",
        "caps",
        "header",
        "tabular",
        "code",
      ]),
      ...transformIconSizes(sds.iconSize),
      borderRadius: transformDictionary(sds.corner),
      boxShadow: transformDictionary(sds["drop-shadow"]),
      colors: transformColor(sds.color),
      spacing: transformDictionary(sds.space),
    };

    return JSON.stringify(tailwindConfig, null, 2);
  },
  name: "sds/tailwind",
});
