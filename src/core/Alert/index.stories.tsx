import styled from "@emotion/styled";
import { Snackbar } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import { defaultTheme } from "../styles/common/defaultTheme";
import Alert from "./index";

const DismissButton = styled(Button)`
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

const SnackbarAlert = () => {
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
        <Alert className="elevated" severity="info">
          <div>This is a snackbar alert!</div>
          <DismissButton onClick={handleClose}>DISMISS</DismissButton>
        </Alert>
      </Snackbar>
    </div>
  );
};

const AlertToBeDepreciated = "Alert - To Be Depreciated";

storiesOf(AlertToBeDepreciated, module).add("default", () => (
  <Alert icon={<CheckCircleOutline />} onClose={() => {}}>
    This is an alert!
  </Alert>
));

storiesOf(AlertToBeDepreciated, module).add("snackbar", () => (
  <SnackbarAlert />
));

storiesOf(AlertToBeDepreciated, module).add("elevated", () => (
  <div>
    <Alert
      className="elevated"
      severity="success"
      icon={<CheckCircleOutline />}
    >
      This is a success alert!
    </Alert>
    <Alert className="elevated" icon={<ErrorOutline />} severity="warning">
      This is a warning alert!
    </Alert>
    <Alert className="elevated" severity="error">
      This is an error alert!
    </Alert>
    <Alert
      className="elevated"
      severity="info"
      icon={<CheckCircleOutline style={{ color: "#3867fa" }} />}
    >
      This is an info alert!
    </Alert>
  </div>
));

storiesOf(AlertToBeDepreciated, module).add("flat", () => (
  <div>
    <Alert severity="success" icon={<CheckCircleOutline />}>
      This is a success alert!
    </Alert>
    <Alert severity="warning" icon={<ErrorOutline />}>
      This is a warning alert!
    </Alert>
    <Alert severity="error">This is an error alert!</Alert>
    <Alert
      severity="info"
      icon={<CheckCircleOutline style={{ color: "#3867fa" }} />}
    >
      This is an info alert!
    </Alert>
  </div>
));
