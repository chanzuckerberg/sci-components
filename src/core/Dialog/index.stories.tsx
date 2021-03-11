import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Dialog, { HEIGHTS, WIDTHS } from "./index";

export const text = "This is a Dialog";

const SimpleDialog = ({ width = WIDTHS.DEFAULT, height = HEIGHTS.DEFAULT }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {width}, {height}
      </Button>
      <Dialog width={width} height={height} open={open} onClose={handleClose}>
        <h2 id="simple-Dialog-title">Text in a Dialog</h2>
        <p id="simple-Dialog-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </Dialog>
    </div>
  );
};

storiesOf("Dialog", module).add("default", () =>
  SimpleDialog({ width: WIDTHS.DEFAULT })
);

storiesOf("Dialog", module).add("narrow", () =>
  SimpleDialog({ width: WIDTHS.NARROW })
);

storiesOf("Dialog", module).add("narrow tall", () =>
  SimpleDialog({ width: WIDTHS.NARROW, height: HEIGHTS.TALL })
);

storiesOf("Dialog", module).add("default tall", () =>
  SimpleDialog({ width: WIDTHS.DEFAULT, height: HEIGHTS.TALL })
);

storiesOf("Dialog", module).add("wide", () =>
  SimpleDialog({ width: WIDTHS.WIDE })
);

storiesOf("Dialog", module).add("wide tall", () =>
  SimpleDialog({ width: WIDTHS.WIDE, height: HEIGHTS.TALL })
);

storiesOf("Dialog", module).add("widest", () =>
  SimpleDialog({ width: WIDTHS.WIDEST })
);

storiesOf("Dialog", module).add("widest tall", () =>
  SimpleDialog({ width: WIDTHS.WIDEST, height: HEIGHTS.TALL })
);
