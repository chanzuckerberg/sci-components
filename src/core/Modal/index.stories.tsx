import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Modal, { WIDTHS } from "./index";

export const text = "This is a modal";

const DefaultModal = ({ width = WIDTHS.DEFAULT } = {}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal width={width} open={open} onClose={handleClose}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </Modal>
    </div>
  );
};

storiesOf("Modal", module).add("narrow", () =>
  DefaultModal({ width: WIDTHS.NARROW })
);
storiesOf("Modal", module).add("default", () =>
  DefaultModal({ width: WIDTHS.DEFAULT })
);
storiesOf("Modal", module).add("wide", () =>
  DefaultModal({ width: WIDTHS.WIDE })
);
storiesOf("Modal", module).add("widest", () =>
  DefaultModal({ width: WIDTHS.WIDEST })
);
