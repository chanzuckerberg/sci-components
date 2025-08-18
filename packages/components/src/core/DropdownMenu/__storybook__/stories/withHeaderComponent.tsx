import { AutocompleteValue } from "@mui/base";
import { Args } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";
import Button from "src/core/Button";
import RawDropdownMenu from "src/core/DropdownMenu";

export const WithHeaderComponentDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search = false,
  } = props;

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(false));

  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(true));

  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, []);

  const CustomHeaderComponent = () => (
    <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
      <Button
        sdsStyle="icon"
        sdsSize="small"
        icon="InfoCircle"
        sdsType="tertiary"
      />
      <Button
        sdsStyle="icon"
        sdsSize="small"
        icon="Download"
        sdsType="tertiary"
      />
    </div>
  );

  return (
    <div style={{ margin: "16px 0 0 24px" }} ref={anchorRef}>
      {anchorEl ? (
        <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
          {...props}
          label="Search"
          anchorEl={anchorEl}
          open
          search={search}
          multiple={multiple}
          headerComponentSlot={CustomHeaderComponent()}
          value={multiple ? pendingValue : value}
          onChange={handleChange}
          disableCloseOnSelect={multiple}
          options={options}
          onClickAway={handleClickAway}
          groupBy={(option: T) => option.section as string}
          width={300}
        />
      ) : null}
    </div>
  );

  function handleClickAway() {
    return multiple && setValue(pendingValue);
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    if (!multiple) {
      setValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
    }

    return setPendingValue(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  function getInitialValue(
    isMultiple: boolean
  ): AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> {
    return isMultiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }
};
