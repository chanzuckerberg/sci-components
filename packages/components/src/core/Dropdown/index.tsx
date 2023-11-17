import { AutocompleteProps } from "@mui/material";
import {
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, { ReactNode, useState } from "react";
import {
  AutocompleteMultiColumnOption,
  AutocompleteSingleColumnOption,
  DefaultAutocompleteOption,
} from "../Autocomplete";
import DropdownMenu, {
  DropdownMenuProps as SdsDropdownMenuProps,
} from "../DropdownMenu";
import { StyledPaper, StyledPopper } from "../DropdownMenu/style";
import InputDropdown, {
  InputDropdownProps as InputDropdownPropsType,
} from "../InputDropdown";
import { StyledButton, StyledButtonsWrapper } from "./style";

export {
  InputDropdown as DropdownInputDropdown,
  StyledPaper as DropdownPaper,
  StyledPopper as DropdownPopper,
};

// (masoudmanson): This can be removed since we no longer need it
// (thuang): Value's type is based on generic type placeholder (T) and Multiple
// type. If Multiple is true, Value's type is T[] | null.
// Otherwise, Value's type is T | null.
// Conditional Type
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
export type Value<T, Multiple> = Multiple extends undefined | false
  ? T | null
  : Array<T> | null;

// (masoudmanson): This can be removed since we no longer need it
export type MUIValue<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type RenderFunctionType = (props: any) => JSX.Element;

export interface ExtraDropdownProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> {
  buttonPosition?: "left" | "right";
  buttons?: boolean;
  closeOnBlur?: boolean;
  disabled?: boolean;
  label: ReactNode;
  options:
    | AutocompleteSingleColumnOption<T>[]
    | AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>[];
  onClose?: () => void;
  search?: boolean;
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
  FreeSolo extends boolean | undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type DropdownProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraDropdownProps<T, Multiple, DisableClearable, FreeSolo>;

// eslint-disable-next-line sonarjs/cognitive-complexity
const Dropdown = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: DropdownProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
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
    onClose,
    DropdownMenuProps = {},
    InputDropdownProps = { sdsStyle: "minimal" },
    InputDropdownComponent = InputDropdown,
    isTriggerChangeOnOptionClick = false,
    disabled = false,
    ...rest
  } = props;

  if (buttons && !multiple) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: buttons are only supported for multiple select dropdowns."
    );
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
        data-testid="dropdown"
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
        {...DropdownMenuProps}
        {...rest}
      >
        {shouldShowButtons ? (
          <StyledButtonsWrapper buttonPosition={buttonPosition}>
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
          </StyledButtonsWrapper>
        ) : null}
      </DropdownMenu>
    </>
  );

  function handleClickAway() {
    // (masoudmanson): We want to keep the dropdown menu open in two scenarios:
    // 1. If the dropdown has buttons,
    // 2. When there are no buttons, and the closeOnBlur property is set to false,
    // In all other cases, we close the menu.
    if (open && closeOnBlur && !shouldShowButtons) {
      setOpen(false);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }
    } else {
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

    if (anchorEl) {
      anchorEl.focus();
    }

    if (closeOnBlur) onClose?.();

    if (shouldShowButtons) {
      onClose?.();
      setOpen(false);
    }
  }

  function handleCancel() {
    if (anchorEl) {
      anchorEl.focus();
    }

    onClose?.();
    setOpen(false);
  }
};

export default Dropdown;
