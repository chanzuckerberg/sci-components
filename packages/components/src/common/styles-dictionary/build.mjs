// eslint-disable-next-line import/no-unresolved
import StyleDictionary from "style-dictionary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cssFont from "css-font";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

// REGISTER THE CUSTOM FORMATTERS

/**
 * (masoudmanson): This is a custom format for generating CSS variables for light and dark modes.
 * The CSS variables are generated based on the value and darkValue attributes of each token.
 */
StyleDictionary.registerFormat({
  format: ({ dictionary }) => {
    const lightMode = dictionary.allTokens
      .map((token) => `    --${token.name}: ${token.value};`)
      .join("\n");

    const darkMode = dictionary.allTokens
      .map((token) => {
        return ["color", "border"].includes(token.attributes.type)
          ? `    --${token.name}: ${token.darkValue};`
          : `    --${token.name}: ${token.value};`;
      })
      .join("\n");

    return `@media (prefers-color-scheme: light) {
  :root {
${lightMode}
  }
}

@media (prefers-color-scheme: dark) {
  :root {
${darkMode}
  }
}`;
  },
  name: "sds/css",
});

/**
 * (masoudmanson): This is a custom format for generating SCSS variables for light and dark modes.
 */
StyleDictionary.registerFormat({
  format: ({ dictionary }) => {
    return dictionary.allTokens
      .map((token) => {
        if (token.darkValue) {
          return `$${token.name}: ${token.value};\n$${token.name}-dark: ${token.darkValue};`;
        } else {
          return `$${token.name}: ${token.value};\n$${token.name}-dark: ${token.value};`;
        }
      })
      .join("\n");
  },
  name: "sds/scss",
});

/**
 * (masoudmanson): This is a custom format for generating Tailwind variables for light and dark modes.
 */
StyleDictionary.registerFormat({
  format: ({ dictionary, options }) => {
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

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom formatters
// needs to be done _before_ applying the configuration
const sd = new StyleDictionary(DIRNAME + "/config.mjs");

// FINALLY, BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();
