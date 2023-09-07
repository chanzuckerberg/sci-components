import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useEffect, useState } from "react";
import { Value } from "../Dropdown";
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
export interface ComplexFilterProps<Multiple> {
  label: ReactNode;
  options: DefaultDropdownMenuOption[];
  multiple?: Multiple;
  search?: boolean;
  onChange: (options: Value<DefaultDropdownMenuOption, Multiple>) => void;
  DropdownMenuProps?: Partial<typeof DropdownMenu>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultDropdownMenuOption, Multiple>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const ComplexFilter = <Multiple extends boolean | undefined = false>({
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
}: ComplexFilterProps<Multiple>): JSX.Element => {
  const isControlled = propValue !== undefined;

  const [open, setOpen] = useState(false);
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
  }, [value, onChange]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue, isControlled]);

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

      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuSelectClose}
        search={search}
        multiple={multiple as Multiple}
        value={
          (multiple ? pendingValue : value) as AutocompleteValue<
            DefaultDropdownMenuOption,
            Multiple,
            undefined,
            undefined
          >
        }
        onChange={handleChange}
        disableCloseOnSelect={multiple}
        options={options}
        PopperComponent={PopperComponent}
        PopperBaseProps={{ sx: { minWidth: 250 } }}
        onClickAway={handleClose}
        {...DropdownMenuProps}
      />
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      if (multiple) {
        setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      if (multiple) {
        setPendingValue(value as DefaultDropdownMenuOption[]);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose() {
    if (open) {
      setOpen(false);

      if (multiple) {
        setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
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
    setOpen(false);
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
};

export default ComplexFilter;
