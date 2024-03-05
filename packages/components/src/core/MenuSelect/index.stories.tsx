import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonBase, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
} from "@mui/material/useAutocomplete";
import { Args, Meta } from "@storybook/react";
import React, { SyntheticEvent, useState } from "react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "../../common/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import TagFilter from "../TagFilter";
import { getColors, getCorners, getShadows } from "../styles";
import RawMenuSelect, { DefaultMenuSelectOption } from "./index";
import { BADGE } from "../../common/storybookBadges";

const StyledPopper = styled(Popper)`
  ${(props) => {
    const colors = getColors(props);
    const shadows = getShadows(props);
    const corners = getCorners(props);

    return `
      & .MuiInputBase-root {
        padding: 0 6px;
      }

      & .MuiAutocomplete-option[aria-selected='true'],
      & .MuiAutocomplete-option[data-focus='true'] {
        background-color: transparent,
      }

      & .MuiAutocomplete-popper.MuiAutocomplete-popperDisablePortal {
        position: relative !important;
        transform: none !important;
        width: 100% !important;
      }

      .MuiAutocomplete-paper {
        box-shadow: none;
        margin: 0;

        .MuiAutocomplete-listbox {
          padding: 8px;
        }
      }

      background-color: white;
      border: 1px solid ${colors?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      color: #586069;
      font-size: 13px;
      width: 300px;
      z-index: 1;
    `;
  }}
`;

const StyledButton = styled(ButtonBase)`
  & span {
    width: 100%;
  }

  & svg {
    height: 16px;
    width: 16px;
  }

  &:hover,
  &:focus {
    color: #0366d6;
  }

  color: #586069;
  font-size: 13px;
  font-weight: 600;
  padding-bottom: 8px;
  text-align: left;
  width: 100%;
`;

// eslint-disable-next-line sonarjs/cognitive-complexity -- Demo code
const MenuSelect = (props: Args): JSX.Element => {
  // eslint-disable-next-line react/prop-types -- Demo code
  const {
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    null | DefaultMenuSelectOption | DefaultMenuSelectOption[]
  >(multiple ? [] : null);

  const [pendingValue, setPendingValue] = useState<DefaultMenuSelectOption[]>(
    []
  );

  const open = Boolean(anchorEl);

  const id = open ? "github-label" : undefined;

  const inputChangeHandler = (
    _: SyntheticEvent<Element, Event>,
    val: string,
    __: AutocompleteInputChangeReason
  ) => {
    if (val) {
      // eslint-disable-next-line no-console
      console.log("input value: ", val);
    }
  };

  return (
    <>
      <div
        style={{
          width: 221,
        }}
      >
        <StyledButton disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Click Target</span>
          <ExpandMoreIcon />
        </StyledButton>
        <StyledPopper
          disablePortal
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
        >
          <RawMenuSelect
            open
            search={search}
            onClose={handleClose}
            multiple={multiple}
            value={multiple ? pendingValue : value}
            onChange={handleChange}
            disableCloseOnSelect={multiple}
            options={options}
            onInputChange={inputChangeHandler}
            {...props}
          />
        </StyledPopper>

        <div style={{ marginTop: 4 }}>
          <Chips value={value} multiple={multiple} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultMenuSelectOption[]);
    }

    setAnchorEl(event.currentTarget);
  }

  function handleClose(
    _: React.ChangeEvent<unknown>,
    reason: AutocompleteCloseReason
  ) {
    if (multiple) {
      if (reason === "toggleInput") {
        return;
      }

      setValue(pendingValue);
    }

    if (anchorEl) {
      anchorEl.focus();
    }

    setAnchorEl(null);
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null
  ) {
    if (multiple) {
      return setPendingValue(newValue as DefaultMenuSelectOption[]);
    }

    setValue(newValue as DefaultMenuSelectOption);
  }

  function handleDelete(option: DefaultMenuSelectOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue = (value as DefaultMenuSelectOption[]).filter(
      (item) => item !== option
    );

    setValue(newValue);
  }
};

interface ChipsProps {
  value: DefaultMenuSelectOption | DefaultMenuSelectOption[] | null;
  multiple: boolean;
  onDelete: (option: DefaultMenuSelectOption) => void;
}

function Chips({ value, multiple, onDelete }: ChipsProps): JSX.Element | null {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return (
      <TagFilter label={name} onDelete={onDelete} style={{ marginTop: 4 }} />
    );
  }

  return (
    <>
      {(value as DefaultMenuSelectOption[]).map((item) => {
        const { name } = item;

        return (
          <TagFilter
            key={name}
            label={name}
            onDelete={() => onDelete(item)}
            style={{ marginTop: 4 }}
          />
        );
      })}
    </>
  );
}

export default {
  argTypes: {
    keepSearchOnSelect: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    search: {
      control: { type: "boolean" },
    },
  },
  component: MenuSelect,
  parameters: {
    badges: [BADGE.DEPRECATED],
  },
  title: "Deprecated/MenuSelect [deprecated]",
} as Meta;

// Default

export const Default = {
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: false,
  },
};

export const SingleSelectWithSearch = {
  args: {
    keepSearchOnSelect: false,
    multiple: false,
    search: true,
  },
};

export const MultiSelect = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: false,
  },
};

export const MultiSelectWithSearch = {
  args: {
    InputBaseProps: { placeholder: "Custom placeholder..." },
    keepSearchOnSelect: true,
    multiple: true,
    search: true,
  },
};
