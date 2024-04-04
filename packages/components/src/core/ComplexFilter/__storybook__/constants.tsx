import { noop } from "src/common/utils";

export const COMPLEX_FILTER_EXCLUDED_CONTROLS = [
  "label",
  "multiple",
  "onChange",
  "search",
  "keepSearchOnSelect",
];

export const COMPLEX_FILTER_ON_CHANGE_OPTIONS = [
  noop,
  (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
];

export const COMPLEX_FILTER_LIVE_PREVIEW_STYLES = {
  display: "grid",
  gridColumnGap: 30,
  gridTemplateColumns: "repeat(3, min-content)",
};

export const COMPLEX_FILTER_LIVE_PREVIEW_OPTIONS = [
  { name: "Filter Item 1" },
  { name: "Filter Item 2" },
  { name: "Filter Item 3" },
];
