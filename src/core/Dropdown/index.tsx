import { AutocompleteCloseReason, Value as MUIValue } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import DropdownMenu, { DefaultDropdownMenuOption } from "../DropdownMenu";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import { StyledButton, StyledPopper } from "./style";

export {
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

type RenderFunctionType = (props: any) => JSX.Element;

interface DropdownProps<Multiple> {
  buttonPosition?: "left" | "right";
  buttons?: boolean;
  closeOnBlur?: boolean;
  label: string;
  options: DefaultDropdownMenuOption[];
  onChange: (options: Value<DefaultDropdownMenuOption, Multiple>) => void;
  multiple?: Multiple;
  search?: boolean;
  MenuSelectProps?: Partial<typeof DropdownMenu>;
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
  MenuSelectProps = {},
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  PopperComponent = StyledPopper,
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

  const open = Boolean(anchorEl);

  return (
    <>
      <InputDropdownComponent
        label={label}
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        {...InputDropdownProps}
        {...rest}
      />
      <PopperComponent open={open} anchorEl={anchorEl} placement="bottom-start">
        <DropdownMenu
          open
          search={search}
          onClose={handleClose}
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
        {buttons && (
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
        )}
      </PopperComponent>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultDropdownMenuOption[]);
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

    setAnchorEl(null);
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

  function handleCancel() {
    setPendingValue(null);

    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
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
