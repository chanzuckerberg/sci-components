import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PaperProps,
  PopperProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { SyntheticEvent, useMemo } from "react";
import { EMPTY_OBJECT, noop } from "src/common/utils";
import Autocomplete, { AutocompleteProps } from "../Autocomplete";
import { DefaultAutocompleteOption } from "../Autocomplete/components/AutocompleteBase";
import { InputSearchProps } from "../InputSearch";
import { SDSTheme } from "../styles";
import {
  StyleProps,
  StyledDropdownMenuAutocompleteWrapper,
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
  label?: string;
  anchorEl: HTMLElement | null;
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  PaperComponent?: React.JSXElementConstructor<PaperProps>;
  PopperPlacement?: "bottom-start" | "top-start" | "bottom-end" | "top-end";
  children?: JSX.Element | null;
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
  ClickAwayListenerProps?: Partial<MUIClickAwayListenerProps>;
  width?: number;
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
    search = false,
    title,
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
      ...PopperBaseProps?.sx,
      width:
        isMultiColumn || width < MINIMUM_DROPDOWN_MENU_POPPER_WIDTH
          ? "auto"
          : width,
    };
  }, [PopperBaseProps?.sx, isMultiColumn, width]);

  const DefaultInputBaseProps = useMemo(() => {
    return {
      ...InputBaseProps,
      onClick: noop,
    };
  }, [InputBaseProps]);

  return (
    <PopperComponent
      id={id}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, theme.app?.spacing.s],
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
          <StyledDropdownMenuAutocompleteWrapper>
            {title && (
              <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>
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
