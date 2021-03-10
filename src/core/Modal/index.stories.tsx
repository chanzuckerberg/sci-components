import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Modal from "./index";

export const text = "This is a modal";

storiesOf("Modal", module).add("default", () => (
  <Modal open>
    <>
      <Button color="primary">Confirm</Button>
      <Button color="secondary">Cancel</Button>
    </>
  </Modal>
));
