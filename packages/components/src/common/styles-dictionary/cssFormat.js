/* eslint-disable @typescript-eslint/no-var-requires */

const StyleDictionary = require("style-dictionary");

/**
 * (masoudmanson): This is a custom format for generating CSS variables for light and dark modes.
 * The CSS variables are generated based on the value and darkValue attributes of each token.
 */
StyleDictionary.registerFormat({
  formatter: ({ dictionary }) => {
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
