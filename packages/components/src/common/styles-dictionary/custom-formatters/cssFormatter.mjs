/**
 * (masoudmanson): This is a custom format for generating CSS variables for light and dark modes.
 * The CSS variables are generated based on the value and darkValue attributes of each token.
 */
export function cssFormatter({ dictionary }) {
  function printCssVariable(token, darkMode = false) {
    // If the token is a font, we need to print both the regular and narrow values
    if (token.attributes.type === "font") {
      return `    --${token.name}: ${token.value};\n    --${token.name}-narrow: ${token.narrowValue};`;
    }
    // If the token is a color or border and has a darkValue, we need to print both the light and dark values
    else if (
      darkMode &&
      token.darkValue &&
      ["color", "border"].includes(token.attributes.type)
    ) {
      return `    --${token.name}: ${token.darkValue};`;
    }
    // Otherwise we just print the regular value
    return `    --${token.name}: ${token.value};`;
  }

  const lightMode = dictionary.allTokens
    .map((token) => printCssVariable(token))
    .join("\n");

  const darkMode = dictionary.allTokens
    .map((token) => printCssVariable(token, true))
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
}
