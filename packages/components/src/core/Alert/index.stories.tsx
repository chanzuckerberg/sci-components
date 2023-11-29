import { CheckCircleOutline } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Alert from "./index";

const DismissButton = styled(Button)(
  ({ theme }) => `
  margin-left: -${theme.spacing(3)}px;
  padding-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  &:hover {
    background: none;
  }`
);

const Demo = (props: Args): JSX.Element => {
  const { text } = props;
  return (
    <Alert icon={<CheckCircleOutline />} onClose={() => {}} {...props}>
      {text}
    </Alert>
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
  title: "Alert - To Be Depreciated",
} as Meta;

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
};
