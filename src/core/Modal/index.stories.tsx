import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Modal from "./index";

export const text = "This is a modal";

const DefaultModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledDiv = styled.div((props) => ({
    backgroundColor: "white",
    minHeight: props.narrow ? "0" : "400px",
    padding: "38px",
    transform: "translate(200px, 100px)",
    width: "600px", // default, can we compute this based on props
  }));

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <StyledDiv default>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <DefaultModal />
        </StyledDiv>
      </Modal>
    </div>
  );
};

storiesOf("Modal", module).add("default", () => DefaultModal());
