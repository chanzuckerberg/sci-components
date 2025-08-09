import { AutocompleteValue } from "@mui/base";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import TagFilter from "src/core/TagFilter";

interface Props<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  multiple?: boolean;
  onDelete: (tag: string) => void;
}

// Helper functions to reduce cognitive complexity
const getSingleColumnLabels = <T extends DefaultAutocompleteOption>(
  value: unknown,
  multiple: boolean
): string[] => {
  const labels: string[] = [];

  if (multiple && Array.isArray(value)) {
    value.forEach((item) => {
      const typedItem = item as T;
      if (typedItem?.name) labels.push(typedItem.name);
    });
  } else if (!Array.isArray(value) && value) {
    const typedValue = value as T;
    if (typedValue.name) labels.push(typedValue.name);
  }

  return labels;
};

const getMultiColumnLabels = <T extends DefaultAutocompleteOption>(
  value: unknown,
  multiple: boolean
): string[] => {
  const labels: string[] = [];

  if (!value || typeof value !== "object") return labels;

  if (multiple) {
    Object.values(value).forEach((items) => {
      if (Array.isArray(items)) {
        (items as T[]).forEach((item) => {
          if (item?.name) labels.push(item.name);
        });
      }
    });
  } else {
    Object.values(value).forEach((item) => {
      const typedItem = item as T;
      if (typedItem?.name) labels.push(typedItem.name);
    });
  }

  return labels;
};

const checkIfSingleColumn = <T extends DefaultAutocompleteOption>(
  value: unknown
): boolean => {
  return ((value && (value as T).name) ||
    (Array.isArray(value) &&
      value.length > 0 &&
      (value as T[])[0].name)) as boolean;
};

const Chips = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  value,
  multiple = false,
  onDelete,
}: Props<T, Multiple, DisableClearable, FreeSolo>): JSX.Element | null => {
  if (!value) return null;

  const isSingleColumn = checkIfSingleColumn<T>(value);
  const chipLabels = isSingleColumn
    ? getSingleColumnLabels<T>(value, multiple)
    : getMultiColumnLabels<T>(value, multiple);

  if (chipLabels.length === 0) return null;

  return (
    <>
      {chipLabels.map((label) => (
        <TagFilter
          key={label}
          label={label}
          onDelete={() => onDelete(label)}
          onClick={() => onDelete(label)}
        />
      ))}
    </>
  );
};

export default Chips;
