import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import InputDropdown from "./index";

const Demo = (props: Args): JSX.Element => {
  const { disabled, label, sdsStyle, sdsType, ...rest } = props;

  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <InputDropdown
        disabled={disabled}
        label={label}
        onClick={onClick}
        sdsStage={open ? "userInput" : "default"}
        sdsStyle={sdsStyle}
        sdsType={sdsType}
        {...rest}
      />
      <br />
      {open && <div>This is a menu.</div>}
    </>
  );
};

export default {
  argTypes: {
    counter: {
      control: { type: "number" },
    },
    details: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
    },
    sdsStage: {
      control: { type: "radio" },
      options: ["default", "userInput"],
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["square", "rounded", "minimal"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["singleSelect", "multiSelect"],
    },
  },
  component: Demo,
  title: "InputDropdown",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  label: "Label",
  sdsStyle: "square",
  sdsType: "singleSelect",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const storyRow = {
  display: "grid",
  gridColumnGap: "24px",
  gridTemplateColumns: "repeat(3, 160px)",
  gridTemplateRows: "1fr",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={storyRow as React.CSSProperties}>
      <InputDropdown
        sdsStyle={sdsStyle}
        sdsType="singleSelect"
        label="Label"
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        {...rest}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        PaperProps={{ style: { marginTop: "8px", width: "148px" } }}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </Menu>
      {/* details */}
      <InputDropdown
        sdsStyle={sdsStyle}
        sdsType="singleSelect"
        label="Label"
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        details="Details"
        {...rest}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        PaperProps={{ style: { marginTop: "8px", width: "148px" } }}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </Menu>

      {/* multiselect */}
      <InputDropdown
        sdsStyle={sdsStyle}
        sdsType="multiSelect"
        label="Label"
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        {...rest}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        PaperProps={{ style: { marginTop: "8px", width: "148px" } }}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </Menu>
    </div>
  );
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const RoundLivePreview = LivePreviewTemplate.bind({});

RoundLivePreview.args = {
  sdsStyle: "rounded",
};

export const SquareLivePreview = LivePreviewTemplate.bind({});

SquareLivePreview.args = {
  sdsStyle: "square",
};

const MinimalLivePreviewDemo = (props: Args): JSX.Element => {
  const { ...rest } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <InputDropdown
        sdsStyle="minimal"
        sdsType="singleSelect"
        label="Label"
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        {...rest}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        PaperProps={{ style: { marginTop: "8px", width: "148px" } }}
      >
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </Menu>
    </div>
  );
};

const MinimalPreviewTemplate: Story = (args) => (
  <MinimalLivePreviewDemo {...args} />
);

export const MinimalLivePreview = MinimalPreviewTemplate.bind({});
