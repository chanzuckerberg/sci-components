import { AutocompleteProps } from "@mui/material";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useEffect, useState } from "react";
import { EMPTY_OBJECT } from "src/common/utils";
import {
  AutocompleteMultiColumnOption,
  AutocompleteSingleColumnOption,
  DefaultAutocompleteOption,
} from "src/core/Autocomplete";
import DropdownMenu, {
  DropdownMenuProps as SdsDropdownMenuProps,
} from "src/core/DropdownMenu";
import { StyledPaper, StyledPopper } from "src/core/DropdownMenu/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "src/core/InputDropdown";
import { StyledButtonsWrapper } from "./style";
import Button from "../Button";

export {
  InputDropdown as DropdownInputDropdown,
  StyledPaper as DropdownPaper,
  StyledPopper as DropdownPopper,
};

export interface ExtraDropdownProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  buttonPosition?: "left" | "right";
  buttons?: boolean;
  closeOnBlur?: boolean;
  disabled?: boolean;
  label: ReactNode;
  options:
    | AutocompleteSingleColumnOption<T>[]
    | AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>[];
  search?: boolean;
  isSearchAutoFocus?: boolean;
  DropdownMenuProps?: Partial<
    SdsDropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>
  >;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  style?: React.CSSProperties;
  className?: string;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
>;

export type DropdownProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraDropdownProps<T, Multiple, DisableClearable, FreeSolo>;

// eslint-disable-next-line sonarjs/cognitive-complexity
const Dropdown = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: DropdownProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    options,
    label = "",
    multiple = false,
    search = false,
    isSearchAutoFocus = true,
    buttonPosition = "right",
    buttons = false,
    // By default, most dropdowns will close when the user clicks outside the dropdown.
    // The exception is the multiple select variant with Apply/Cancel buttons,
    // which by default will not close on blur. If closeOnBlur is enabled, clicking out
    // is equivalent to clicking the Cancel button, closing the dropdown and losing
    // unapplied changes.
    closeOnBlur = !buttons,
    onClose,
    onChange,
    DropdownMenuProps = {},
    InputDropdownProps,
    InputDropdownComponent = InputDropdown,
    isTriggerChangeOnOptionClick = false,
    disabled = false,
    value: propValue,
    onClick,
    ...rest
  } = props;

  if (buttons && !multiple) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: buttons are only supported for multiple select dropdowns."
    );
  }

  const isMultiColumn = "options" in (options?.[0] || EMPTY_OBJECT);

  const isControlled = propValue !== undefined;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(getInitialValue());
  const [pendingValue, setPendingValue] = useState(getInitialValue());

  const shouldShowButtons =
    buttons && !isTriggerChangeOnOptionClick && multiple;

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
      if (multiple) {
        setPendingValue(propValue);
      }
    }
  }, [isControlled, propValue, multiple]);

  return (
    <>
      <InputDropdownComponent
        disabled={disabled}
        label={label}
        onClick={handleClick}
        {...InputDropdownProps}
        {...rest}
      />
      <DropdownMenu<T, Multiple, DisableClearable, FreeSolo>
        anchorEl={anchorEl}
        open={open}
        search={search}
        onClose={handleClose}
        multiple={multiple as Multiple}
        disableCloseOnSelect={multiple}
        options={options}
        onClickAway={handleClickAway}
        width={250}
        onChange={handleChange}
        value={isMultiColumn ? value : multiple ? pendingValue : value}
        {...{
          isSearchAutoFocus,
          ...DropdownMenuProps,
        }}
        {...rest}
      >
        {shouldShowButtons ? (
          <StyledButtonsWrapper buttonPosition={buttonPosition}>
            {buttonPosition === "left" ? (
              <div>
                <Button
                  onClick={handleButtonClose}
                  sdsStyle="square"
                  sdsType="primary"
                >
                  Apply
                </Button>
                <Button
                  onClick={handleCancel}
                  sdsStyle="square"
                  sdsType="secondary"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handleCancel}
                  sdsStyle="square"
                  sdsType="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleButtonClose}
                  sdsStyle="square"
                  sdsType="primary"
                >
                  Apply
                </Button>
              </div>
            )}
          </StyledButtonsWrapper>
        ) : null}
      </DropdownMenu>
    </>
  );

  function getInitialValue(): AutocompleteValue<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > {
    return multiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }

  function handleChange(
    event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) {
    if (multiple) {
      if (isTriggerChangeOnOptionClick) {
        setPendingValue(newValue);

        return setValueAndCallOnChange(event, newValue, reason, details);
      }

      return setPendingValue(newValue);
    }

    setValueAndCallOnChange(event, newValue, reason, details);

    if (!isMultiColumn) setOpen(false);
  }

  function handleClickAway() {
    if (open) {
      // (masoudmanson): We want to keep the dropdown menu open in two scenarios:
      // 1. If the dropdown has buttons,
      // 2. When there are no buttons, and the closeOnBlur property is set to false,
      // In all other cases, we close the menu.
      if (closeOnBlur && !shouldShowButtons) {
        setOpen(false);
      }

      if (multiple) {
        setValue(pendingValue);
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    onClick?.(event as React.MouseEvent<HTMLDivElement, MouseEvent>);

    if (open) {
      if (!shouldShowButtons) {
        if (multiple) {
          setValue(pendingValue);
        }

        setOpen(false);

        if (anchorEl) {
          anchorEl.focus();
        }
      }
    } else {
      if (multiple) {
        setPendingValue(value);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose(
    event: React.SyntheticEvent,
    reason: AutocompleteCloseReason
  ) {
    // (thuang): We don't want to close the menu when the input is clicked
    if (reason === "toggleInput") {
      return;
    }

    // (masoudmanson): When the dropdown loses focus, we will not close it immediately. Instead, we will update the values and
    // only close the dropdown at the end of this block by calling setOpen(false).
    if (shouldShowButtons && reason === "blur") {
      return;
    }

    if (multiple) {
      setValue(pendingValue);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    if (closeOnBlur) onClose?.(event, reason);

    if (shouldShowButtons) {
      onClose?.(event, reason);
      setOpen(false);
    }
  }

  function handleButtonClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    handleClose(event, "selectOption");
  }

  function handleCancel() {
    if (multiple) {
      // (masoudmanson): To undo the latest actions made on the selections,
      // we set the value of the selection to the pendingValue. This allows us to
      // cancel any recent changes and restore the previous selection state.
      setPendingValue(value);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    setOpen(false);
  }

  function setValueAndCallOnChange(
    event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) {
    setValue(newValue);
    onChange?.(event, newValue, reason, details);
  }
};

export default Dropdown;
