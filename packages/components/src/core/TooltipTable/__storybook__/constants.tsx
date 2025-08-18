export const TOOLTIP_TABLE_EXCLUDED_CONTROLS = ["contentAlert", "itemAlign"];

const TOOLTIP_TABLE_ROWS = [
  { label: "Label 1", value: 1 },
  { label: "Label 2", value: 2 },
  { label: "Label 3", value: 3 },
  { label: "Label 4", value: 4 },
  { label: "Label 5 ", value: 5 },
  { label: "Label 6", value: 6 },
  { label: "Label 7", value: 7 },
  { label: "Label 8", value: 8 },
  { label: "Label 9", value: 9 },
  { label: "Label 10", value: 10 },
  { label: "Label 11", value: 11 },
  { label: "Label 12", value: 12 },
  { label: "Label 13", value: 13 },
  { label: "Label 14", value: 14 },
  { label: "Label 15", value: 15 },
];

export const TOOLTIP_TABLE_DATA = [
  {
    dataRows: TOOLTIP_TABLE_ROWS.slice(0, 3),
    label: "Section 1",
  },
  {
    dataRows: TOOLTIP_TABLE_ROWS.slice(3, 7),
    label: "Section 2",
  },
  {
    dataRows: TOOLTIP_TABLE_ROWS.slice(7, 10),
    label: "Section 3",
  },
];

export const TOOLTIP_TABLE_LIVE_PREVIEW_STYLES = {
  alignItems: "stretch",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-start",
};

export const TOOLTIP_TABLE_TOOLTIP_STYLE_MOCK = {
  flexGrow: 1,
};
