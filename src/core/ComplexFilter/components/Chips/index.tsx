import React from "react";
import { DefaultDropdownMenuOption } from "src/core/DropdownMenu";
import { StyledChip } from "./style";

interface Props {
  value: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null;
  multiple?: boolean;
  onDelete: (option: DefaultDropdownMenuOption) => void;
}

export default function Chips({
  value,
  multiple = false,
  onDelete,
}: Props): JSX.Element | null {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return <StyledChip size="medium" label={name} onDelete={onDelete} />;
  }

  return (
    <>
      {(value as DefaultDropdownMenuOption[]).map((item) => {
        const { name } = item;

        return (
          <StyledChip
            size="medium"
            key={name}
            label={name}
            onDelete={() => onDelete(item)}
          />
        );
      })}
    </>
  );
}
