import { styled } from "@mui/material/styles";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { noop } from "src/common/utils";
import DropdownMenu, { DefaultDropdownMenuOption } from "../DropdownMenu";
import RawInputDropdown, { InputDropdownProps } from "./index";

const StyledInputDropdown = styled(RawInputDropdown)`
  ${({ width }: Args) => {
    return `
      width: fit-content;
      max-width: ${width || 250}px;
    `;
  }}
`;

const InputDropdown = (props: Args): JSX.Element => {
  const {
    disabled,
    label,
    sdsStyle,
    multiple,
    value: propValue,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [sdsStage, setSdsStage] =
    useState<InputDropdownProps["sdsStage"]>("default");
  const [details, setDetials] = useState<string>();
  const [counter, setCounter] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();

  const [value, setValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  >(getInitialValue());

  const isControlled = propValue !== undefined;

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue, isControlled]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setSdsStage("userInput");

    if (open) {
      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) => {
    if (!multiple) {
      setOpen(false);
      setValue(newValue);
      setCounter(undefined);

      if (newValue && !Array.isArray(newValue)) {
        setInputDropdownValue(newValue.name);

        if (newValue?.details) setDetials(newValue?.details);
        else setDetials(undefined);
      } else {
        setDetials(undefined);
        setInputDropdownValue(undefined);
      }
    } else {
      setPendingValue(newValue);
      setCounter((newValue as DefaultDropdownMenuOption[])?.length.toString());
    }
  };

  const handleClose = () => {};

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setSdsStage("default");
      }
    }
    if (multiple) {
      setValue(pendingValue);
    }
  };

  function getInitialValue() {
    if (isControlled) {
      return propValue;
    }

    return multiple ? ([] as unknown) : null;
  }

  const options = [
    {
      details: "Details",
      name: "Menu Item 1",
    },
    {
      details: "A very long Details for the second Menu Item",
      name: "Menu Item 2",
    },
    {
      name: "Menu Item 3",
    },
  ];

  return (
    <div>
      <p>
        The &quot;Value&quot; variant of InputDropdown cannot be set to
        &quot;multiple&quot;. <br />
        If you set sdsType=&quot;value&quot; and multiple=&quot;true&quot;, the
        component will revert to displaying a label and a counter.
      </p>

      <StyledInputDropdown
        disabled={disabled}
        label={label}
        onClick={handleClick}
        state={open ? "open" : "default"}
        sdsStage={sdsStage}
        sdsStyle={sdsStyle}
        multiple={multiple}
        details={details}
        value={inputDropdownValue}
        counter={counter}
        data-testid="InputDropdown"
        {...rest}
      />

      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={handleChange}
        search={false}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        value={multiple ? pendingValue : value}
        onClickAway={handleClickAway}
      />
    </div>
  );
};

export default {
  argTypes: {
    counter: {
      control: {
        type: "number",
      },
    },
    details: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    intent: {
      control: {
        type: "radio",
      },
      options: ["default", "error", "warning"],
    },
    label: {
      control: {
        type: "text",
      },
    },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    sdsStage: {
      control: {
        type: "radio",
      },
      options: ["default", "userInput"],
    },
    sdsStyle: {
      control: {
        type: "select",
      },
      options: ["square", "rounded", "minimal"],
    },
    sdsType: {
      control: {
        type: "radio",
      },
      options: ["label", "value"],
    },
    shouldPutAColonAfterLabel: {
      control: {
        type: "boolean",
      },
    },
    shouldTruncateMinimalDetails: {
      control: {
        type: "boolean",
      },
    },
    width: {
      control: {
        type: "number",
      },
    },
  },
  component: InputDropdown,
  title: "Inputs/InputDropdown",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    label: "Label",
    sdsStyle: "square",
  },
};

// Live Preview

const storyRow = {
  // lprins: This prevents InputDropdown component from stretching height in grid
  alignItems: "start",
  display: "flex",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle } = props;

  return (
    <div style={storyRow as React.CSSProperties}>
      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="label"
        multiple={false}
        data-testid="InputDropdown"
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="value"
        value="Value"
        multiple={false}
        data-testid="InputDropdown"
        style={{ marginLeft: 80, marginRight: 16 }}
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle={sdsStyle}
        sdsType="value"
        value="Value"
        details="Details"
        shouldPutAColonAfterLabel={false}
        multiple={false}
        data-testid="InputDropdown"
      />
    </div>
  );
};

export const RoundLivePreview = {
  args: {
    fullWidth: true,
    sdsStyle: "rounded",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

export const SquareLivePreview = {
  args: {
    fullWidth: true,
    sdsStyle: "square",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

const MinimalLivePreviewDemo = (): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle="minimal"
        sdsType="label"
        multiple={false}
        data-testid="InputDropdown"
      />

      <StyledInputDropdown
        disabled={false}
        label="Label"
        onClick={noop}
        sdsStage="default"
        sdsStyle="minimal"
        sdsType="value"
        value="Value"
        multiple={false}
        data-testid="InputDropdown"
        style={{ marginLeft: 80, marginRight: 16 }}
      />
    </div>
  );
};

export const MinimalLivePreview = {
  args: {
    sdsStyle: "minimal",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MinimalLivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    label: "Label",
    multiple: false,
    sdsStyle: "square",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <InputDropdown {...args} />,
};
