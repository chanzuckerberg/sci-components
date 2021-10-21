import { AutocompleteCloseReason, Value as MUIValue } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
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
        <MenuSelect
          open
          search={search}
          onClose={handleClose}
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
      </PopperComponent>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultMenuSelectOption[]);
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

    if (multiple) {
      setValue(pendingValue as Value<DefaultMenuSelectOption, Multiple>);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null
  ) {
    if (multiple) {
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
