import styled from "@emotion/styled";
import { Snackbar } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import { defaultTheme } from "../styles";
import Alert from "./index";

const StyledAlert = styled(Alert)`
  margin: ${defaultTheme.spacing(5)}px 0;
  border-radius: ${defaultTheme.spacing(1)};
  color: ${defaultTheme.palette.text.primary};
  padding: ${defaultTheme.spacing(6)}px ${defaultTheme.spacing(6)}px
    ${defaultTheme.spacing(6)}px 9px;
  &.elevated {
    border-left: 5px solid;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    border-color: ${(props) =>
      props.severity === "info"
        ? defaultTheme.palette.primary.main
        : props.severity === "warning"
        ? defaultTheme.palette.warning.main
        : props.severity === "error"
        ? defaultTheme.palette.error.main
        : defaultTheme.palette.success.main};
  }
`;

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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open alert
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
      >
        <StyledAlert className="elevated" severity="info">
          <div>This is a snackbar alert!</div>
          <DismissButton onClick={handleClose}>DISMISS</DismissButton>
        </StyledAlert>
      </Snackbar>
    </div>
  );
};

storiesOf("Alert", module).add("default", () => (
  <StyledAlert icon={<CheckCircleOutlineIcon />} onClose={() => {}}>
    This is an alert!
  </StyledAlert>
));

storiesOf("Alert", module).add("snackbar", () => <SnackbarAlert />);

storiesOf("Alert", module).add("elevated", () => (
  <div>
    <StyledAlert
      className="elevated"
      severity="success"
      icon={<CheckCircleOutlineIcon />}
    >
      This is a success alert!
    </StyledAlert>
    <StyledAlert
      className="elevated"
      icon={<ErrorOutlineIcon />}
      severity="warning"
    >
      This is a warning alert!
    </StyledAlert>
    <StyledAlert className="elevated" severity="error">
      This is an error alert!
    </StyledAlert>
    <StyledAlert
      className="elevated"
      severity="info"
      icon={<CheckCircleOutlineIcon style={{ color: "#3867fa" }} />}
    >
      This is an info alert!
    </StyledAlert>
  </div>
));

storiesOf("Alert", module).add("flat", () => (
  <div>
    <StyledAlert severity="success" icon={<CheckCircleOutlineIcon />}>
      This is a success alert!
    </StyledAlert>
    <StyledAlert severity="warning" icon={<ErrorOutlineIcon />}>
      This is a warning alert!
    </StyledAlert>
    <StyledAlert severity="error">This is an error alert!</StyledAlert>
    <StyledAlert
      severity="info"
      icon={<CheckCircleOutlineIcon style={{ color: "#3867fa" }} />}
    >
      This is an info alert!
    </StyledAlert>
  </div>
));
