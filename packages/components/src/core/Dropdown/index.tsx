import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useEffect, useState } from "react";
import DropdownMenu, {
  DefaultDropdownMenuOption,
  DropdownMenuProps as SdsDropdownMenuProps,
} from "../DropdownMenu";
import { StyledPaper, StyledPopper } from "../DropdownMenu/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import { StyledButton } from "./style";

export {
  StyledPaper as DropdownPaper,
  StyledPopper as DropdownPopper,
  InputDropdown as DropdownInputDropdown,
};

// (thuang): Value's type is based on generic type placeholder (T) and Multiple
// type. If Multiple is true, Value's type is T[] | null.
// Otherwise, Value's type is T | null.
// Conditional Type
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
export type Value<T, Multiple> = Multiple extends undefined | false
  ? T | null
  : Array<T> | null;

export type MUIValue<Multiple> = AutocompleteValue<
  DefaultDropdownMenuOption,
  Multiple,
  undefined,
  undefined
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunctionType = (props: any) => JSX.Element;

export interface DropdownProps<Multiple extends boolean | undefined> {
  buttonPosition?: "left" | "right";
  buttons?: boolean;
  closeOnBlur?: boolean;
  disabled?: boolean;
  label: ReactNode;
  options: DefaultDropdownMenuOption[];
  onChange: (options: Value<DefaultDropdownMenuOption, Multiple>) => void;
  onClose?: () => void;
  multiple?: Multiple;
  search?: boolean;
  DropdownMenuProps?: Partial<
    SdsDropdownMenuProps<
      DefaultDropdownMenuOption,
      Multiple,
      undefined,
      undefined
    >
  >;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultDropdownMenuOption, Multiple>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper | RenderFunctionType;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const Dropdown = <Multiple extends boolean | undefined = false>({
  options,
  label = "",
  multiple = false,
  search = false,
  buttonPosition = "right",
  buttons = false,
  // By default, most dropdowns will close when the user clicks outside the dropdown.
  // The exception is the multiple select variant with Apply/Cancel buttons,
  // which by default will not close on blur. If closeOnBlur is enabled, clicking out
  // is equivalent to clicking the Cancel button, closing the dropdown and losing
  // unapplied changes.
  closeOnBlur = !buttons,
  onChange,
  onClose,
  DropdownMenuProps = {},
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  PopperComponent,
  InputDropdownComponent = InputDropdown,
  isTriggerChangeOnOptionClick = false,
  disabled = false,
  ...rest
}: DropdownProps<Multiple>): JSX.Element => {
  if (buttons && !multiple) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: buttons are only supported for multiple select dropdowns."
    );
  }

  const isControlled = propValue !== undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] =
    useState<Value<DefaultDropdownMenuOption, Multiple>>(getInitialValue);

  const [pendingValue, setPendingValue] = useState<
    Value<DefaultDropdownMenuOption, true>
  >([]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue]);

  const [open, setOpen] = useState(false);

  const shouldShowButtons =
    buttons && !isTriggerChangeOnOptionClick && multiple;

  return (
    <>
      <InputDropdownComponent
        disabled={disabled}
        label={label}
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        {...InputDropdownProps}
        {...rest}
      />
      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        search={search}
        onClose={handleClose}
        multiple={multiple as Multiple}
        value={(multiple ? pendingValue : value) as MUIValue<Multiple>}
        onChange={handleChange}
        disableCloseOnSelect={multiple}
        PopperComponent={PopperComponent}
        PopperBaseProps={{ sx: { minWidth: 250 } }}
        options={options}
        onClickAway={handleClickAway}
        {...DropdownMenuProps}
      >
        {shouldShowButtons ? (
          <div>
            {buttonPosition === "left" ? (
              <div>
                <StyledButton
                  onClick={handleClose}
                  sdsStyle="square"
                  sdsType="primary"
                >
                  Apply
                </StyledButton>
                <StyledButton
                  onClick={handleCancel}
                  sdsStyle="square"
                  sdsType="secondary"
                >
                  Cancel
                </StyledButton>
              </div>
            ) : (
              <div>
                <StyledButton
                  onClick={handleCancel}
                  sdsStyle="square"
                  sdsType="secondary"
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={handleClose}
                  sdsStyle="square"
                  sdsType="primary"
                >
                  Apply
                </StyledButton>
              </div>
            )}
          </div>
        ) : null}
      </DropdownMenu>
    </>
  );

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
        setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      if (multiple) {
        setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }
    } else {
      if (multiple) {
        setPendingValue(value as MUIValue<true>);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleClose(
    _: React.ChangeEvent<unknown>,
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
      setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    if (closeOnBlur) onClose?.();

    if (shouldShowButtons) {
      onClose?.();
      setOpen(false);
    }
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    if (multiple) {
      if (isTriggerChangeOnOptionClick) {
        setPendingValue(newValue as Value<DefaultDropdownMenuOption, true>);
        return setValue(newValue as Value<DefaultDropdownMenuOption, Multiple>);
      }

      return setPendingValue(
        newValue as Value<DefaultDropdownMenuOption, true>
      );
    }

    setValue(newValue as Value<DefaultDropdownMenuOption, Multiple>);
    setOpen(false);
  }

  function handleCancel() {
    if (multiple) {
      // (masoudmanson): To undo the latest actions made on the selections,
      // we set the value of the selection to the pendingValue. This allows us to
      // cancel any recent changes and restore the previous selection state.
      setPendingValue(value as Value<DefaultDropdownMenuOption, true>);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    onClose?.();
    setOpen(false);
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

export default Dropdown;
