import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";

export const DROPDOWN_MENU_EXCLUDED_CONTROLS = [
  "keepSearchOnSelect",
  "ClickAwayListenerProps",
  "search",
  "multiple",
  "label",
  "groupBy",
  "open",
  "options",
  "title",
  "width",
];

export const DROPDOWN_MENU_LABEL = "Github Labels";

export const DROPDOWN_MENU_POPPER_POSITION = "bottom-start";

export const DROPDOWN_MENU_POPPER_WIDTH = 160;

export const DROPDOWN_MENU_GROUP_BY_OPTIONS = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

export const DROPDOWN_MENU_DATA_OPTIONS = [
  AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
  [AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0], AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1]],
  [
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[2],
  ],
];

export const DROPDOWN_MENU_LIVE_PREVIEW_ROW_STYLES = {
  display: "grid",
  gridColumnGap: 24,
  gridRowGap: 8,
  gridTemplateColumns: "repeat(4, 160px)",
  gridTemplateRows: "repeat(2, auto)",
};

export const DROPDOWN_MENU_LIVE_PREVIEW_LABELS = [
  {
    name: "Menu Item 1",
    section: "Section 1",
  },
  {
    name: "Menu Item 2",
    section: "Section 1",
  },
  {
    name: "Menu Item 3",
    section: "Section 1",
  },
  {
    name: "Menu Item 4",
    section: "Section 2",
  },
  {
    name: "Menu Item 5",
    section: "Section 2",
  },
  {
    name: "Menu Item 6",
    section: "Section 2",
  },
];
