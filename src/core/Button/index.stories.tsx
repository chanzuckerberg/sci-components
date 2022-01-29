import DeleteIcon from "@material-ui/icons/Delete";
import { Meta, Story } from "@storybook/react";
import React from "react";
import Button from "./index";

export default {
  argTypes: {
    color: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "error", "info", "warning"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: Button,
  title: "Button",
} as Meta;

const TEXT = "Click me!";

const Template: Story = (props) => {
  return <Button {...props}>{TEXT}</Button>;
};

// RoundedPrimary
export const RoundedPrimary = Template.bind({});

RoundedPrimary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "rounded",
  sdsType: "primary",
};

RoundedPrimary.parameters = {
  snapshot: {
    skip: true,
  },
};

// RoundedSecondary
export const RoundedSecondary = Template.bind({});

RoundedSecondary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "rounded",
  sdsType: "secondary",
  variant: "outlined",
};

RoundedSecondary.parameters = {
  snapshot: {
    skip: true,
  },
};

// SquarePrimary
export const SquarePrimary = Template.bind({});

SquarePrimary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "square",
  sdsType: "primary",
};

SquarePrimary.parameters = {
  snapshot: {
    skip: true,
  },
};

// SquareSecondary
export const SquareSecondary = Template.bind({});

SquareSecondary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "square",
  sdsType: "secondary",
  variant: "outlined",
};

SquareSecondary.parameters = {
  snapshot: {
    skip: true,
  },
};

// MinimalPrimary
export const MinimalPrimary = Template.bind({});

MinimalPrimary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "minimal",
  sdsType: "primary",
  variant: "text",
};

MinimalPrimary.parameters = {
  snapshot: {
    skip: true,
  },
};

// MinimalSecondary
export const MinimalSecondary = Template.bind({});

MinimalSecondary.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "minimal",
  sdsType: "secondary",
  variant: "text",
};

MinimalSecondary.parameters = {
  snapshot: {
    skip: true,
  },
};

// MinimalSecondaryNoCapsUseSparingly
export const MinimalSecondaryNoCapsUseSparingly: Story = (props) => (
  <Template {...props} />
);

MinimalSecondaryNoCapsUseSparingly.args = {
  color: "primary",
  disabled: false,
  isAllCaps: false,
  sdsStyle: "minimal",
  sdsType: "secondary",
  variant: "text",
};

MinimalSecondaryNoCapsUseSparingly.parameters = {
  snapshot: {
    skip: true,
  },
};

// RoundedPrimaryWithIcon
export const RoundedPrimaryWithIcon = Template.bind({});

RoundedPrimaryWithIcon.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "rounded",
  sdsType: "primary",
  startIcon: <DeleteIcon />,
};

RoundedPrimaryWithIcon.parameters = {
  snapshot: {
    skip: true,
  },
};

// MinimalPrimaryWithIcon
export const MinimalPrimaryWithIcon = Template.bind({});

MinimalPrimaryWithIcon.args = {
  color: "primary",
  disabled: false,
  sdsStyle: "minimal",
  sdsType: "primary",
  startIcon: <DeleteIcon />,
  variant: "text",
};

MinimalPrimaryWithIcon.parameters = {
  snapshot: {
    skip: true,
  },
};
