import { ClickAwayListener, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import DropdownMenu from "../DropdownMenu";
import {
  AppThemeOptions,
  getBorders,
  getCorners,
  getShadows,
  getSpaces,
} from "../styles";
import InputDropdown from "./index";

const useStyles = makeStyles((theme: AppThemeOptions) => {
  const shadows = getShadows({ theme });
  const corners = getCorners({ theme });
  const spacings = getSpaces({ theme });
  const borders = getBorders({ theme });

  return {
    popper: {
      backgroundColor: "white",
      border: borders?.gray[100],
      borderRadius: corners?.m,
      boxShadow: shadows?.m,
      marginTop: spacings?.s,
      padding: spacings?.xs,
      width: "auto",
      zIndex: 1,
    },
  };
});

const Demo = (props: Args): JSX.Element => {
  const { disabled, label, sdsStyle, sdsType, multiple, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

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
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
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

          <Popper
            open={open}
            anchorEl={anchorEl}
            className={classes.popper}
            placement="bottom-start"
          >
            <DropdownMenu
              open={!!open}
              onClose={handleClose}
              onChange={handleChange}
              search={false}
              multiple={multiple}
              disableCloseOnSelect={multiple}
              options={options}
            />
          </Popper>
        </div>
      </ClickAwayListener>
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

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const RoundLivePreview = LivePreviewTemplate.bind({});

RoundLivePreview.args = {
  sdsStyle: "rounded",
};

RoundLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

export const SquareLivePreview = LivePreviewTemplate.bind({});

SquareLivePreview.args = {
  sdsStyle: "square",
};

SquareLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const MinimalLivePreviewDemo = (props: Args): JSX.Element => {
  const { sdsStyle, ...rest } = props;

  return (
    <Template
      sdsType="singleSelect"
      sdsStyle={sdsStyle}
      label="Label"
      {...rest}
    />
  );
};

const MinimalPreviewTemplate: Story = (args) => (
  <MinimalLivePreviewDemo {...args} />
);

export const MinimalLivePreview = MinimalPreviewTemplate.bind({});

MinimalLivePreview.args = {
  sdsStyle: "minimal",
};

MinimalLivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestTemplate: Story = (args) => <Demo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  disabled: false,
  label: "Label",
  sdsStyle: "square",
  sdsType: "singleSelect",
};
