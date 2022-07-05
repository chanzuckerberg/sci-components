import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonBase from "@mui/material/ButtonBase";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { AutocompleteCloseReason } from "@mui/material/useAutocomplete";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import { getColors, getCorners, getShadows } from "../styles";
import TagFilter from "../TagFilter";
import MenuSelect, { DefaultMenuSelectOption } from "./index";

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
const Demo = (props: Args): JSX.Element => {
  // eslint-disable-next-line react/prop-types -- Demo code
  const { multiple, options = GITHUB_LABELS, search } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    null | DefaultMenuSelectOption | DefaultMenuSelectOption[]
  >(multiple ? [] : null);

  const [pendingValue, setPendingValue] = useState<DefaultMenuSelectOption[]>(
    []
  );

  const open = Boolean(anchorEl);

  const id = open ? "github-label" : undefined;

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
          <MenuSelect
            open
            search={search}
            onClose={handleClose}
            multiple={multiple}
            value={multiple ? pendingValue : value}
            onChange={handleChange}
            disableCloseOnSelect={multiple}
            options={options}
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
  component: Demo,
  title: "MenuSelect - To Be Depreciated",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  keepSearchOnSelect: false,
  multiple: false,
  search: false,
};

export const SingleSelectWithSearch = Template.bind({});

SingleSelectWithSearch.args = {
  keepSearchOnSelect: false,
  multiple: false,
  search: true,
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  keepSearchOnSelect: false,
  multiple: true,
  search: false,
};

export const MultiSelectWithSearch = Template.bind({});

MultiSelectWithSearch.args = {
  InputBaseProps: { placeholder: "Custom placeholder..." },
  keepSearchOnSelect: true,
  multiple: true,
  search: true,
};

// From https://github.com/abdonrd/github-labels
const GITHUB_LABELS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
  {
    color: "#b60205",
    description: "",
    name: "priority: critical",
  },
  {
    color: "#d93f0b",
    description: "",
    name: "priority: high",
  },
  {
    color: "#0e8a16",
    description: "",
    name: "priority: low",
  },
  {
    color: "#fbca04",
    description: "",
    name: "priority: medium",
  },
  {
    color: "#fec1c1",
    description: "",
    name: "status: can't reproduce",
  },
  {
    color: "#215cea",
    description: "",
    name: "status: confirmed",
  },
  {
    color: "#cfd3d7",
    description: "This issue or pull request already exists",
    name: "status: duplicate",
  },
  {
    color: "#fef2c0",
    description: "",
    name: "status: needs information",
  },
  {
    color: "#eeeeee",
    description: "This will not be worked on",
    name: "status: wont do/fix",
  },
  {
    color: "#d73a4a",
    description: "Something isn't working",
    name: "type: bug",
  },
  {
    color: "#d4c5f9",
    description: "",
    name: "type: discussion",
  },
  {
    color: "#006b75",
    description: "",
    name: "type: documentation",
  },
  {
    color: "#84b6eb",
    description: "",
    name: "type: enhancement",
  },
  {
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks",
    name: "type: epic",
  },
  {
    color: "#fbca04",
    description: "New feature or request",
    name: "type: feature request",
  },
  {
    color: "#d876e3",
    description: "Further information is requested",
    name: "type: question",
  },
];
