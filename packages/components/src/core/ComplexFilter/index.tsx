import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import DropdownMenu from "src/core/DropdownMenu";
import { StyledPopper } from "src/core/DropdownMenu/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "src/core/InputDropdown";
import Chips from "./components/Chips";
import { StyledChipsWrapper, Wrapper } from "./style";

export {
  InputDropdown as ComplexFilterInputDropdown,
  StyledPopper as ComplexFilterPopper,
};
export interface ComplexFilterProps<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
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
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
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
  isTriggerChangeOnOptionClick = false,
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

  const [value, setValue] = useState(getInitialValue());
  const [pendingValue, setPendingValue] = useState(getInitialValue());

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current === value) {
      return;
    }

    onChange(value);
    setPendingValue(value);
    prevValueRef.current = value;
  }, [onChange, value]);

  const prevPropValueRef = useRef(propValue);

  useEffect(() => {
    if (isControlled && prevPropValueRef.current !== propValue) {
      setValue(propValue);
      prevPropValueRef.current = propValue;
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
          <Chips<T, Multiple, DisableClearable, FreeSolo>
            value={value}
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
        value={multiple ? pendingValue : value}
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
      if (multiple) {
        setValue(pendingValue);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      if (multiple) {
        setPendingValue(value);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose() {
    if (open) {
      setOpen(false);

      if (multiple) {
        setValue(pendingValue);
      }
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
    event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    if (multiple) {
      if (isTriggerChangeOnOptionClick) {
        setPendingValue(newValue);

        return setValue(newValue);
      }

      return setPendingValue(newValue);
    }

    setValue(newValue);

    if (!multiple) setOpen(false);
  }

  function handleDelete(option: DefaultAutocompleteOption) {
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

  function getInitialValue(): AutocompleteValue<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > {
    return multiple
      ? propValue ??
          ([] as unknown as AutocompleteValue<
            T,
            Multiple,
            DisableClearable,
            FreeSolo
          >)
      : propValue ??
          (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }
};

export default ComplexFilter;
