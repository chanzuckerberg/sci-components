import { Color } from "molstar/lib/mol-util/color";

/** Parses `#RRGGBB` (or `RRGGBB`) into a Mol* `Color`. */
export function parseHexColor(hex: string): Color {
  const h = hex.replace("#", "");
  return Color.fromRgb(
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16)
  );
}

/**
 * Parses a theme color into a Mol* `Color`, falling back when the token is
 * missing or is a format Mol* cannot consume (theme values are hex in practice,
 * but the palette types allow any CSS color string).
 */
export function themeColor(value: string | undefined, fallback: string): Color {
  const candidate = value?.trim();
  const isHex = candidate !== undefined && /^#?[0-9a-f]{6}$/i.test(candidate);
  return parseHexColor(isHex ? candidate : fallback);
}

/**
 * Neutral fill for residues with no overlay value. Sits between the light and
 * dark backgrounds so unhighlighted geometry stays legible in both modes.
 */
export function neutralResidueColor(mode: "light" | "dark"): Color {
  const g = mode === "dark" ? 100 : 180;
  return Color.fromRgb(g, g, g);
}
