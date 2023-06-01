import { DefaultDropdownMenuOption } from "src/core/DropdownMenu";
import TagFilter from "src/core/TagFilter";

interface Props {
  value: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null;
  multiple?: boolean;
  onDelete: (option: DefaultDropdownMenuOption) => void;
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
      {(value as DefaultDropdownMenuOption[]).map((item) => {
        const { name } = item;

        return (
          <TagFilter key={name} label={name} onDelete={() => onDelete(item)} />
        );
      })}
    </>
  );
};

export default Chips;
