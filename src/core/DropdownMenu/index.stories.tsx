// import ButtonBase from "@material-ui/core/ButtonBase";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import { AutocompleteCloseReason } from "@material-ui/lab";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import Chip from "../Chip";
import InputDropdown from "../InputDropdown";
import { AppThemeOptions, getColors, getCorners, getShadows } from "../styles";
import DropdownMenu, { DefaultDropdownMenuOption } from "./index";

// eslint-disable-next-line sonarjs/cognitive-complexity -- Demo code
const Demo = (props: Args): JSX.Element => {
  // eslint-disable-next-line react/prop-types -- Demo code
  const { multiple, options = GITHUB_LABELS, search, hasSections } = props;

  const propsToPass = { ...props };
  delete propsToPass.hasSections;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    null | DefaultDropdownMenuOption | DefaultDropdownMenuOption[]
  >(multiple ? [] : null);

  const [pendingValue, setPendingValue] = useState<DefaultDropdownMenuOption[]>(
    []
  );

  const open = Boolean(anchorEl);

  const id = open ? "github-label" : undefined;

  return (
    <>
      <p>
        note: toggling both multiple and search to true requires a soft refresh
        of the page to load the options correctly
      </p>
      <div className={classes.root}>
        <InputDropdown
          aria-describedby={id}
          onClick={handleClick}
          label="Click Target"
          sdsStage={open ? "userInput" : "default"}
          sdsType={multiple ? "multiSelect" : "singleSelect"}
          sdsStyle="square"
        />

        <Chips value={value} multiple={multiple} onDelete={handleDelete} />
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <DropdownMenu
          open
          search={search}
          onClose={handleClose}
          multiple={multiple}
          value={multiple ? pendingValue : value}
          onChange={handleChange}
          disableCloseOnSelect={multiple}
          options={options}
          groupBy={
            hasSections ? (option) => option.section as string : undefined
          }
          {...propsToPass}
        />
      </Popper>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (multiple) {
      setPendingValue(value as DefaultDropdownMenuOption[]);
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
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    if (multiple) {
      return setPendingValue(newValue as DefaultDropdownMenuOption[]);
    }

    setValue(newValue as DefaultDropdownMenuOption);
  }

  function handleDelete(option: DefaultDropdownMenuOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue = (value as DefaultDropdownMenuOption[]).filter(
      (item) => item !== option
    );

    setValue(newValue);
  }
};

interface ChipsProps {
  value: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null;
  multiple: boolean;
  onDelete: (option: DefaultDropdownMenuOption) => void;
}

function Chips({ value, multiple, onDelete }: ChipsProps): JSX.Element | null {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return (
      <Chip
        size="medium"
        label={name}
        onDelete={onDelete}
        style={{
          margin: "0 4px 6px 0",
        }}
      />
    );
  }

  return (
    <>
      {value &&
        (value as DefaultDropdownMenuOption[]).map((item) => {
          const { name } = item;

          return (
            <Chip
              size="medium"
              key={name}
              label={name}
              onDelete={() => onDelete(item)}
              style={{
                margin: "0 4px 6px 0",
              }}
            />
          );
        })}
    </>
  );
}

export default {
  argTypes: {
    hasSections: {
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
  title: "DropdownMenu",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  hasSections: false,
  multiple: false,
  search: false,
};

// const LivePreviewDemo = (props: Args): JSX.Element => {
//   return (
//     <div>
//       <InputDropdown
//         aria-describedby="livePreviewDemo"
//         onClick={handleClick}
//         label="Click Target"
//         sdsStage={open ? "userInput" : "default"}
//         sdsType="singleSelect"
//         sdsStyle="minimal"
//       />
//       <Popper id="livePreviewDemo" open={open} anchorEl={anchorEl}>
//         <DropdownMenu
//           open
//           onClose={handleClose}
//           value={value}
//           onChange={handleChange}
//           options={options}
//           {...props}
//         />
//       </Popper>
//     </div>
//   );
// };

// export const SingleSelectWithSearch = Template.bind({});

// SingleSelectWithSearch.args = {
//   search: true,
// };

// export const MultiSelect = Template.bind({});

// MultiSelect.args = {
//   multiple: true,
// };

// export const MultiSelectWithSearch = Template.bind({});

// MultiSelectWithSearch.args = {
//   InputBaseProps: { placeholder: "Custom placeholder..." },
//   multiple: true,
//   search: true,
// };

const useStyles = makeStyles((theme: AppThemeOptions) => {
  const colors = getColors({ theme });
  const shadows = getShadows({ theme });
  const corners = getCorners({ theme });

  return {
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
    count: "3",
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
    details: "test",
    name: "priority: critical",
    section: "priority",
  },
  {
    color: "#d93f0b",
    description: "",
    name: "priority: high",
    section: "priority",
  },
  {
    color: "#0e8a16",
    description: "",
    name: "priority: low",
    section: "priority",
  },
  {
    color: "#fbca04",
    description: "",
    name: "priority: medium",
    section: "priority",
  },
  {
    color: "#fec1c1",
    description: "",
    name: "status: can't reproduce",
    section: "status",
  },
  {
    color: "#215cea",
    description: "",
    name: "status: confirmed",
    section: "status",
  },
  {
    color: "#cfd3d7",
    description: "This issue or pull request already exists",
    name: "status: duplicate",
    section: "status",
  },
  {
    color: "#fef2c0",
    description: "",
    name: "status: needs information",
    section: "status",
  },
  {
    color: "#eeeeee",
    description: "This will not be worked on",
    name: "status: wont do/fix",
    section: "status",
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
