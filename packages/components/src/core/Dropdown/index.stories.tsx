import { AutocompleteValue, Dialog, Paper, styled } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import { useState } from "react";
import { noop } from "src/common/utils";
import Button from "../Button";
import { DefaultDropdownMenuOption } from "../DropdownMenu";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import { GITHUB_LABELS_MULTI_COLUMN } from "../DropdownMenu/GITHUB_LABELS_MULTI_COLUMN";
import LoadingIndicator from "../LoadingIndicator";
import RawDropdown from "./index";

const Dropdown = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const { multiple, options = GITHUB_LABELS } = props;
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >
  );

  return (
    <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
      label="Click Target"
      onChange={handleChange}
      value={value}
      options={options}
      search={false}
      multiple={multiple}
      DropdownMenuProps={{
        PopperBaseProps: {
          sx: { width: "300px" },
        },
        groupBy: (option: T) => option.section as string,
      }}
      {...props}
    />
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
  }
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
const dataOptions = [GITHUB_LABELS, GITHUB_LABELS_MULTI_COLUMN];
const LABEL = "Click Target";

export default {
  argTypes: {
    DropdownMenuProps: { control: { type: "object" } },
    buttonPosition: {
      control: {
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
    options: {
      control: {
        labels: ["Single Column Autocomplete", "Multi Column Autocomplete"],
        type: "select",
      },
      mapping: dataOptions,
      options: Object.keys(dataOptions),
    },
    search: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
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
    options: dataOptions[0],
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
    options: [],
  },
  parameters: {
    controls: {
      exclude: [
        "buttonPosition",
        "label",
        "onChange",
        "DropdownMenuProps",
        "buttons",
        "closeOnBlur",
        "disabled",
        "multiple",
        "onClose",
        "options",
        "search",
      ],
    },
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
    controls: {
      exclude: [
        "buttonPosition",
        "label",
        "onChange",
        "DropdownMenuProps",
        "buttons",
        "closeOnBlur",
        "disabled",
        "multiple",
        "onClose",
        "options",
        "search",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: function InsideModalComponent<
    T extends DefaultDropdownMenuOption,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
  >(props: Args): JSX.Element {
    return (
      <Dialog open disableEnforceFocus PaperComponent={StyledPaper}>
        <Dropdown<T, Multiple, DisableClearable, FreeSolo>
          label="Dropdown"
          options={GITHUB_LABELS as T[]}
          multiple
          InputDropdownProps={{ sdsStyle: "square" }}
          {...props}
        />
      </Dialog>
    );
  },
};

// Controlled Dropdown
const ControlledDropdownDemo = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    [] as unknown as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  );

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
      <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
        label="Click Target"
        {...props}
        options={GITHUB_LABELS as T[]}
        value={value}
        onChange={handleChange}
        data-testid="dropdown"
        DropdownMenuProps={{
          groupBy: (option: DefaultDropdownMenuOption) =>
            option.section as string,
          title: "Github Labels",
          width: 300,
        }}
        multiple={true as Multiple}
      />
    </>
  );

  function handleClick() {
    setValue([...GITHUB_LABELS.slice(0, 3)] as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >);
  }

  function handleChange(
    event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
  }
};

export const ControlledDropdown = {
  args: {
    label: LABEL,
  },
  parameters: {
    controls: {
      exclude: [
        "buttonPosition",
        "label",
        "onChange",
        "DropdownMenuProps",
        "buttons",
        "closeOnBlur",
        "disabled",
        "multiple",
        "onClose",
        "options",
        "search",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ControlledDropdownDemo {...args} />,
};

// Test

const TestDemo = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  return (
    <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS as T[]}
      DropdownMenuProps={{
        width: 300,
      }}
      {...props}
    />
  );
};

export const Test = {
  args: {
    buttonPosition: "left",
    label: LABEL,
  },
  parameters: {
    controls: {
      exclude: [
        "buttonPosition",
        "label",
        "onChange",
        "DropdownMenuProps",
        "buttons",
        "closeOnBlur",
        "disabled",
        "multiple",
        "onClose",
        "options",
        "search",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
