import { AutocompleteValue } from "@mui/base";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import TagFilter from "src/core/TagFilter";
import { checkIfSingleColumn } from "../../utils";

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

const getSingleColumnLabels = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
  multiple: boolean
): string[] => {
  const labels: string[] = [];

  if (multiple && Array.isArray(value)) {
    value.forEach((item) => {
      if ((item as T)?.name) labels.push((item as T).name);
    });
  } else if (
    !Array.isArray(value) &&
    value &&
    typeof value === "object" &&
    "name" in value
  ) {
    labels.push(value.name);
  }

  return labels;
};

const getMultiColumnLabels = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
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
      if (item?.name) labels.push(item.name);
    });
  }

  return labels;
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
    ? getSingleColumnLabels<T, Multiple, DisableClearable, FreeSolo>(
        value,
        multiple
      )
    : getMultiColumnLabels<T, Multiple, DisableClearable, FreeSolo>(
        value,
        multiple
      );

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
