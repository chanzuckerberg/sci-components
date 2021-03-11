import styled from "@emotion/styled";
import { Button, Snackbar } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { storiesOf } from "@storybook/react";
import React from "react";
import Alert from "./index";

const StyledAlert = styled(Alert)`
  border-radius: 4px;
  color: black;
  padding: 14px 14px 14px 9px;
  &.elevated {
    border-left: 5px solid;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    border-color: ${(props) =>
      props.severity === "info"
        ? "#3867fa"
        : props.severity === "warning"
        ? `#f5a623`
        : props.severity === "error"
        ? "#dc132c"
        : `#3cb371`};
  }
`;

const SnackbarAlert = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open notification
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
      >
        <StyledAlert
          className="elevated"
          severity="info"
          action={<Button onClick={handleClose}>DISMISS</Button>}
        >
          Hello!!
        </StyledAlert>
      </Snackbar>
    </div>
  );
};

storiesOf("Alert", module).add("default", () => (
  <StyledAlert icon={<CheckCircleOutlineIcon />}>This is an alert!</StyledAlert>
));

storiesOf("Alert", module).add("snackbar alert", () => <SnackbarAlert />);

storiesOf("Alert", module).add("elevated success", () => (
  <StyledAlert
    className="elevated"
    severity="success"
    icon={<CheckCircleOutlineIcon />}
    action={<Button>DISMISS</Button>}
  >
    This is a success alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("flat success", () => (
  <StyledAlert severity="success" icon={<CheckCircleOutlineIcon />}>
    This is a success alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("elevated warning", () => (
  <StyledAlert
    className="elevated"
    icon={<ErrorOutlineIcon />}
    severity="warning"
    onClose={() => {}}
  >
    This is a warning alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("flat warning", () => (
  <StyledAlert severity="warning" icon={<ErrorOutlineIcon />}>
    This is a warning alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("elevated error", () => (
  <StyledAlert className="elevated" severity="error">
    This is an error alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("flat error", () => (
  <StyledAlert severity="error">This is an error alert!</StyledAlert>
));

storiesOf("Alert", module).add("elevated info", () => (
  <StyledAlert
    className="elevated"
    severity="info"
    icon={<CheckCircleOutlineIcon style={{ color: "#3867fa" }} />}
  >
    This is an info alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("flat info", () => (
  <StyledAlert
    severity="info"
    icon={<CheckCircleOutlineIcon style={{ color: "#3867fa" }} />}
  >
    This is an info alert!
  </StyledAlert>
));
