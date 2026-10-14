/**
 * Categorical palette assigned to items in order. The first eight colors are
 * the chart palette; the rest continue the cycle for long lists such as the
 * legend overflow menu. Items beyond the palette length wrap around.
 */
export const DISCRETE_COLORS = [
  "#cc675c",
  "#d7c368",
  "#a2d96a",
  "#7dd889",
  "#7ad1d9",
  "#5b70d4",
  "#975bd4",
  "#cc60ae",
  "#6842a4",
  "#6d42a6",
  "#7342a8",
  "#7a42aa",
  "#7f42ab",
  "#9243ae",
  "#9843ae",
  "#9e44ad",
  "#ab45ab",
  "#b246a9",
  "#b748a8",
  "#bd49a6",
  "#c34aa3",
  "#c94ca1",
  "#ce4d9e",
  "#d34f9a",
  "#d85097",
  "#dd5293",
  "#e1548f",
  "#e5568b",
  "#e85887",
  "#ec5b83",
  "#ec5f79",
  "#ec6175",
  "#ec6471",
  "#ed676c",
  "#ed6a68",
  "#ed6e64",
  "#ed7160",
  "#ef8550",
  "#f0944c",
  "#eea930",
  "#dcbe2f",
  "#d4c933",
  "#c1dc40",
  "#b7e54b",
  "#9ff258",
  "#4ff569",
  "#31ef7f",
  "#21e19f",
  "#19c7c2",
  "#1bb8cf",
  "#26a3da",
  "#3b85e0",
  "#4d6dda",
  "#5a5dd0",
  "#664dbf",
  "#6b44b1",
];

/**
 * Color for the item at `index`, wrapping around the palette.
 */
export const getDiscreteColor = (index: number): string =>
  DISCRETE_COLORS[index % DISCRETE_COLORS.length];
