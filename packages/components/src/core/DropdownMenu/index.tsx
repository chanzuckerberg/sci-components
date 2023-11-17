import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PopperProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { SyntheticEvent } from "react";
import { noop } from "src/common/utils";
import { AutocompleteProps } from "../Autocomplete";
import { DefaultAutocompleteOption } from "../Autocomplete/components/AutocompleteBase";
import { InputSearchProps } from "../InputSearch";
import { SDSTheme } from "../styles";
import {
  StyleProps,
  StyledAutocomplete,
  StyledDropdownMenuAutocompleteWrapper,
  StyledHeaderTitle,
  StyledPopper,
} from "./style";

export type DefaultDropdownMenuOption = DefaultAutocompleteOption;

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
  FreeSolo extends boolean | undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type DropdownMenuProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraDropdownMenuProps;

const DropdownMenu = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: DropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const theme: SDSTheme = useTheme();

  const {
    anchorEl,
    id,
    InputBaseProps,
    open = false,
    PopperPlacement = "bottom-start",
    PopperBaseProps = {},
    search = false,
    title,
    label = "Search",
    children,
    options,
    onClickAway = noop,
    ClickAwayListenerProps,
    width = 160,
    ...rest
  } = props;

  const isMultiColumn = options && !!options[0] && "options" in options[0];
  const singleColumnPadding = `${theme.app?.spacing?.xs}px 0 ${theme.app?.spacing?.xs}px ${theme.app?.spacing?.xs}px !important`;
  const multiColumnNoSearchOrTitlePadding = `${theme.app?.spacing?.l}px ${theme.app?.spacing?.xxs}px ${theme.app?.spacing?.l}px ${theme.app?.spacing?.l}px !important`;
  const multiColumnWithSearchOrTitlePadding = `${theme.app?.spacing?.xs}px 0 ${theme.app?.spacing?.l}px ${theme.app?.spacing?.xs}px !important`;

  return (
    <StyledPopper
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
      sx={{
        ...PopperBaseProps?.sx,
        padding: isMultiColumn
          ? search || title
            ? multiColumnWithSearchOrTitlePadding
            : multiColumnNoSearchOrTitlePadding
          : singleColumnPadding,
        width:
          (options &&
            options[0] &&
            Object.prototype.hasOwnProperty.call(options[0], "options")) ||
          width < 160
            ? "auto"
            : width,
      }}
    >
      <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
        <StyledDropdownMenuAutocompleteWrapper
          search={search}
          title={title}
          isMultiColumn={isMultiColumn}
        >
          {title && (
            <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>
          )}

          {anchorEl && (
            <StyledAutocomplete
              label={label}
              search={search}
              title={title}
              open={open}
              options={options}
              InputBaseProps={{
                ...InputBaseProps,
                onClick: noop,
              }}
              PopperBaseProps={{
                disablePortal: true,
              }}
              disablePortal
              onClickAway={noop}
              {...rest}
            />
          )}
          {children}
        </StyledDropdownMenuAutocompleteWrapper>
      </ClickAwayListener>
    </StyledPopper>
  );
};

export default DropdownMenu;
