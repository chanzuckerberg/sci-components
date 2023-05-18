import { Dialog, Paper, styled } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import Button from "../Button";
import { DefaultDropdownMenuOption } from "../DropdownMenu";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import LoadingIndicator from "../LoadingIndicator";
import RawDropdown from "./index";

const Dropdown = (props: Args): JSX.Element => {
  return (
    <RawDropdown
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

const LABEL = "Click Target";

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
  component: Dropdown,
  title: "Dropdowns/Dropdown",
} as Meta;

export const Default = {
  args: {
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
  },
};

export const LoadingResultsIndicator = {
  args: {
    DropdownMenuProps: {
      loading: true,
      loadingText: <LoadingIndicator sdsStyle="minimal" />,
    },
    label: LABEL,
    onChange: noop,
    options: [],
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

// Inside Modal

const StyledPaper = styled(Paper)`
  width: 200px;
  padding: 50px;
`;

export const InsideModal = {
  parameters: {
    axe: {
      disabledRules: ["aria-dialog-name"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => {
    const [value, setValue] = useState<
      DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
    >([GITHUB_LABELS[0], GITHUB_LABELS[1]]);

    const FullWidthDropdown = styled(RawDropdown)`
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
  },
};

// Controlled Dropdown
const ControlledDropdownDemo = (props: Args): JSX.Element => {
  const [value, setValue] = useState<DefaultDropdownMenuOption[] | null>([]);

  const StyledButton = styled(Button)`
    &:focus {
      outline: none;
    }

    margin: 0 0 24px 8px;
  `;

  return (
    <>
      <StyledButton onClick={handleClick} sdsStyle="minimal" sdsType="primary">
        Click here to select the first three options
      </StyledButton>
      <br />
      <RawDropdown
        label="Click Target"
        options={GITHUB_LABELS}
        {...props}
        value={value}
        onChange={handleChange}
        data-testid="dropdown"
        DropdownMenuProps={{
          groupBy: (option: DefaultDropdownMenuOption) =>
            option.section as string,
          title: "Github Labels",
        }}
        multiple
      />
    </>
  );

  function handleClick() {
    setValue([...GITHUB_LABELS.slice(0, 3)] as DefaultDropdownMenuOption[]);
  }

  function handleChange(newValue: DefaultDropdownMenuOption[] | null) {
    setValue(newValue);
  }
};

export const ControlledDropdown = {
  args: {
    label: LABEL,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ControlledDropdownDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawDropdown
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
      data-testid="dropdown"
    />
  );
};

export const Test = {
  args: {
    buttonPosition: "left",
    label: LABEL,
    onChange: noop,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
