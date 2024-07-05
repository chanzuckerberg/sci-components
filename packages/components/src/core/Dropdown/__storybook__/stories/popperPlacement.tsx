import { AutocompleteValue } from "@mui/material";
import { useMemo, useState } from "react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import RawDropdown from "src/core/Dropdown";

export const PopperPlacementDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(): JSX.Element => {
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);

  const options = useMemo(() => {
    return [
      { count: 2, name: "Item 1" },
      { count: 0, name: "Item 2" },
      { count: 12, name: "Item 3" },
    ] as T[];
  }, []);

  return (
    <>
      <div style={{ gridArea: "3 / 2 / 4 / 4" }}>
        <p>
          To adjust the placement of the popper, use the DropdownMenuProps
          property and set PopperPlacement to your desired value:
        </p>
        <pre
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: 4,
            padding: "0px 20px",
          }}
        >
          {`
<Dropdown
  DropdownMenuProps={{
    PopperPlacement: "bottom-start",
  }}
/>
          `}
        </pre>
      </div>

      <div
        style={{
          display: "grid",
          gridColumnGap: "0px",
          gridRowGap: "0px",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
          height: "500px",
          padding: "30px",
        }}
      >
        <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Bottom Start"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "bottom-start",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Bottom"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "bottom",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "1 / 4 / 2 / 5" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Bottom End"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "bottom-end",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Right Start"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "right-start",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "3 / 1 / 4 / 2" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Right"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "right",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "4 / 1 / 5 / 2" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Right End"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "right-end",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "5 / 2 / 6 / 3" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Top Start"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "top-start",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "5 / 3 / 6 / 4" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Top"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "top",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "5 / 4 / 6 / 5" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Top End"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "top-end",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "2 / 5 / 3 / 6" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Left Start"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "left-start",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "3 / 5 / 4 / 6" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Left"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "left",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>

        <div style={{ gridArea: "4 / 5 / 5 / 6" }}>
          <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
            label="Left End"
            onChange={handleChange}
            value={value}
            options={options}
            search={false}
            DropdownMenuProps={{
              PopperPlacement: "left-end",
              groupBy: (option: T) => option.section as string,
              width: 150,
            }}
          />
        </div>
      </div>
    </>
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
  }
};
