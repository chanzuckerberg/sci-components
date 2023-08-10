import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  InputAdornment,
} from "@mui/material";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import { IconProps } from "../Icon";
import { InputSearchProps } from "../InputSearch";
import MenuItem, { IconNameToSmallSizes } from "../MenuItem";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItemDetails,
  StyledMenuItemText,
  StyledPaper,
} from "./style";

// (thuang): This requires option to have a `name` property.
interface AutocompleteOptionGeneral {
  name: string;
  section?: string;
}
export interface AutocompleteOptionBasic extends AutocompleteOptionGeneral {
  count?: number;
  details?: string;
  sdsIcon?: keyof IconNameToSmallSizes;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSmallSizes>>;
}

export interface AutocompleteOptionComponent extends AutocompleteOptionGeneral {
  component?: ReactNode;
}

type Exclusive<T, U> = T & { [K in Exclude<keyof U, keyof T>]?: undefined };

export type DefaultAutocompleteOption =
  | Exclusive<AutocompleteOptionBasic, AutocompleteOptionComponent>
  | Exclusive<AutocompleteOptionComponent, AutocompleteOptionBasic>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunctionType = (props: any) => JSX.Element;

interface ExtraAutocompleteProps extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  InputBaseProps?: Partial<InputSearchProps>;
  PaperComponent?: typeof StyledPaper | RenderFunctionType;
  label: string;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type SdsAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteProps;

const Autocomplete = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: SdsAutocomplete<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    getOptionLabel = defaultGetOptionLabel,
    InputBaseProps = {},
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    label,
    noOptionsText = "No options",
    PaperComponent = StyledPaper,
    renderOption = defaultRenderOption,
    renderTags = defaultRenderTags,
    onInputChange,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <StyledAutocomplete
      clearOnBlur={false}
      disablePortal
      renderTags={renderTags}
      noOptionsText={noOptionsText}
      PaperComponent={PaperComponent}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <InputBaseWrapper>
          <StyledMenuInputSearch
            id="sds-autocomplete"
            label={label}
            placeholder={label}
            ref={params.InputProps.ref}
            // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                event.stopPropagation();
              }
            }}
            InputProps={{
              /**
               * (thuang): Works with css caret-color: "transparent" to hide
               * mobile keyboard
               */
              inputMode: "search",
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
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        if (reason !== "input") {
          setInputValue("");
        } else {
          setInputValue(newInputValue);
        }
        onInputChange?.(event, newInputValue, reason);
      }}
    />
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
    let MenuItemContent;

    const { component, details, count, sdsIcon, sdsIconProps } = option;
    const optionLabel = getOptionLabel(option);

    if (component) {
      MenuItemContent = component;
    } else {
      MenuItemContent = (
        <StyledMenuItemText>
          {optionLabel}
          {details && (
            <StyledMenuItemDetails className="menuItem-details">
              {details}
            </StyledMenuItemDetails>
          )}
        </StyledMenuItemText>
      );
    }

    return (
      <MenuItem
        column={count}
        disabled={optionProps["aria-disabled"] === true}
        sdsIcon={sdsIcon}
        sdsIconProps={sdsIconProps}
        isMultiSelect={false}
        selected={selected}
        {...optionProps}
      >
        {MenuItemContent}
      </MenuItem>
    );
  }
};

export default Autocomplete;
