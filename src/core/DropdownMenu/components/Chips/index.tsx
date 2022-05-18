import React from "react";
import { DefaultMenuSelectOption } from "src/core/MenuSelect";
import { StyledChip } from "./style";

interface Props {
  value: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null;
  multiple?: boolean;
  onDelete: (option: DefaultMenuSelectOption) => void;
}

export default function Chips({
  value,
  multiple = false,
  onDelete,
}: Props): JSX.Element | null {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as DefaultMenuSelectOption;

    return <StyledChip size="medium" label={name} onDelete={onDelete} />;
  }

  return (
    <>
      {(value as DefaultMenuSelectOption[]).map((item) => {
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
