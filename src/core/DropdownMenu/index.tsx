import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  InputAdornment,
  PopperProps,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { noop } from "src/common/utils";
import ButtonIcon from "../ButtonIcon";
import { InputSearchProps } from "../InputSearch";
import {
  InputBaseWrapper,
  StyledAutocomplete,
  StyledHeaderTitle,
  StyledMenuInputSearch,
  StyledMenuItem,
  StyledMenuItemCount,
  StyledMenuItemDetails,
  StyledPaper,
  StyledPopper,
  StyleProps,
} from "./style";

// (thuang): This requires option to have a `name` property.
export interface DefaultDropdownMenuOption {
  name: string;
  section?: string;
  details?: string;
  count?: string;
}

type RenderFunctionType = (props: any) => JSX.Element;

interface ExtraProps extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  InputBaseProps?: Partial<InputSearchProps>;
  PopperBaseProps?: Partial<PopperProps>;
  title?: string;
  anchorEl: HTMLElement | null;
  PopperComponent?: typeof StyledPopper | RenderFunctionType;
  PaperComponent?: typeof StyledPaper | RenderFunctionType;
  children?: JSX.Element | null;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
>;

export type DropdownMenuProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraProps;

const DropdownMenu = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: DropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    multiple = false,
    anchorEl,
    disableCloseOnSelect = multiple,
    getOptionLabel = defaultGetOptionLabel,
    id,
    InputBaseProps = {},
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    keepSearchOnSelect = true,
    loading = false,
    loadingText = "",
    noOptionsText = "No options",
    onInputChange = noop,
    open = false,
    PaperComponent = StyledPaper,
    PopperComponent = StyledPopper,
    PopperBaseProps = {},
    renderOption = defaultRenderOption,
    renderTags = defaultRenderTags,
    search = false,
    title,
    children,
  } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <PopperComponent
      id={id}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      {...PopperBaseProps}
    >
      {title && <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>}

      <StyledAutocomplete
        clearOnBlur={false}
        disableCloseOnSelect={disableCloseOnSelect}
        disablePortal
        renderTags={renderTags}
        loading={loading}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        PaperComponent={PaperComponent}
        renderOption={renderOption}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        inputValue={inputValue}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <InputBaseWrapper search={search}>
            <StyledMenuInputSearch
              id="location-search"
              label="Search for a location"
              placeholder="Search"
              ref={params.InputProps.ref}
              search={search}
              autoFocus
              InputProps={{
                /**
                 * (thuang): Works with css caret-color: "transparent" to hide
                 * mobile keyboard
                 */
                inputMode: search ? "text" : "none",
                /**
                 * (mmoore): passing only the ref along to InputProps to prevent
                 * default MUI arrow from rendering in search input.
                 * renderInput strips InputProps, so we explicitly pass end adornment here
                 */
                ...params.InputProps.ref,
                endAdornment: (
                  <InputAdornment position="end">
                    <ButtonIcon
                      sdsType="secondary"
                      sdsSize="small"
                      sdsIcon="search"
                    />
                  </InputAdornment>
                ),
                inputProps: params.inputProps,
              }}
              {...InputBaseProps}
            />
          </InputBaseWrapper>
        )}
        {...props}
        onInputChange={(
          event: SyntheticEvent<Element, Event>,
          value: string,
          reason: AutocompleteInputChangeReason
        ) => {
          if (event && event.type === "blur") {
            setInputValue("");
          } else if (
            reason !== "reset" ||
            (reason === "reset" && !keepSearchOnSelect)
          ) {
            setInputValue(value);
          }
          if (onInputChange) onInputChange(event, value, reason);
        }}
      />
      {children}
    </PopperComponent>
  );

  function defaultGetOptionLabel(
    option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
  ): string {
    if (typeof option === "object" && "name" in option) return option.name;
    return option.toString();
  }

  function defaultIsOptionEqualToValue(option: T, val: T): boolean {
    return option.name === val.name;
  }

  function defaultRenderTags() {
    return null;
  }

  function defaultRenderOption(
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) {
    return (
      <li {...optionProps}>
        <StyledMenuItem
          {...{ component: "div" }}
          isMultiSelect={multiple}
          selected={selected}
          count={option.count}
        >
          <div>
            {option.name}

            {option.details && (
              <StyledMenuItemDetails>{option.details}</StyledMenuItemDetails>
            )}
          </div>

          {option.count && (
            <StyledMenuItemCount className="menuItem-count">
              {option.count}
            </StyledMenuItemCount>
          )}
        </StyledMenuItem>
      </li>
    );
  }
};

export default DropdownMenu;
