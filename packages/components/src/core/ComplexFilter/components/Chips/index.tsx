import { DefaultAutocompleteOption } from "src/core/AutocompleteBase";
import TagFilter from "src/core/TagFilter";

interface Props {
  value: DefaultAutocompleteOption | DefaultAutocompleteOption[] | null;
  multiple?: boolean;
  onDelete: (option: DefaultAutocompleteOption) => void;
}

const Chips = ({
  value,
  multiple = false,
  onDelete,
}: Props): JSX.Element | null => {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return <TagFilter label={name} onDelete={onDelete} />;
  }

  return (
    <>
      {(value as DefaultAutocompleteOption[]).map((item) => {
        const { name } = item;

        return (
          <TagFilter key={name} label={name} onDelete={() => onDelete(item)} />
        );
      })}
    </>
  );
};

export default Chips;
