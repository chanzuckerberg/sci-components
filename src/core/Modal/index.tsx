import styled from "@emotion/styled";
import {
  Modal as RawModal,
  ModalProps as RawModalProps,
} from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

export enum WIDTHS {
  NARROW = "Narrow",
  DEFAULT = "Default",
  WIDE = "Wide",
  WIDEST = "Widest",
}
export interface ModalProps extends RawModalProps {
  width?: WIDTHS;
}

const MODAL_CONTENT_CLASSNAME = "modal-content";

const StyledModal = styled(RawModal)<ModalProps>`
  & > .${MODAL_CONTENT_CLASSNAME} {
    width: ${({ width }) => {
      console.log(width);
      switch (width) {
        case WIDTHS.NARROW:
          return "400px";
        case WIDTHS.DEFAULT:
          return "600px";
        case WIDTHS.WIDE:
          return "900px";
        case WIDTHS.WIDEST:
          return "1080px";
      }
    }};
    height: 400px;
  }
`;

const Modal = ({
  width = WIDTHS.DEFAULT,
  ...props
}: ModalProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <StyledModal width={width} {...props}>
        <div className={MODAL_CONTENT_CLASSNAME}>{props.children}</div>
      </StyledModal>
    </StylesProvider>
  );
};

export default Modal;
