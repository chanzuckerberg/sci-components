import { styled } from "@mui/material/styles";
import { Args, Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu";
import InputDropdown from "./index";

const StyledInputDropdown = styled(InputDropdown)`
  ${({ width }: Args) => {
    return `
      width: fit-content;
      max-width: ${width || 160}px;
    `;
  }}
`;

const Demo = (props: Args): JSX.Element => {
  const { disabled, fullWidth, label, sdsStyle, sdsType, multiple, ...rest } =
    props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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

  const handleChange = () => {
    if (!multiple) {
      setOpen(false);
    }
  };

  const handleClose = () => {};

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };

  const options = [
    {
      details: "Details for menu item 1",
      name: "Menu Item 1",
    },
    {
      name: "Menu Item 2",
    },
    {
      name: "Menu Item 3",
    },
  ];

  return (
    <>
      {fullWidth ? (
        <InputDropdown
          disabled={disabled}
          label={label}
          onClick={handleClick}
          sdsStage={open ? "userInput" : "default"}
          sdsStyle={sdsStyle}
          sdsType={sdsType}
          data-testid="InputDropdown"
          {...rest}
        />
      ) : (
        <StyledInputDropdown
          disabled={disabled}
          label={label}
          onClick={handleClick}
          sdsStage={open ? "userInput" : "default"}
          sdsStyle={sdsStyle}
          sdsType={sdsType}
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
        options={options}
        onClickAway={handleClickAway}
      />
    </>
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
      options: ["singleSelect", "multiSelect"],
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
  component: Demo,
  title: "Inputs/InputDropdown",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = {
  args: {
    disabled: false,
    label: "Label",
    sdsStyle: "square",
    sdsType: "singleSelect",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

// Live Preview

const storyRow = {
  // lprins: This prevents InputDropdown component from stretching height in grid
  alignItems: "start",
  display: "grid",
  gridColumnGap: "24px",
  gridTemplateColumns: "repeat(3, 160px)",
  gridTemplateRows: "1fr",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle, ...rest } = props;

  return (
    <div style={storyRow as React.CSSProperties}>
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        {...rest}
      />

      {/* details */}
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        details="Details"
        {...rest}
      />

      {/* multiselect */}
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        multiple
        {...rest}
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

const MinimalLivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle, ...rest } = props;

  return (
    <div style={storyRow as React.CSSProperties}>
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        {...rest}
      />

      {/* Details */}
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        details="Very looooooong details"
        {...rest}
      />

      {/* shouldTruncateMinimalDetails */}
      <Template
        sdsType="singleSelect"
        sdsStyle={sdsStyle}
        label="Label"
        details="Very looooooong details"
        shouldTruncateMinimalDetails
        {...rest}
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
    sdsStyle: "square",
    sdsType: "singleSelect",
  },
};
