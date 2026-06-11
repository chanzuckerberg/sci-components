import { Args } from "@storybook/react-vite";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { noop } from "@components/src/common/utils";
import { DefaultAutocompleteOption } from "@components/src/core/Autocomplete";
import RawComplexFilter from "@components/src/core/ComplexFilter";

export const TestDemo = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  return (
    <RawComplexFilter
      label="Click Target"
      onChange={noop}
      options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
      {...props}
    />
  );
};
