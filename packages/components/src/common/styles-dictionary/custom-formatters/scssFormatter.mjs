/**
 * (masoudmanson): This is a custom format for generating SCSS variables for light and dark modes.
 */
export function scssFormatter({ dictionary }) {
  return dictionary.allTokens
    .map((token) => {
      if (token.darkValue) {
        return `$${token.name}: ${token.value};\n$${token.name}-dark: ${token.darkValue};`;
      } else if (token.attributes.type === "font") {
        return `$${token.name}: ${token.value};\n$${token.name}-narrow: ${token.narrowValue};`;
      }
      return `$${token.name}: ${token.value};`;
    })
    .join("\n");
}
