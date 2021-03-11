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

export enum HEIGHTS {
  NONE = "None",
  DEFAULT = "Default",
  TALL = "Tall",
}
export interface ModalProps extends RawModalProps {
  width?: WIDTHS;
  height?: HEIGHTS;
}

const MODAL_CONTENT_CLASSNAME = "modal-content";

// Values here are to be generalized from either appTheme.ts or defaultTheme.ts
const StyledModal = styled(RawModal)<ModalProps>`
  & > .${MODAL_CONTENT_CLASSNAME} {
    width: ${({ width }) => {
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
    height: ${({ height }) => {
      switch (height) {
        case HEIGHTS.DEFAULT:
          return "70vh";
        case HEIGHTS.TALL:
          return "85vh";
      }
    }};
    min-height: ${({ height }) => (height === HEIGHTS.NONE ? "0px" : "400px")};
    background-color: white;
    padding: 38px;
  }
`;

const Modal = ({
  width = WIDTHS.DEFAULT,
  height = HEIGHTS.DEFAULT,
  ...props
}: ModalProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <StyledModal width={width} height={height} {...props}>
        <div className={MODAL_CONTENT_CLASSNAME}>{props.children}</div>
      </StyledModal>
    </StylesProvider>
  );
};

export default Modal;
