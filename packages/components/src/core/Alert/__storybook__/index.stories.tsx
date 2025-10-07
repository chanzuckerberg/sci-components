import { CheckCircleOutline } from "@mui/icons-material";
import { Snackbar, Button as MUIButton } from "@mui/material";
import styled from "@emotion/styled";
import { Args, Meta } from "@storybook/react-webpack5";
import React from "react";
import Button from "src/core/Button";
import { defaultTheme } from "src/core/styles/common/defaultTheme";
import Alert from "../index";
import Callout from "src/core/Callout";
import Icon from "src/core/Icon";

const DismissButton = styled(MUIButton)`
  margin-left: -${defaultTheme.spacing(3)}px;
  padding-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  &:hover {
    background: none;
  }
`;

const Demo = (props: Args): JSX.Element => {
  const { text } = props;
  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>Alert</strong> component is deprecated!
            <br />
            Please use <strong>Callout</strong> or <strong>Notification</strong>{" "}
            instead.
          </>
        }
      />
      <Alert icon={<CheckCircleOutline />} onClose={() => {}} {...props}>
        {text}
      </Alert>
    </>
  );
};

export default {
  argTypes: {
    text: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Demo,
  tags: ["deprecated"],
  title: "Deprecated/Alert",
} as Meta;

const ExcludedControls = ["text"];

// Default

export const Default = {
  args: {
    text: "This is an alert!",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

export const SnackbarAlert = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>Alert</strong> component is deprecated!
            <br />
            Please use <strong>Callout</strong> or <strong>Notification</strong>{" "}
            instead.
          </>
        }
      />
      <Button sdsType="primary" sdsStyle="square" onClick={handleOpen}>
        Open alert
      </Button>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={open}
        autoHideDuration={6000}
      >
        <div>
          <Alert className="elevated" severity="info">
            <div>This is a snackbar alert!</div>
            <DismissButton onClick={handleClose}>DISMISS</DismissButton>
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
};

export const Test = {
  args: {
    text: "Test Alert!",
  },
  parameters: {
    controls: {
      exclude: ExcludedControls,
    },
  },
};
