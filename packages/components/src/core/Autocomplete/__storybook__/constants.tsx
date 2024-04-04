import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";

export const AUTOCOMPLETE_EXCLUDED_CONTROLS = [
  "search",
  "keepSearchOnSelect",
  "multiple",
  "blurOnSelect",
  "clearOnBlur",
  "groupBy",
  "label",
  "options",
];

export const AUTOCOMPLETE_GROUP_BY_OPTIONS = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

export const AUTOCOMPLETE_WRAPPER_STYLES = {
  margin: "16px 0 0 24px",
  width: 274,
};

export const AUTOCOMPLETE_DIV_MARGIN = "10px 0 0 24px";

export const AUTOCOMPLETE_LABEL = "Search by label";

export const AUTOCOMPLETE_DATA_OPTIONS = [
  AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
  [AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0], AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1]],
  [
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[2],
  ],
];
