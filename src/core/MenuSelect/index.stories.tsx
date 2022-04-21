import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonBase from "@mui/material/ButtonBase";
import Popper from "@mui/material/Popper";
import { AutocompleteCloseReason } from "@mui/material/useAutocomplete";
import makeStyles from "@mui/styles/makeStyles";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import Chip from "../Chip";
import { getColors, getCorners, getShadows, SDSTheme } from "../styles";
import MenuSelect, { DefaultMenuSelectOption } from "./index";

// eslint-disable-next-line sonarjs/cognitive-complexity -- Demo code
const Demo = (props: Args): JSX.Element => {
  // eslint-disable-next-line react/prop-types -- Demo code
  const { multiple, options = GITHUB_LABELS, search } = props;

  const classes = useStyles();

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
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          aria-describedby={id}
          onClick={handleClick}
        >
          <span>Click Target</span>
          <ExpandMoreIcon />
        </ButtonBase>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
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
        </Popper>

        <Chips value={value} multiple={multiple} onDelete={handleDelete} />
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

    return <Chip size="medium" label={name} onDelete={onDelete} />;
  }

  return (
    <>
      {(value as DefaultMenuSelectOption[]).map((item) => {
        const { name } = item;

        return (
          <Chip
            size="medium"
            key={name}
            label={name}
            onDelete={() => onDelete(item)}
          />
        );
      })}
    </>
  );
}

export default {
  component: Demo,
  title: "MenuSelect",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const SingleSelectWithSearch = Template.bind({});

SingleSelectWithSearch.args = {
  search: true,
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  multiple: true,
};

export const MultiSelectWithSearch = Template.bind({});

MultiSelectWithSearch.args = {
  InputBaseProps: { placeholder: "Custom placeholder..." },
  multiple: true,
  search: true,
};

const useStyles = makeStyles((theme: SDSTheme) => {
  const colors = getColors({ theme });
  const shadows = getShadows({ theme });
  const corners = getCorners({ theme });

  return {
    button: {
      "& span": {
        width: "100%",
      },
      "& svg": {
        height: 16,
        width: 16,
      },
      "&:hover,&:focus": {
        color: "#0366d6",
      },
      color: "#586069",
      fontSize: 13,
      fontWeight: 600,
      paddingBottom: 8,
      textAlign: "left",
      width: "100%",
    },
    paper: {
      boxShadow: "none",
      margin: 0,
    },
    popper: {
      backgroundColor: "white",
      border: `1px solid ${colors?.gray[100]}`,
      borderRadius: corners?.m,
      boxShadow: shadows?.m,
      color: "#586069",
      fontSize: 13,
      width: 300,
      zIndex: 1,
    },
    popperDisablePortal: {
      position: "relative",
      width: "100% !important",
    },
    root: {
      fontSize: 13,
      width: 221,
    },
  };
});

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
