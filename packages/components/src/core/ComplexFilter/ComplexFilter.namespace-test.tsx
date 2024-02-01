import {
  ComplexFilter,
  ComplexFilterProps,
  DefaultAutocompleteOption,
} from "@czi-sds/components";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
];

const ComplexFilterNameSpaceTest = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: ComplexFilterProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  return (
    <ComplexFilter
      label="Click Target"
      onChange={noop}
      multiple
      search
      options={OPTIONS}
      isTriggerChangeOnOptionClick
    />
  );
};
