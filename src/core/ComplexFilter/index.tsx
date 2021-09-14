import { AutocompleteCloseReason } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import MenuSelect, { DefaultMenuSelectOption } from "../MenuSelect";
import Chips from "./components/Chips";
import { StyledPaper, StyledPopper, Wrapper } from "./style";

export {
  StyledPopper as ComplexFilterPopper,
  StyledPaper as ComplexFilterPaper,
  InputDropdown as ComplexFilterInputDropdown,
};

export type ComplexFilterValue =
  | DefaultMenuSelectOption[]
  | DefaultMenuSelectOption
  | null;

interface ComplexFilterProps {
  label: string;
  options: DefaultMenuSelectOption[];
  multiple?: boolean;
  search?: boolean;
  onChange: (options: ComplexFilterValue) => void;
  MenuSelectProps?: Partial<typeof MenuSelect>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: ComplexFilterValue;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper;
  PaperComponent?: typeof StyledPaper;
  InputDropdownComponent?: typeof InputDropdown;
}

export default function ComplexFilter({
  options,
  label = "",
  multiple = false,
  search = false,
  onChange,
  MenuSelectProps = {},
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  PopperComponent = StyledPopper,
  PaperComponent = StyledPaper,
  InputDropdownComponent = InputDropdown,
  ...rest
}: ComplexFilterProps): JSX.Element {
  const isControlled = propValue !== undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    null | DefaultMenuSelectOption | DefaultMenuSelectOption[]
  >(getInitialValue());

  const [pendingValue, setPendingValue] = useState<
    null | DefaultMenuSelectOption[]
  >([]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue as ComplexFilterValue);
    }
  }, [propValue]);

  const open = Boolean(anchorEl);

  return (
    <>
      <Wrapper {...rest}>
        <InputDropdownComponent
          label={label}
          onClick={handleClick}
          {...InputDropdownProps}
        />

        <div>
          <Chips value={value} multiple={multiple} onDelete={handleDelete} />
        </div>
      </Wrapper>
      <PopperComponent open={open} anchorEl={anchorEl}>
        <MenuSelect
          open
          search={search}
          onClose={handleClose}
          multiple={multiple}
          PaperComponent={PaperComponent}
          value={multiple ? pendingValue : value}
          onChange={handleChange}
          disableCloseOnSelect={multiple}
          options={options}
          {...MenuSelectProps}
        />
      </PopperComponent>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultMenuSelectOption[]);
    }

    setAnchorEl(event.currentTarget);
  }

  function handleClose(
    _: React.ChangeEvent<unknown>,
    reason: AutocompleteCloseReason
  ) {
    // (thuang): We don't want to close the menu when the input is clicked
    if (reason === "toggleInput") {
      return;
    }

    if (multiple) {
      setValue(pendingValue);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null
  ) {
    if (multiple) {
      return setPendingValue(newValue as DefaultMenuSelectOption[]);
    }

    setValue(newValue as DefaultMenuSelectOption);
  }

  function handleDelete(option: DefaultMenuSelectOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue = (value as DefaultMenuSelectOption[]).filter(
      (item) => item !== option
    );

    setValue(newValue);
  }

  function getInitialValue() {
    if (isControlled) {
      return propValue as ComplexFilterValue;
    }

    return multiple ? [] : null;
  }
}
