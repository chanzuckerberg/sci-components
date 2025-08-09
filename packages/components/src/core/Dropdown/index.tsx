import { AutocompleteProps } from "@mui/material";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteValue,
} from "@mui/material/useAutocomplete";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  title?: React.ReactNode;
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

// Custom hook for managing dropdown state
function useDropdownState<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  propValue:
    | AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    | undefined,
  multiple: Multiple,
  options: unknown
) {
  const getInitialValue = useCallback((): AutocompleteValue<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > => {
    return (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >;
  }, [multiple]);

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState(getInitialValue());
  const [pendingValue, setPendingValue] = useState(getInitialValue());

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
      if (multiple) {
        setPendingValue(propValue);
      }
    }
  }, [isControlled, propValue, multiple]);

  // Always reset when options change, unless the component is controlled
  useEffect(() => {
    if (!isControlled) {
      const initialValue = multiple ? [] : null;
      setValue(
        initialValue as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >
      );
      setPendingValue(
        initialValue as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, isControlled, multiple]);

  return {
    isControlled,
    pendingValue,
    setPendingValue,
    setValue,
    value,
  };
}

// Dropdown Buttons Component
interface DropdownButtonsProps {
  buttonPosition: "left" | "right";
  onApply: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: () => void;
}

const DropdownButtons = ({
  buttonPosition,
  onApply,
  onCancel,
}: DropdownButtonsProps) => {
  const applyButton = (
    <Button onClick={onApply} sdsStyle="square" sdsType="primary">
      Apply
    </Button>
  );

  const cancelButton = (
    <Button onClick={onCancel} sdsStyle="square" sdsType="secondary">
      Cancel
    </Button>
  );

  return (
    <StyledButtonsWrapper buttonPosition={buttonPosition}>
      <div>
        {buttonPosition === "left" ? (
          <>
            {applyButton}
            {cancelButton}
          </>
        ) : (
          <>
            {cancelButton}
            {applyButton}
          </>
        )}
      </div>
    </StyledButtonsWrapper>
  );
};

function shouldApplyPendingChanges(
  isTriggerChangeOnOptionClick: boolean,
  pendingValue: unknown,
  value: unknown
): boolean {
  if (isTriggerChangeOnOptionClick) return false;

  // For arrays and objects, we need to compare by value, not reference
  // Use JSON.stringify for a simple deep comparison
  if (typeof pendingValue === "object" && pendingValue !== null) {
    return JSON.stringify(pendingValue) !== JSON.stringify(value);
  }

  return pendingValue !== value;
}

function mapCloseReasonToChangeReason(
  reason: AutocompleteCloseReason
): AutocompleteChangeReason {
  switch (reason) {
    case "selectOption":
      return "selectOption";
    case "removeOption":
      return "removeOption";
    default:
      return "blur";
  }
}

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
    title,
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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  // Memoize expensive computations
  const isMultiColumn = useMemo(
    () => "options" in (options?.[0] || EMPTY_OBJECT),
    [options]
  );

  const shouldShowButtons = useMemo(
    () => buttons && !isTriggerChangeOnOptionClick && multiple,
    [buttons, isTriggerChangeOnOptionClick, multiple]
  );

  // Use custom hook for state management
  const { value, setValue, pendingValue, setPendingValue } = useDropdownState(
    propValue,
    multiple as Multiple,
    options
  );

  // Memoized callback functions with proper return types
  const setValueAndCallOnChange = useCallback(
    (
      event: React.SyntheticEvent,
      newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<T>
    ): void => {
      setValue(newValue);
      onChange?.(event, newValue, reason, details);
    },
    [setValue, onChange]
  );

  const handleChange = useCallback(
    (
      event: React.SyntheticEvent,
      newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<T>
    ): void => {
      // For all multiple selection modes (both single-column and multi-column)
      if (multiple) {
        setPendingValue(newValue);
        if (isTriggerChangeOnOptionClick) {
          setValueAndCallOnChange(event, newValue, reason, details);
        }
        return;
      }

      // For single selection (both single-column and multi-column)
      setValueAndCallOnChange(event, newValue, reason, details);
      if (!isMultiColumn) setOpen(false);
    },
    [
      multiple,
      isTriggerChangeOnOptionClick,
      setPendingValue,
      setValueAndCallOnChange,
      isMultiColumn,
    ]
  );

  const handleClickAway = useCallback((): void => {
    if (open) {
      if (closeOnBlur && !shouldShowButtons) {
        // When closing by clicking away without buttons, apply changes
        if (
          multiple &&
          shouldApplyPendingChanges(
            isTriggerChangeOnOptionClick,
            pendingValue,
            value
          )
        ) {
          // Create a synthetic event for the onChange callback
          const syntheticEvent = new Event(
            "change"
          ) as unknown as React.SyntheticEvent;
          onChange?.(syntheticEvent, pendingValue, "blur", undefined);
        }
        if (multiple) {
          setValue(pendingValue);
        }
        setOpen(false);
      } else if (!closeOnBlur && shouldShowButtons && multiple) {
        setPendingValue(value);
      }
    }
  }, [
    open,
    closeOnBlur,
    shouldShowButtons,
    multiple,
    setValue,
    pendingValue,
    isTriggerChangeOnOptionClick,
    value,
    onChange,
    setPendingValue,
  ]);

  const handleDropdownClose = useCallback(
    (event: React.SyntheticEvent) => {
      if (multiple) {
        // For all multiple selection modes
        if (
          shouldApplyPendingChanges(
            isTriggerChangeOnOptionClick,
            pendingValue,
            value
          )
        ) {
          setValueAndCallOnChange(
            event,
            pendingValue,
            "selectOption",
            undefined
          );
        }
        setValue(pendingValue);
      }
      setOpen(false);
      anchorEl?.focus();
    },
    [
      multiple,
      isTriggerChangeOnOptionClick,
      pendingValue,
      value,
      setValueAndCallOnChange,
      setValue,
      anchorEl,
    ]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      onClick?.(event as React.MouseEvent<HTMLDivElement, MouseEvent>);

      if (open) {
        if (!shouldShowButtons) {
          handleDropdownClose(event);
        }
      } else {
        if (multiple) {
          setPendingValue(value);
        }
        setAnchorEl(event.currentTarget);
        setOpen(true);
      }
    },
    [
      onClick,
      open,
      shouldShowButtons,
      multiple,
      setPendingValue,
      value,
      handleDropdownClose,
    ]
  );

  const handleClose = useCallback(
    (event: React.SyntheticEvent, reason: AutocompleteCloseReason): void => {
      if (reason === "toggleInput") return;

      if (shouldShowButtons && reason === "blur") return;

      // When buttons are shown, only apply changes if reason is "selectOption" (Apply button)
      const shouldApplyChanges = shouldShowButtons
        ? reason === "selectOption"
        : true;

      if (multiple) {
        if (shouldApplyChanges) {
          if (
            shouldApplyPendingChanges(
              isTriggerChangeOnOptionClick,
              pendingValue,
              value
            )
          ) {
            const changeReason = mapCloseReasonToChangeReason(reason);
            setValueAndCallOnChange(
              event,
              pendingValue,
              changeReason,
              undefined
            );
          }
          setValue(pendingValue);
        } else {
          // Don't apply changes (like when ESC is pressed with buttons)
          setPendingValue(value);
        }
      }

      anchorEl?.focus();

      if (closeOnBlur || shouldShowButtons) {
        onClose?.(event, reason);
      }

      if (shouldShowButtons) {
        setOpen(false);
      }
    },
    [
      shouldShowButtons,
      multiple,
      setValue,
      pendingValue,
      anchorEl,
      closeOnBlur,
      onClose,
      isTriggerChangeOnOptionClick,
      value,
      setValueAndCallOnChange,
      setPendingValue,
    ]
  );

  const handleButtonClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      handleClose(event, "selectOption");
    },
    [handleClose]
  );

  const handleCancel = useCallback((): void => {
    if (multiple) {
      setPendingValue(value);
    }

    anchorEl?.focus();
    setOpen(false);
  }, [multiple, setPendingValue, value, anchorEl]);

  // Helper function to count multi-column selections
  const countMultiColumnSelections = useCallback(
    (currentValue: unknown): number => {
      if (!currentValue || typeof currentValue !== "object") return 0;

      let totalCount = 0;
      Object.values(currentValue).forEach((items) => {
        if (Array.isArray(items)) {
          totalCount += items.length;
        } else if (items) {
          totalCount += 1;
        }
      });
      return totalCount;
    },
    []
  );

  // Helper function to get single selection props
  const getSingleSelectionProps = useCallback((currentValue: unknown) => {
    if (
      !currentValue ||
      typeof currentValue !== "object" ||
      !("name" in currentValue)
    ) {
      return {};
    }

    const item = currentValue as T;
    return {
      details: item.details || undefined,
      value: item.name,
    };
  }, []);

  // Calculate display values for InputDropdownComponent
  const getInputDropdownProps = useMemo(() => {
    const currentValue = value;

    if (isMultiColumn) {
      const totalCount = countMultiColumnSelections(currentValue);
      return totalCount > 0 ? { counter: totalCount } : {};
    }

    if (multiple) {
      const count = Array.isArray(currentValue) ? currentValue.length : 0;
      return count > 0 ? { counter: count } : {};
    }

    return getSingleSelectionProps(currentValue);
  }, [
    value,
    isMultiColumn,
    multiple,
    countMultiColumnSelections,
    getSingleSelectionProps,
  ]);

  return (
    <>
      <InputDropdownComponent
        disabled={disabled}
        label={label}
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="listbox"
        multiple={multiple || isMultiColumn}
        {...getInputDropdownProps}
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
        value={multiple ? pendingValue : value}
        {...{
          isSearchAutoFocus,
          title,
          ...DropdownMenuProps,
          ...rest,
        }}
      >
        {shouldShowButtons ? (
          <DropdownButtons
            buttonPosition={buttonPosition}
            onApply={handleButtonClose}
            onCancel={handleCancel}
          />
        ) : null}
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
