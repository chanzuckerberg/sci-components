import { Args } from "@storybook/react";
import React, { useEffect, useRef } from "react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import RawDropdownMenu from "src/core/DropdownMenu";
import { DROPDOWN_MENU_POPPER_POSITION } from "../constants";

export const DropdownMenu = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    label,
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
    title,
  } = props;
  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setAnchorEl(anchorRef.current);
    }, 1);
  }, [anchorRef]);

  return (
    <div style={{ margin: "16px 0 0 24px" }} ref={anchorRef}>
      {anchorEl ? (
        <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          anchorEl={anchorEl}
          disableCloseOnSelect={false}
          multiple={multiple}
          options={options}
          PopperBaseProps={{
            disablePortal: false,
            placement: DROPDOWN_MENU_POPPER_POSITION,
          }}
          search={search}
          title={title}
          getOptionDisabled={(option: T) => {
            return option.name === "Type: feature request";
          }}
          {...props}
        />
      ) : null}
    </div>
  );
};
