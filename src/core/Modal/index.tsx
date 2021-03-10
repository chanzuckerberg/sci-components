import { Modal as RawModal, ModalProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

const Modal = (props: ModalProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <RawModal {...props} />
    </StylesProvider>
  );
};

export default Modal;
