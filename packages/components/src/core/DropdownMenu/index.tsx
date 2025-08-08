import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PaperProps,
  PopperProps,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useMemo, CSSProperties } from "react";
import { EMPTY_OBJECT, noop } from "src/common/utils";
import Autocomplete, { AutocompleteProps } from "src/core/Autocomplete";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { InputSearchProps } from "src/core/InputSearch";
import { SDSTheme } from "src/core/styles";
import {
  StyleProps,
  StyledDropdownMenuAutocompleteWrapper,
  StyledDropdownMenuHeader,
  StyledHeaderTitle,
  StyledPaper,
  StyledPopper,
} from "./style";

/**
 * @deprecated
 * (masoudmanson): We've replaced DefaultDropdownMenuOption with DefaultAutocompleteOption
 * as the preferred choice. However, for backward compatibility, we've exported this line to
 * prevent potential TypeScript type issues for product teams using previous versions.
 */
export type DefaultDropdownMenuOption = DefaultAutocompleteOption;

// (masoudmanson): Represents the minimum width defined by design specifications
// for the dropdownMenu's popper component
export const MINIMUM_DROPDOWN_MENU_POPPER_WIDTH = 160;

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
  headerComponentSlot?: JSX.Element;
  label?: string;
  anchorEl: HTMLElement | null;
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  PaperComponent?: React.JSXElementConstructor<PaperProps>;
  PopperPlacement?:
    | "auto-end"
    | "auto-start"
    | "auto"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  children?: JSX.Element | null;
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
  ClickAwayListenerProps?: Partial<MUIClickAwayListenerProps>;
  width?: number | CSSProperties["width"];
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

export type DropdownMenuProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraDropdownMenuProps;

const DEFAULT_POPPER_BASE_PROPS: Partial<PopperProps> = {
  disablePortal: true,
};

const DropdownMenu = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: DropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const theme: SDSTheme = useTheme();

  const {
    anchorEl,
    id,
    InputBaseProps,
    open = false,
    PopperComponent = StyledPopper,
    PaperComponent = StyledPaper,
    PopperPlacement = "bottom-start",
    PopperBaseProps = {},
    isSearchAutoFocus = true,
    search = false,
    title,
    headerComponentSlot,
    label = "Search",
    children,
    options,
    onClickAway = noop,
    ClickAwayListenerProps,
    width = MINIMUM_DROPDOWN_MENU_POPPER_WIDTH,
    ...rest
  } = props;

  const isMultiColumn = "options" in (options?.[0] || EMPTY_OBJECT);

  // (masoudmanson): The DropdownMenu's Popper component should have a minimum
  // width of MINIMUM_DROPDOWN_MENU_POPPER_WIDTH pixels if the DropdownMenu is
  // a single column dropdown.However, for larger multi-column autocompletes,
  // the width should be set to 'auto' to accommodate the expanded layout.
  const dropdownMenuPopperSx = useMemo(() => {
    return {
      minWidth: MINIMUM_DROPDOWN_MENU_POPPER_WIDTH,
      width: isMultiColumn ? "auto" : width,
      ...PopperBaseProps?.sx,
    };
  }, [PopperBaseProps?.sx, isMultiColumn, width]);

  const DefaultInputBaseProps = useMemo(() => {
    return {
      ...InputBaseProps,
      autoFocus: isSearchAutoFocus,
      onClick: noop,
    };
  }, [InputBaseProps, isSearchAutoFocus]);

  return (
    <PopperComponent
      id={id}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, theme?.app?.spacing?.s],
          },
        },
      ]}
      open={open}
      anchorEl={anchorEl}
      placement={PopperPlacement}
      {...PopperBaseProps}
      // (masoudmanson): To override the width of the Popper,
      // the sx prop's value must be set after spreading the PopperBaseProps.
      sx={dropdownMenuPopperSx}
    >
      <PaperComponent>
        <ClickAwayListener
          onClickAway={onClickAway}
          {...ClickAwayListenerProps}
        >
          <StyledDropdownMenuAutocompleteWrapper
            search={search}
            titleValue={!!(title || headerComponentSlot)}
          >
            {(title || headerComponentSlot) && (
              <StyledDropdownMenuHeader search={search}>
                {title && <StyledHeaderTitle>{title}</StyledHeaderTitle>}
                {headerComponentSlot && <>{headerComponentSlot}</>}
              </StyledDropdownMenuHeader>
            )}
            {anchorEl && (
              <Autocomplete
                label={label}
                search={search}
                title={title}
                open={open}
                options={options}
                PopperBaseProps={DEFAULT_POPPER_BASE_PROPS}
                disablePortal
                onClickAway={noop}
                onClick={noop}
                {...rest}
                InputBaseProps={DefaultInputBaseProps}
              />
            )}
            {children}
          </StyledDropdownMenuAutocompleteWrapper>
        </ClickAwayListener>
      </PaperComponent>
    </PopperComponent>
  );
};

export default DropdownMenu;
