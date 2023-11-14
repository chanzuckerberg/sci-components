import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useEffect, useState } from "react";
import DropdownMenu, { DefaultDropdownMenuOption } from "../DropdownMenu";
import { StyledPopper } from "../DropdownMenu/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import Chips from "./components/Chips";
import { StyledChipsWrapper, Wrapper } from "./style";

export {
  InputDropdown as ComplexFilterInputDropdown,
  StyledPopper as ComplexFilterPopper,
};
export interface ComplexFilterProps<
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> {
  label: ReactNode;
  options: T[];
  multiple?: Multiple;
  search?: boolean;
  onChange: (
    options: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => void;
  DropdownMenuProps?: Partial<typeof DropdownMenu>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const ComplexFilter = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  options,
  label = "",
  multiple = false,
  search = false,
  onChange,
  DropdownMenuProps = {},
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  PopperComponent,
  InputDropdownComponent = InputDropdown,
  ...rest
}: ComplexFilterProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>): JSX.Element => {
  const isControlled = propValue !== undefined;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >
  );

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [isControlled, propValue]);

  // * (mlila): likely, this portion on ComplexFilter will need to be replaced with Dropdown (or a
  // * new DropdownFilter) component. As ComplexFilter evolves, there will be more types added,
  // * such as sliders for ranges, inline multi selects, etc.
  return (
    <>
      <Wrapper {...rest}>
        <InputDropdownComponent
          label={label}
          onClick={handleClick}
          sdsStage={open ? "userInput" : "default"}
          {...InputDropdownProps}
        />

        <StyledChipsWrapper>
          <Chips
            value={
              value as
                | DefaultDropdownMenuOption
                | DefaultDropdownMenuOption[]
                | null
            }
            multiple={multiple}
            onDelete={handleDelete}
          />
        </StyledChipsWrapper>
      </Wrapper>

      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuSelectClose}
        search={search}
        multiple={multiple as Multiple}
        value={value}
        onChange={handleChange}
        disableCloseOnSelect={multiple}
        options={options}
        PopperComponent={PopperComponent}
        PopperBaseProps={{ sx: { minWidth: 250 } }}
        onClickAway={handleClose}
        {...DropdownMenuProps}
        {...rest}
      />
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose() {
    if (open) {
      setOpen(false);
    }
  }

  function handleMenuSelectClose(
    event: React.ChangeEvent<unknown>,
    reason: AutocompleteCloseReason
  ) {
    const reasons = ["escape", "select-option"];

    if (reasons.includes(reason)) {
      handleClose();
    }
  }

  function handleChange(
    event: React.ChangeEvent<unknown>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
    onChange?.(newValue);
    if (!multiple) {
      setOpen(false);
    }
  }

  function handleDelete(option: DefaultDropdownMenuOption) {
    if (!multiple) {
      return setValue(
        null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
    }

    const newValue = (value as T[])?.filter((item) => item !== option) || null;

    setValue(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }
};

export default ComplexFilter;
