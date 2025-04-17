import { AutocompleteValue } from "@mui/base";
import { Args } from "@storybook/react";
import { useEffect, useState } from "react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";
import Callout from "src/core/Callout";
import DropdownMenu from "src/core/DropdownMenu";
import RawInputDropdown from "src/core/InputDropdown";

type DisableClearable = false;
type FreeSolo = false;

export const InputDropdown = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    disabled,
    label,
    sdsStyle,
    multiple,
    value: propValue,
    sdsType,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [inputDropdownDetails, setInputDropdownDetails] = useState<string>();
  const [invalid, setInvalid] = useState(false);
  const [storybookLabel, setStorybookLabel] = useState("Label");

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);

  const isControlled = propValue !== undefined;

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue, isControlled]);

  useEffect(() => {
    if (sdsType === "value" && multiple) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [multiple, sdsType]);

  useEffect(() => {
    if (sdsType === "value") {
      setStorybookLabel("Value");
    } else {
      setStorybookLabel(label);
    }
  }, [label, sdsType]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => {
    if (!multiple) {
      setOpen(false);
      setValue(newValue);
      setCounter(undefined);

      if (newValue && !Array.isArray(newValue)) {
        setInputDropdownValue(newValue.name);
        if (newValue?.details) setInputDropdownDetails(newValue.details);
        else setInputDropdownDetails(undefined);
      } else {
        setInputDropdownValue(undefined);
        setInputDropdownDetails(undefined);
      }
    } else {
      setValue(newValue);
      setCounter((newValue as T[])?.length.toString());
    }
  };

  const handleClose = () => {};

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };

  const options = [
    {
      details: "Details",
      name: "Menu Item 1",
    },
    {
      details: "A very long Details for the second Menu Item",
      name: "Menu Item 2",
    },
    {
      name: "Menu Item 3",
    },
  ];

  return (
    <div>
      {invalid ? (
        <Callout
          autoDismiss={false}
          intent="negative"
          title="Invalid props!"
          body='When using the InputDropdown component, please note that the combination of setting the sdsType prop to "value" and the multiple prop to "true" is not allowed.'
        />
      ) : (
        <RawInputDropdown
          disabled={disabled}
          label={storybookLabel}
          onClick={handleClick}
          state={open ? "open" : "default"}
          sdsStyle={sdsStyle}
          sdsType={sdsType}
          multiple={multiple}
          details={inputDropdownDetails}
          value={inputDropdownValue}
          counter={counter}
          data-testid="InputDropdown"
          {...rest}
        />
      )}

      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={handleChange}
        search={false}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options as T[]}
        value={value}
        onClickAway={handleClickAway}
        width={300}
      />
    </div>
  );
};
