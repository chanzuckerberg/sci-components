import { AutocompleteValue } from "@mui/base";
import { styled } from "@mui/material/styles";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { noop } from "src/common/utils";
import { DefaultAutocompleteOption } from "../Autocomplete/components/AutocompleteBase";
import Callout from "../Callout";
import CalloutTitle from "../Callout/components/CalloutTitle";
import DropdownMenu from "../DropdownMenu";
import RawInputDropdown, { InputDropdownProps } from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const StyledInputDropdown = styled(RawInputDropdown)`
  ${({ width }: Args) => {
    return `
      width: fit-content;
      max-width: ${width || 250}px;
    `;
  }}
`;

type DisableClearable = false;
type FreeSolo = false;

const InputDropdown = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    disabled,
    label,
    sdsStyle,
    multiple,
    value: propValue,
    sdsType,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [sdsStage, setSdsStage] =
    useState<InputDropdownProps["sdsStage"]>("default");
  const [details, setDetails] = useState<string>();
  const [counter, setCounter] = useState<string>();
  const [inputDropdownValue, setInputDropdownValue] = useState<string>();
  const [invalid, setInvalid] = useState(false);
  const [storybookLabel, setStorybookLabel] = useState("Label");

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);

  const isControlled = propValue !== undefined;

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue, isControlled]);

  useEffect(() => {
    if (sdsType === "value" && multiple) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [multiple, sdsType]);

  useEffect(() => {
    if (sdsType === "value") {
      setStorybookLabel("Value");
    } else {
      setStorybookLabel(label);
    }
  }, [label, sdsType]);

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
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => {
    if (!multiple) {
      setOpen(false);
      setValue(newValue);
      setCounter(undefined);

      if (newValue && !Array.isArray(newValue)) {
        setInputDropdownValue(newValue.name);

        if (newValue?.details) setDetails(newValue?.details);
        else setDetails(undefined);
      } else {
        setDetails(undefined);
        setInputDropdownValue(undefined);
      }
    } else {
      setValue(newValue);
      setCounter((newValue as T[])?.length.toString());
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
  };

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
      {invalid ? (
        <Callout autoDismiss={false} intent="negative">
          <CalloutTitle>Invalid props!</CalloutTitle>
          When using the InputDropdown component, please note that the
          combination of setting the sdsType prop to &quot;value&quot; and the
          multiple prop to &quot;true&quot; is not allowed.
        </Callout>
      ) : (
        <StyledInputDropdown
          disabled={disabled}
          label={storybookLabel}
          onClick={handleClick}
          state={open ? "open" : "default"}
          sdsStage={sdsStage}
          sdsStyle={sdsStyle}
          sdsType={sdsType}
          multiple={multiple}
          details={details}
          value={inputDropdownValue}
          counter={counter}
          data-testid="InputDropdown"
          {...rest}
        />
      )}

      <DropdownMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={handleChange}
        search={false}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options as T[]}
        value={value}
        onClickAway={handleClickAway}
        width={300}
      />
    </div>
  );
};

const ExcludedControls = [
  "fullWidth",
  "counter",
  "details",
  "disabled",
  "intent",
  "label",
  "multiple",
  "sdsStage",
  "sdsStyle",
  "sdsType",
  "shouldPutAColonAfterLabel",
  "shouldTruncateMinimalDetails",
  "width",
];

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
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputDropdown",
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
    controls: {
      exclude: ExcludedControls,
    },
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
    controls: {
      exclude: ExcludedControls,
    },
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
    controls: {
      exclude: ExcludedControls,
    },
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
    controls: {
      exclude: ExcludedControls,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <InputDropdown {...args} />,
};
