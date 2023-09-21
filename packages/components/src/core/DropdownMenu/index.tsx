import {
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PaperProps,
  PopperProps,
} from "@mui/material";
import React, { SyntheticEvent } from "react";
import Autocomplete, { DefaultAutocompleteOption } from "../Autocomplete";
import { InputSearchProps } from "../InputSearch";
import {
  StyleProps,
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
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
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
    anchorEl,
    id,
    InputBaseProps = {
      autoFocus: true,
      sx: {
        padding: "8px",
      },
    },
    open = false,
    PaperComponent = StyledPaper,
    PopperComponent = StyledPopper,
    PopperPlacement = "bottom-start",
    PopperBaseProps = {},
    search = false,
    title,
    label = "Search",
    children,
    onClickAway,
    ClickAwayListenerProps,
    ...rest
  } = props;

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
      {...PopperBaseProps}
      placement={PopperPlacement}
    >
      <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
        <div>
          {title && (
            <StyledHeaderTitle search={search}>{title}</StyledHeaderTitle>
          )}

          <Autocomplete
            label={label}
            search={search}
            InputBaseProps={InputBaseProps}
            PaperComponent={(paperComponentProps: PaperProps) => (
              <PaperComponent
                search={search}
                title={title}
                {...paperComponentProps}
              />
            )}
            open={open}
            {...rest}
            PopperComponent={StyledAutocompletePopper}
          />
          {children}
        </div>
      </ClickAwayListener>
    </PopperComponent>
  );
};

export default DropdownMenu;
