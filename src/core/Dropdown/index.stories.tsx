import { Dialog, Paper, styled } from "@mui/material";
import { Args, Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import { DefaultDropdownMenuOption } from "../DropdownMenu";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import LoadingIndicator from "../LoadingIndicator";
import Dropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <Dropdown
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      DropdownMenuProps={{
        groupBy: (option: DefaultDropdownMenuOption) =>
          option.section as string,
      }}
      {...props}
    />
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
      mapping: buttonPositionOptions,
      options: Object.keys(buttonPositionOptions),
    },
    buttons: {
      control: {
        type: "boolean",
      },
    },
    closeOnBlur: {
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    label: { control: { type: "text" } },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    onChange: {
      control: {
        labels: ["NOOP", "Log value on change"],
        type: "select",
      },
      mapping: onChangeOptions,
      options: Object.keys(onChangeOptions),
    },
    onClose: {
      control: {
        labels: ["NOOP", "console.log('Closed!')"],
        type: "select",
      },
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
} as Meta;

const Template: Story = (args) => <Demo {...args} />;
const LABEL = "Click Target";

export const Default = Template.bind({});

Default.args = {
  buttonPosition: "left",
  buttons: false,
  closeOnBlur: true,
  disabled: false,
  isTriggerChangeOnOptionClick: false,
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
  const [value, setValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >([GITHUB_LABELS[0], GITHUB_LABELS[1]]);

  const FullWidthDropdown = styled(Dropdown)`
    width: 100%;
  `;

  return (
    <Dialog open disableEnforceFocus PaperComponent={StyledPaper}>
      <FullWidthDropdown
        label="Dropdown"
        options={GITHUB_LABELS}
        onChange={handleChange}
        value={value}
        multiple
        InputDropdownProps={{ sdsStyle: "square" }}
      />
    </Dialog>
  );

  function handleChange(
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    setValue(newValue);
  }
};

InsideModal.parameters = {
  axe: {
    disabledRules: ["aria-dialog-name"],
  },
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

// Controlled without buttons Story
const ControlledWithoutButtonsDemo = (props: Args): JSX.Element => {
  const [value, setValue] = useState<DefaultDropdownMenuOption[]>([]);

  const onDropdownChange: (
    options: DefaultDropdownMenuOption[] | null
  ) => void = (options) => {
    if (!options) {
      return;
    }
    // You don't have to create a new array, but if you do,
    // the dropdown will still work
    const newValue = [...options];
    setValue(newValue);
  };

  return (
    <Dropdown
      label="Click Target"
      onChange={onDropdownChange}
      options={GITHUB_LABELS}
      value={value}
      multiple
      {...props}
      data-testid="dropdown"
    />
  );
};

const ControlledWithoutButtonsTemplate: Story = (args) => (
  <ControlledWithoutButtonsDemo {...args} />
);
export const ControlledWithoutButtons = ControlledWithoutButtonsTemplate.bind(
  {}
);

ControlledWithoutButtons.args = {
  label: LABEL,
};
