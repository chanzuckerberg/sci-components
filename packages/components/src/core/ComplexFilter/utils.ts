import { DefaultAutocompleteOption } from "src/core/Autocomplete";

export const checkIfSingleColumn = <T extends DefaultAutocompleteOption>(
  value: unknown
): boolean => {
  return ((value && (value as T).name) ||
    (Array.isArray(value) &&
      value.length > 0 &&
      (value as T[])[0].name)) as boolean;
};
