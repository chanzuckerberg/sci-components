import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  InputAdornment,
  PopperProps,
} from "@mui/material";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import { noop } from "src/common/utils";
import ButtonIcon from "../ButtonIcon";
import { IconProps } from "../Icon";
import { InputSearchProps } from "../InputSearch";
import MenuItem, { IconNameToSmallSizes } from "../MenuItem";
import {
  InputBaseWrapper,
  StyledAutocomplete,
  StyledHeaderTitle,
  StyledMenuInputSearch,
  StyledMenuItemDetails,
  StyledMenuItemText,
  StyledPaper,
  StyledPopper,
  StyleProps,
} from "./style";

// (thuang): This requires option to have a `name` property.
interface DropdownMenuOptionGeneral {
  name: string;
  section?: string;
}
export interface DropdownMenuOptionBasic extends DropdownMenuOptionGeneral {
  count?: number;
  details?: string;
  sdsIcon?: keyof IconNameToSmallSizes;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSmallSizes>>;
}

export interface DropdownMenuOptionComponent extends DropdownMenuOptionGeneral {
  component?: ReactNode;
}

type Exclusive<T, U> = T & { [K in Exclude<keyof U, keyof T>]?: undefined };

export type DefaultDropdownMenuOption =
  | Exclusive<DropdownMenuOptionBasic, DropdownMenuOptionComponent>
  | Exclusive<DropdownMenuOptionComponent, DropdownMenuOptionBasic>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunctionType = (props: any) => JSX.Element;

interface ExtraDropdownMenuProps extends StyleProps {
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
  onClickAway: (event: MouseEvent | TouchEvent) => void;
  ClickAwayListenerProps?: Partial<MUIClickAwayListenerProps>;
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
  ExtraDropdownMenuProps;

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
    onClickAway,
    ClickAwayListenerProps,
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
      <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
        <div>
          {title && (
            <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>
          )}

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
        </div>
      </ClickAwayListener>
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
    let MenuItemContent;

    const { component, details, count, sdsIcon, sdsIconProps } = option;
    const label = getOptionLabel(option);

    if (component) {
      MenuItemContent = component;
    } else {
      MenuItemContent = (
        <StyledMenuItemText>
          {label}
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
        isMultiSelect={multiple}
        selected={selected}
        {...optionProps}
      >
        {MenuItemContent}
      </MenuItem>
    );
  }
};

export default DropdownMenu;
