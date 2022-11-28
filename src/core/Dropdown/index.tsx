import { ClickAwayListener } from "@mui/material";
import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { useEffect, useState } from "react";
import DropdownMenu, { DefaultDropdownMenuOption } from "../DropdownMenu";
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

type RenderFunctionType = (props: any) => JSX.Element;

interface DropdownProps<Multiple> {
  buttonPosition?: "left" | "right";
  buttons?: boolean;
  closeOnBlur?: boolean;
  label: string;
  options: DefaultDropdownMenuOption[];
  onChange: (options: Value<DefaultDropdownMenuOption, Multiple>) => void;
  onClose?: () => void;
  multiple?: Multiple;
  search?: boolean;
  DropdownMenuProps?: Partial<typeof DropdownMenu>;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
  value?: Value<DefaultDropdownMenuOption, Multiple>;
  style?: React.CSSProperties;
  className?: string;
  PopperComponent?: typeof StyledPopper | RenderFunctionType;
  InputDropdownComponent?: typeof InputDropdown;
  isTriggerChangeOnOptionClick?: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Dropdown<Multiple extends boolean | undefined = false>({
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
  ...rest
}: DropdownProps<Multiple>): JSX.Element {
  if (buttons && !multiple) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: buttons are only supported for multiple select dropdowns."
    );
  }

  const isControlled = propValue !== undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    Value<DefaultDropdownMenuOption, Multiple>
  >(getInitialValue());

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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <InputDropdownComponent
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
          {...DropdownMenuProps}
        >
          {buttons ? (
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
      </div>
    </ClickAwayListener>
  );

  function handleClickAway() {
    if (open) {
      setOpen(false);

      if (multiple) {
        setValue(pendingValue as MUIValue<Multiple>);
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      if (multiple) {
        setValue(pendingValue as MUIValue<Multiple>);
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

    if (buttons && reason === "blur") {
      if (closeOnBlur) {
        handleCancel();
      }
      return;
    }

    if (multiple) {
      setValue(pendingValue as Value<DefaultDropdownMenuOption, Multiple>);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    if (onClose) onClose();
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
    setPendingValue(null);

    if (anchorEl) {
      anchorEl.focus();
    }

    if (onClose) onClose();
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
