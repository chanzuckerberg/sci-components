import { ClickAwayListener } from "@material-ui/core";
import { AutocompleteCloseReason, Value as MUIValue } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";
import { Value } from "../Dropdown";
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
interface ComplexFilterProps<Multiple> {
  label: string;
  options: DefaultMenuSelectOption[];
  multiple?: Multiple;
  search?: boolean;
  onChange: (options: Value<DefaultMenuSelectOption, Multiple>) => void;
  MenuSelectProps?: Partial<typeof MenuSelect>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultMenuSelectOption, Multiple>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper;
  PaperComponent?: typeof StyledPaper;
  InputDropdownComponent?: typeof InputDropdown;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function ComplexFilter<
  Multiple extends boolean | undefined = false
>({
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
}: ComplexFilterProps<Multiple>): JSX.Element {
  const isControlled = propValue !== undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<Value<DefaultMenuSelectOption, Multiple>>(
    getInitialValue()
  );

  const [pendingValue, setPendingValue] = useState<
    Value<DefaultMenuSelectOption, true>
  >([]);

  // Store pending value in ref so that the click away listener can access the
  // updated pending value state.
  const pendingValueRef = useRef(pendingValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue]);

  const open = Boolean(anchorEl);

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

        <div>
          <Chips value={value} multiple={multiple} onDelete={handleDelete} />
        </div>
      </Wrapper>
      <PopperComponent open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <MenuSelect
              open
              onClose={handleMenuSelectClose}
              search={search}
              multiple={multiple as Multiple}
              PaperComponent={PaperComponent}
              value={
                (multiple ? pendingValue : value) as MUIValue<
                  DefaultMenuSelectOption,
                  Multiple,
                  undefined,
                  undefined
                >
              }
              onChange={handleChange}
              disableCloseOnSelect={multiple}
              options={options}
              {...MenuSelectProps}
            />
          </div>
        </ClickAwayListener>
      </PopperComponent>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultMenuSelectOption[]);
    }

    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    if (multiple) {
      // Set pending value from ref on close. This needs to happen through a ref
      // because when the click away listener is rendered initially, it uses an
      // instance of `handleClose()` that forms a closure around the initial
      // state of `pendingValue`. Because of this, when the click away listener
      // calls `handleClose()`, it will always call `setValue()` with the stale
      // pending state.
      setValue(
        pendingValueRef.current as Value<DefaultMenuSelectOption, Multiple>
      );
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null
  ) {
    if (multiple) {
      pendingValueRef.current = newValue as DefaultMenuSelectOption[];
      return setPendingValue(newValue as DefaultMenuSelectOption[]);
    }

    setValue(newValue as Value<DefaultMenuSelectOption, Multiple>);
  }

  function handleDelete(option: DefaultMenuSelectOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue =
      (value as Value<DefaultMenuSelectOption, true>)?.filter(
        (item) => item !== option
      ) || null;

    setValue(newValue as Value<DefaultMenuSelectOption, Multiple>);
  }

  function getInitialValue(): Value<DefaultMenuSelectOption, Multiple> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as Value<DefaultMenuSelectOption, Multiple>)
      : null;
  }
}
