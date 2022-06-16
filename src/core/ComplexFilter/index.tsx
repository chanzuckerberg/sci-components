import { ClickAwayListener } from "@material-ui/core";
import { AutocompleteCloseReason, Value as MUIValue } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Value } from "../Dropdown";
import DropdownMenu, { DefaultDropdownMenuOption } from "../DropdownMenu";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import Chips from "./components/Chips";
import { StyledChipsWrapper, StyledPopper, Wrapper } from "./style";

export {
  StyledPopper as ComplexFilterPopper,
  InputDropdown as ComplexFilterInputDropdown,
};
interface ComplexFilterProps<Multiple> {
  label: string;
  options: DefaultDropdownMenuOption[];
  multiple?: Multiple;
  search?: boolean;
  onChange: (options: Value<DefaultDropdownMenuOption, Multiple>) => void;
  MenuSelectProps?: Partial<typeof DropdownMenu>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultDropdownMenuOption, Multiple>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
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
  InputDropdownComponent = InputDropdown,
  isTriggerChangeOnOptionClick = false,
  ...rest
}: ComplexFilterProps<Multiple>): JSX.Element {
  const isControlled = propValue !== undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    Value<DefaultDropdownMenuOption, Multiple>
  >(getInitialValue());

  const [pendingValue, setPendingValue] = useState<DefaultDropdownMenuOption[]>(
    getInitialValue() as DefaultDropdownMenuOption[]
  );

  useEffect(() => {
    onChange(value);
    setPendingValue(value as DefaultDropdownMenuOption[]);
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

        <StyledChipsWrapper>
          <Chips value={value} multiple={multiple} onDelete={handleDelete} />
        </StyledChipsWrapper>
      </Wrapper>
      <PopperComponent open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <DropdownMenu
              open
              onClose={handleMenuSelectClose}
              search={search}
              multiple={multiple as Multiple}
              value={
                (multiple ? pendingValue : value) as MUIValue<
                  DefaultDropdownMenuOption,
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
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    if (multiple) {
      setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
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
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    if (multiple) {
      if (isTriggerChangeOnOptionClick) {
        setPendingValue(newValue as DefaultDropdownMenuOption[]);
        return setValue(newValue as Value<DefaultDropdownMenuOption, Multiple>);
      }

      return setPendingValue(newValue as DefaultDropdownMenuOption[]);
    }

    setValue(newValue as Value<DefaultDropdownMenuOption, Multiple>);
  }

  function handleDelete(option: DefaultDropdownMenuOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue =
      (value as DefaultDropdownMenuOption[])?.filter(
        (item) => item !== option
      ) || null;

    setValue(newValue as Value<DefaultDropdownMenuOption, Multiple>);
  }

  function getInitialValue(): Value<DefaultDropdownMenuOption, Multiple> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as Value<DefaultDropdownMenuOption, Multiple>)
      : null;
  }
}
