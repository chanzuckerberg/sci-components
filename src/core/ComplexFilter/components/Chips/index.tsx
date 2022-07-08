import React from "react";
import { DefaultDropdownContentOption } from "src/core/DropdownContent";
import { StyledTagFilter } from "./style";

interface Props {
  value: DefaultDropdownContentOption | DefaultDropdownContentOption[] | null;
  multiple?: boolean;
  onDelete: (option: DefaultDropdownContentOption) => void;
}

export default function Chips({
  value,
  multiple = false,
  onDelete,
}: Props): JSX.Element | null {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return <StyledTagFilter label={name} onDelete={onDelete} />;
  }

  return (
    <>
      {(value as DefaultDropdownContentOption[]).map((item) => {
        const { name } = item;

        return (
          <StyledTagFilter
            key={name}
            label={name}
            onDelete={() => onDelete(item)}
          />
        );
      })}
    </>
  );
}
