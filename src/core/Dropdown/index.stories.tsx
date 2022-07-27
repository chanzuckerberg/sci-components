import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import { DefaultDropdownMenuOption } from "../DropdownMenu";
import LoadingIndicator from "../LoadingIndicator";
import Dropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <Dropdown
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
    />
  );
};

export default {
  component: Demo,
  title: "Dropdown",
};

const Template: Story = (args) => <Demo {...args} />;
const LABEL = "Click Target";

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  label: LABEL,
  onChange: noop,
};

export const SingleSelect = Template.bind({});

SingleSelect.args = {
  label: LABEL,
  onChange: noop,
};

export const SingleSelectWithSearch = Template.bind({});

SingleSelectWithSearch.args = {
  label: LABEL,
  onChange: noop,
  search: true,
};

export const MultipleSelect = Template.bind({});

MultipleSelect.args = {
  label: LABEL,
  multiple: true,
  onChange: noop,
};

export const MultipleSelectWithSearch = Template.bind({});

MultipleSelectWithSearch.args = {
  label: LABEL,
  multiple: true,
  onChange: noop,
  search: true,
};

export const MultipleSelectWithSearchNoOptionsText = Template.bind({});
MultipleSelectWithSearchNoOptionsText.args = {
  MenuSelectProps: {
    noOptionsText: "No results",
  },
  label: LABEL,
  multiple: true,
  onChange: noop,
  search: true,
};

export const MultipleSelectWithSearchLoadingIndicator = Template.bind({});

MultipleSelectWithSearchLoadingIndicator.args = {
  MenuSelectProps: {
    loading: true,
    loadingText: (
      <>
        <LoadingIndicator sdsStyle="minimal" />
      </>
    ),
  },
  label: LABEL,
  multiple: true,
  onChange: noop,
  options: [],
  search: true,
};

export const MultipleSelectWithButtons = Template.bind({});

MultipleSelectWithButtons.args = {
  buttonPosition: "right",
  buttons: true,
  closeOnBlur: false,
  label: LABEL,
  multiple: true,
  onChange: noop,
  search: true,
};

export const MultipleSelectWithIsTriggerChangeOnOptionClick = Template.bind({});

MultipleSelectWithIsTriggerChangeOnOptionClick.args = {
  isTriggerChangeOnOptionClick: true,
  multiple: true,
  onChange: (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
};

export const SearchWithOnClose = Template.bind({});

SearchWithOnClose.args = {
  buttonPosition: "right",
  buttons: true,
  closeOnBlur: false,
  label: LABEL,
  multiple: true,
  onChange: noop,
  onClose: () => {
    // eslint-disable-next-line no-console
    console.log(123);
  },
  search: true,
};

const useStyles = makeStyles(() => ({
  /* stylelint-disable-next-line */
  paper: {
    padding: "50px",
    width: "200px",
  },
}));

export const InsideModal = (): JSX.Element => {
  const [value, setValue] = useState<DefaultDropdownMenuOption | null>(
    GITHUB_LABELS[0]
  );

  const classes = useStyles();

  return (
    <Dialog open disableEnforceFocus classes={{ paper: classes.paper }}>
      <Dropdown
        label="Dropdown"
        options={GITHUB_LABELS}
        onChange={handleChange}
        value={value}
        InputDropdownProps={{ sdsStyle: "square" }}
      />
    </Dialog>
  );

  function handleChange(newValue: DefaultDropdownMenuOption | null) {
    setValue(newValue);
  }
};

// Test Story
export const Test = (props: Args): JSX.Element => {
  return (
    <Dropdown
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
      data-testid="dropdown"
    />
  );
};

Test.args = {
  label: LABEL,
  onChange: noop,
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
