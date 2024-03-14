import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { noop } from "src/common/utils";

export const DROPDOWN_EXCLUDED_CONTROLS = [
  "buttonPosition",
  "label",
  "onChange",
  "DropdownMenuProps",
  "buttons",
  "closeOnBlur",
  "disabled",
  "multiple",
  "onClose",
  "options",
  "search",
  "isTriggerChangeOnOptionClick",
];

export const DROPDOWN_ON_CHANGE_OPTIONS = [
  noop,
  (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
];
export const DROPDOWN_ON_CLOSE_OPTIONS = [
  noop,
  () => {
    // eslint-disable-next-line no-console
    console.log("Closed!");
  },
];
export const DROPDOWN_BUTTON_POSITION_OPTIONS = ["left", "right"];
export const DROPDOWN_DATA_OPTIONS = [
  AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
  [AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0], AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1]],
  [
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[2],
  ],
];
export const DROPDOWN_LABEL = "Click Target";
