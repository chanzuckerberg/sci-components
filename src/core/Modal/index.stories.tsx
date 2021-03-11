import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Modal, { HEIGHTS, WIDTHS } from "./index";

export const text = "This is a modal";

const DefaultModal = ({ width = WIDTHS.DEFAULT, height = HEIGHTS.DEFAULT }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {width}, {height}
      </Button>
      <Modal width={width} height={height} open={open} onClose={handleClose}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </Modal>
    </div>
  );
};

storiesOf("Modal", module).add("default", () =>
  DefaultModal({ width: WIDTHS.DEFAULT })
);

storiesOf("Modal", module).add("narrow", () =>
  DefaultModal({ width: WIDTHS.NARROW })
);

storiesOf("Modal", module).add("narrow tall", () =>
  DefaultModal({ width: WIDTHS.NARROW, height: HEIGHTS.TALL })
);

storiesOf("Modal", module).add("default tall", () =>
  DefaultModal({ width: WIDTHS.DEFAULT, height: HEIGHTS.TALL })
);

storiesOf("Modal", module).add("wide", () =>
  DefaultModal({ width: WIDTHS.WIDE })
);

storiesOf("Modal", module).add("wide tall", () =>
  DefaultModal({ width: WIDTHS.WIDE, height: HEIGHTS.TALL })
);

storiesOf("Modal", module).add("widest", () =>
  DefaultModal({ width: WIDTHS.WIDEST })
);

storiesOf("Modal", module).add("widest tall", () =>
  DefaultModal({ width: WIDTHS.WIDEST, height: HEIGHTS.TALL })
);
