/* eslint-disable @typescript-eslint/no-var-requires */
const StyleDictionary = require("style-dictionary");

/**
 * (masoudmanson): This is a custom format for generating SCSS variables for light and dark modes.
 */
StyleDictionary.registerFormat({
  formatter: ({ dictionary }) => {
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
