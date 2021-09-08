import styled from "@emotion/styled";
import { Snackbar } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import Button from "../Button";
import { defaultTheme } from "../styles/common/defaultTheme";
import Callout from "./index";

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
          horizontal: "right",
          vertical: "top",
        }}
        open={open}
        autoHideDuration={6000}
      >
        <Callout className="elevated" severity="info">
          <div>This is a snackbar alert!</div>
          <DismissButton onClick={handleClose}>DISMISS</DismissButton>
        </Callout>
      </Snackbar>
    </div>
  );
};

storiesOf("Callout", module).add("default", () => (
  <Callout icon={<IconAlert fillContrast="white" />} onClose={() => {}}>
    This is a callout!
  </Callout>
));

storiesOf("Callout", module).add("snackbar", () => <SnackbarAlert />);

storiesOf("Callout", module).add("elevated", () => (
  <div>
    <Callout
      className="elevated"
      severity="success"
      icon={<IconAlert fillContrast="white" />}
    >
      This is a success callout!
    </Callout>
    <Callout
      className="elevated"
      icon={<IconAlert fillContrast="white" />}
      severity="warning"
    >
      This is a warning callout!
    </Callout>
    <Callout
      className="elevated"
      severity="error"
      icon={<IconAlert fillContrast="white" />}
    >
      This is an error callout!
    </Callout>
    <Callout
      className="elevated"
      severity="info"
      icon={<IconAlert fillContrast="white" />}
    >
      This is an info callout!
    </Callout>
  </div>
));

storiesOf("Callout", module).add("flat", () => (
  <div>
    <Callout severity="success" icon={<IconAlert fillContrast="white" />}>
      This is a success callout!
    </Callout>
    <Callout severity="warning" icon={<IconAlert fillContrast="white" />}>
      This is a warning callout!
    </Callout>
    <Callout severity="error" icon={<IconAlert fillContrast="white" />}>
      This is an error callout!
    </Callout>
    <Callout severity="info" icon={<IconAlert fillContrast="white" />}>
      This is an info callout!
    </Callout>
  </div>
));
