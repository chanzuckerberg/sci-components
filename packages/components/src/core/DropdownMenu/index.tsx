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
import { DefaultAutocompleteOption } from "../AutocompleteBase";
import { InputSearchProps } from "../InputSearch";
import { SDSTheme } from "../styles";
import {
  StyleProps,
  StyledAutocomplete,
  StyledAutocompletePopper,
  StyledHeaderTitle,
  StyledPaper,
  StyledPopper,
} from "./style";

export type DefaultDropdownMenuOption = DefaultAutocompleteOption;

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
  label?: string;
  anchorEl: HTMLElement | null;
  PopperComponent?: typeof StyledPopper | RenderFunctionType;
  PopperPlacement?: "bottom-start" | "top-start" | "bottom-end" | "top-end";
  PaperComponent?: typeof StyledPaper | RenderFunctionType;
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
  T extends DefaultDropdownMenuOption,
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
    PaperComponent = StyledPaper,
    PopperComponent = StyledPopper,
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
  const defaultPopperComponent = (popperProps: PopperProps) => {
    return (
      <StyledAutocompletePopper
        search={search}
        title={title}
        {...popperProps}
      />
    );
  };

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
      sx={{
        ...PopperBaseProps?.sx,
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
        <div>
          {title && (
            <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>
          )}

          {anchorEl && (
            <StyledAutocomplete
              label={label}
              search={search}
              title={title}
              PaperComponent={PaperComponent}
              open={open}
              options={options}
              PopperComponent={defaultPopperComponent}
              InputBaseProps={{
                ...InputBaseProps,
                onClick: noop,
              }}
              PopperBaseProps={{
                disablePortal: true,
              }}
              onClickAway={noop}
              {...rest}
            />
          )}
          {children}
        </div>
      </ClickAwayListener>
    </PopperComponent>
  );
};

export default DropdownMenu;
