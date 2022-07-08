import { ClickAwayListener } from "@mui/base";
import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { useEffect, useState } from "react";
import { Value } from "../Dropdown";
import DropdownContent, {
  DefaultDropdownContentOption,
} from "../DropdownContent";
import { StyledPopper } from "../DropdownContent/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import Chips from "./components/Chips";
import { StyledChipsWrapper, Wrapper } from "./style";

export {
  StyledPopper as ComplexFilterPopper,
  InputDropdown as ComplexFilterInputDropdown,
};
interface ComplexFilterProps<Multiple> {
  label: string;
  options: DefaultDropdownContentOption[];
  multiple?: Multiple;
  search?: boolean;
  onChange: (options: Value<DefaultDropdownContentOption, Multiple>) => void;
  DropdownContentProps?: Partial<typeof DropdownContent>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultDropdownContentOption, Multiple>;
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
  DropdownContentProps = {},
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  PopperComponent,
  InputDropdownComponent = InputDropdown,
  isTriggerChangeOnOptionClick = false,
  ...rest
}: ComplexFilterProps<Multiple>): JSX.Element {
  const isControlled = propValue !== undefined;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    Value<DefaultDropdownContentOption, Multiple>
  >(getInitialValue());

  const [pendingValue, setPendingValue] = useState<
    DefaultDropdownContentOption[]
  >(getInitialValue() as DefaultDropdownContentOption[]);

  useEffect(() => {
    onChange(value);
    setPendingValue(value as DefaultDropdownContentOption[]);
  }, [value]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue]);

  // * (mlila): likely, this portion on ComplexFilter will need to be replaced with Dropdown (or a
  // * new DropdownFilter) component. As ComplexFilter evolves, there will be more types added,
  // * such as sliders for ranges, inline multi selects, etc.
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <Wrapper {...rest}>
            <InputDropdownComponent
              label={label}
              onClick={handleClick}
              sdsStage={open ? "userInput" : "default"}
              {...InputDropdownProps}
            />

            <StyledChipsWrapper>
              <Chips
                value={value}
                multiple={multiple}
                onDelete={handleDelete}
              />
            </StyledChipsWrapper>
          </Wrapper>

          <DropdownContent
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuSelectClose}
            search={search}
            multiple={multiple as Multiple}
            value={
              (multiple ? pendingValue : value) as AutocompleteValue<
                DefaultDropdownContentOption,
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
            {...DropdownContentProps}
          />
        </div>
      </ClickAwayListener>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      if (multiple) {
        setValue(pendingValue as Value<DefaultDropdownContentOption, Multiple>);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      if (multiple) {
        setPendingValue(value as DefaultDropdownContentOption[]);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose() {
    if (open) {
      setOpen(false);

      if (multiple) {
        setValue(pendingValue as Value<DefaultDropdownContentOption, Multiple>);
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
    newValue:
      | DefaultDropdownContentOption
      | DefaultDropdownContentOption[]
      | null
  ) {
    if (multiple) {
      if (isTriggerChangeOnOptionClick) {
        setPendingValue(newValue as DefaultDropdownContentOption[]);
        return setValue(
          newValue as Value<DefaultDropdownContentOption, Multiple>
        );
      }

      return setPendingValue(newValue as DefaultDropdownContentOption[]);
    }

    setValue(newValue as Value<DefaultDropdownContentOption, Multiple>);
    setOpen(false);
  }

  function handleDelete(option: DefaultDropdownContentOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue =
      (value as DefaultDropdownContentOption[])?.filter(
        (item) => item !== option
      ) || null;

    setValue(newValue as Value<DefaultDropdownContentOption, Multiple>);
  }

  function getInitialValue(): Value<DefaultDropdownContentOption, Multiple> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as Value<DefaultDropdownContentOption, Multiple>)
      : null;
  }
}
