import { Dialog, Paper, styled } from "@mui/material";
import { Args, Story } from "@storybook/react";
import React, { useRef, useState } from "react";
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

const BugWrapper = (): JSX.Element => {
  const [buttonProp, setButtonProp] = useState("a");
  const clickHandler = () => {
    setButtonProp(`${buttonProp}a`);
  };
  return (
    <>
      <div onClick={clickHandler}>Change Prop</div>
      <BugDropdown someProp={buttonProp} />
    </>
  );
};

const BugDropdown = ({ someProp }): JSX.Element => {
  const dropdownVal: never[] | DefaultDropdownMenuOption | null | undefined =
    [];

  const changeCount = useRef(0);
  return (
    <>
      <div>Some prop in parent: {someProp}</div>
      <div>Onchange called count: {changeCount.current}</div>
      <Dropdown
        label="Dropdown label"
        value={dropdownVal}
        onChange={() => {
          changeCount.current += 1;
          console.log("dropdown value: ", dropdownVal);
        }}
        options={GITHUB_LABELS}
        multiple
      />
    </>
  );
};

const onChangeOptions = [
  noop,
  (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
];

const onCloseOptions = [
  noop,
  () => {
    // eslint-disable-next-line no-console
    console.log("Closed!");
  },
];

const buttonPositionOptions = ["left", "right"];

export default {
  argTypes: {
    DropdownMenuProps: { control: { type: "object" } },
    buttonPosition: {
      constrol: {
        labels: ["left", "right"],
        type: "select",
      },
      defaultValue: buttonPositionOptions[0],
      mapping: buttonPositionOptions,
      options: Object.keys(buttonPositionOptions),
    },
    buttons: {
      control: {
        type: "boolean",
      },
      defaulValue: true,
    },
    closeOnBlur: {
      control: {
        type: "boolean",
      },
      defaulValue: false,
    },
    label: { control: { type: "text" } },
    multiple: {
      control: {
        type: "boolean",
      },
      defaulValue: true,
    },
    onChange: {
      control: {
        labels: ["NOOP", "Log value on change"],
        type: "select",
      },
      defaultValue: onChangeOptions[0],
      mapping: onChangeOptions,
      options: Object.keys(onChangeOptions),
    },
    onClose: {
      control: {
        labels: ["NOOP", "console.log('Closed!')"],
        type: "select",
      },
      defaultValue: onCloseOptions[0],
      mapping: onCloseOptions,
      options: Object.keys(onCloseOptions),
    },
    search: {
      control: {
        type: "boolean",
      },
      defaulValue: true,
    },
  },
  component: Demo,
  title: "Dropdown",
};

const Template: Story = (args) => <Demo {...args} />;
const TemplateBug: Story = (args) => <BugWrapper {...args} />;
const LABEL = "Click Target";

export const Buggy = TemplateBug.bind({});
Buggy.parameters = {
  snapshot: {
    skip: true,
  },
};
export const Default = Template.bind({});

Default.args = {
  buttonPosition: "left",
  buttons: false,
  closeOnBlur: false,
  isTriggerChangeOnOptionClick: true,
  label: LABEL,
  multiple: true,
  onChange: noop,
  onClose: noop,
  search: true,
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const LoadingResultsIndicator = Template.bind({});

LoadingResultsIndicator.args = {
  DropdownMenuProps: {
    loading: true,
    loadingText: <LoadingIndicator sdsStyle="minimal" />,
  },
  label: LABEL,
  onChange: noop,
  options: [],
};

LoadingResultsIndicator.parameters = {
  snapshot: {
    skip: true,
  },
};

const StyledPaper = styled(Paper)`
  width: 200px;
  padding: 50px;
`;

export const InsideModal = (): JSX.Element => {
  const [value, setValue] = useState<DefaultDropdownMenuOption | null>(
    GITHUB_LABELS[0]
  );

  return (
    <Dialog open disableEnforceFocus PaperComponent={StyledPaper}>
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

InsideModal.parameters = {
  snapshot: {
    skip: true,
  },
};
// Test Story

const TestDemo = (props: Args): JSX.Element => {
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

const TestTemplate: Story = (args) => <TestDemo {...args} />;
export const Test = TestTemplate.bind({});

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
