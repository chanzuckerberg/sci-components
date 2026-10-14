const REFERENCE_REGEX = /\{([^{}]+)\}/g;

/**
 * (masoudmanson): SDS keeps the light/dark and wide/narrow variants of a token
 * side by side on a single token, in the custom `darkValue` and `narrowValue`
 * properties, and shares the Inter font stack through the `sds.font.inter-font`
 * string leaf. Style Dictionary only resolves a reference by looking up the
 * token at that path and reading its `value`, so it can follow none of those:
 * `{...gray.500.darkValue}` and `{sds.font.inter-font}` are not tokens.
 *
 * This preprocessor inlines exactly those references — the ones whose path
 * points at a plain string rather than at a token — before the built-in
 * resolver runs. References that do point at a token are left untouched so
 * Style Dictionary keeps resolving and validating them itself.
 */
export function resolveCustomReferences(tokens) {
  resolveSlice(tokens, tokens);
  return tokens;
}

function getNodeByPath(path, tokens) {
  return path
    .split(".")
    .reduce((node, key) => (node == null ? undefined : node[key]), tokens);
}

function resolveValue(value, tokens, stack) {
  return value.replace(REFERENCE_REGEX, (match, path) => {
    const trimmedPath = path.trim();

    // The `.value` suffix was valid in Style Dictionary v4 but was removed in
    // v5. Leave it alone so Style Dictionary reports it as a broken reference
    // instead of us quietly keeping the removed syntax alive.
    if (trimmedPath.endsWith(".value")) return match;

    const node = getNodeByPath(trimmedPath, tokens);
    if (typeof node !== "string") return match;

    if (stack.includes(trimmedPath)) {
      throw new Error(
        `Circular token reference: ${[...stack, trimmedPath].join(" -> ")}`
      );
    }

    return resolveValue(node, tokens, [...stack, trimmedPath]);
  });
}

function resolveSlice(slice, tokens) {
  for (const [key, node] of Object.entries(slice)) {
    if (typeof node === "string") {
      slice[key] = resolveValue(node, tokens, []);
    } else if (node !== null && typeof node === "object") {
      resolveSlice(node, tokens);
    }
  }
}
